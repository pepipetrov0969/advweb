import { promises as fs } from "fs";
import path from "path";

// Заетите часове се пазят в Upstash Redis (Vercel KV използва същото REST API) -
// работи и в serverless среда с read-only файлова система (Vercel, Netlify...).
// Настройка: добавете Vercel KV / Upstash Redis към проекта и задайте
// UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN в .env (вижте .env.example).
//
// Без зададени тези променливи (напр. локална разработка) записите се пазят
// във файл (.data/bookings.json) - удобно за localhost, но НЕ работи на Vercel,
// защото файловата система там е read-only извън /tmp.

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(REDIS_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) {
    throw new Error(`Upstash Redis отговори с грешка: ${res.status} ${await res.text()}`);
  }
  const { result } = await res.json();
  return result;
}

export async function takenSlots(date: string): Promise<string[]> {
  if (REDIS_URL && REDIS_TOKEN) {
    return (await redis(["SMEMBERS", `bookings:${date}`])) as string[];
  }
  return (await readStore())[date] ?? [];
}

// Записва часа за датата. Връща false, ако вече е зает.
export async function reserveSlot(date: string, slot: string): Promise<boolean> {
  if (REDIS_URL && REDIS_TOKEN) {
    // SADD връща 1 при нов елемент, 0 ако вече съществува - атомарно,
    // без риск от състезание между едновременни заявки.
    const added = (await redis(["SADD", `bookings:${date}`, slot])) as number;
    return added === 1;
  }
  return withLock(async () => {
    const store = await readStore();
    const day = store[date] ?? [];
    if (day.includes(slot)) return false;
    store[date] = [...day, slot];
    await writeStore(store);
    return true;
  });
}

// Освобождава час (използва се, ако изпращането на имейла се провали).
export async function releaseSlot(date: string, slot: string): Promise<void> {
  if (REDIS_URL && REDIS_TOKEN) {
    await redis(["SREM", `bookings:${date}`, slot]);
    return;
  }
  return withLock(async () => {
    const store = await readStore();
    const day = (store[date] ?? []).filter((s) => s !== slot);
    if (day.length > 0) store[date] = day;
    else delete store[date];
    await writeStore(store);
  });
}

// --- Резервен вариант за локална разработка (файл на диска) ---

const FILE = path.join(process.cwd(), ".data", "bookings.json");

type Store = Record<string, string[]>; // "YYYY-MM-DD" -> заети часове

// Последователна опашка, за да не се презапишат две едновременни заявки.
let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn);
  queue = run.catch(() => {});
  return run;
}

async function readStore(): Promise<Store> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function writeStore(store: Store) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
}
