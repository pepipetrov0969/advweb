import { promises as fs } from "fs";
import path from "path";

// Заетите часове се пазят в JSON файл на сървъра (.data/bookings.json).
// ВАЖНО: при хостинг без траен файлов диск (напр. Vercel serverless) файлът
// се нулира при нов деплой - тогава съхранението трябва да се замени с
// външна база (Vercel KV, Upstash, Postgres).
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

export function takenSlots(date: string): Promise<string[]> {
  return withLock(async () => (await readStore())[date] ?? []);
}

// Записва часа за датата. Връща false, ако вече е зает.
export function reserveSlot(date: string, slot: string): Promise<boolean> {
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
export function releaseSlot(date: string, slot: string): Promise<void> {
  return withLock(async () => {
    const store = await readStore();
    const day = (store[date] ?? []).filter((s) => s !== slot);
    if (day.length > 0) store[date] = day;
    else delete store[date];
    await writeStore(store);
  });
}
