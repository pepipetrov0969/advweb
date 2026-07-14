// ─────────────────────────────────────────────────────────────────────────────
// ВНИМАНИЕ: Ориентировъчни стойности за калкулаторите.
// Преди публикуване на сайта проверете актуалните размери по:
//  • Тарифа за нотариалните такси към Закона за нотариусите и нотариалната
//    дейност (чл. 8 - пропорционална такса според материалния интерес)
//  • Тарифа за държавните такси, които се събират от съдилищата по ГПК
//  • Наредба № 1 за минималните размери на адвокатските възнаграждения
//    (чл. 7, ал. 2)
//  • Тарифа за държавните такси, събирани от Агенцията по вписванията (0,1 %)
// Стойностите са въведени в лева (BGN), както са в тарифите; резултатите се
// показват и в евро по фиксирания курс. Датата на последна проверка се показва
// на страниците на калкулаторите (LAST_VERIFIED по-долу).
// ─────────────────────────────────────────────────────────────────────────────

export const LAST_VERIFIED = "юли 2026 г.";

export type FeeBracket = {
  /** Горна граница на интервала в лв. (null = без горна граница) */
  upTo: number | null;
  /** Начална такса за интервала в лв. */
  base: number;
  /** Процент върху горницата над `over` */
  pct: number;
  /** Сумата, над която се начислява процентът */
  over: number;
};

export function bracketFee(brackets: FeeBracket[], amountBgn: number): number {
  if (!Number.isFinite(amountBgn) || amountBgn <= 0) return 0;
  for (const b of brackets) {
    if (b.upTo === null || amountBgn <= b.upTo) {
      return b.base + ((amountBgn - b.over) * b.pct) / 100;
    }
  }
  return 0;
}

// ── Нотариални такси (чл. 8 от Тарифата към ЗННД) ───────────────────────────
export const notaryBrackets: FeeBracket[] = [
  { upTo: 100, base: 30, pct: 0, over: 0 },
  { upTo: 1_000, base: 30, pct: 1.5, over: 100 },
  { upTo: 10_000, base: 43.5, pct: 1.3, over: 1_000 },
  { upTo: 50_000, base: 160.5, pct: 0.8, over: 10_000 },
  { upTo: 100_000, base: 480.5, pct: 0.5, over: 50_000 },
  { upTo: 500_000, base: 730.5, pct: 0.2, over: 100_000 },
  { upTo: null, base: 1_530.5, pct: 0.1, over: 500_000 },
];

export const NOTARY_FEE_CAP_BGN = 6_000;

export function notaryFeeBgn(interestBgn: number) {
  return Math.min(bracketFee(notaryBrackets, interestBgn), NOTARY_FEE_CAP_BGN);
}

// ── Такса за вписване в Имотния регистър (0,1 %, минимум 10 лв.) ────────────
export function registryFeeBgn(interestBgn: number) {
  if (!Number.isFinite(interestBgn) || interestBgn <= 0) return 0;
  return Math.max(interestBgn * 0.001, 10);
}

// ── Местен данък при възмездно придобиване на имущество ─────────────────────
// Ставката се определя от всяка община (между 0,1 % и 3 %).
export const DEFAULT_LOCAL_TAX_PCT = 2.5;

export function localTaxBgn(interestBgn: number, pct: number) {
  if (!Number.isFinite(interestBgn) || interestBgn <= 0) return 0;
  if (!Number.isFinite(pct) || pct <= 0) return 0;
  return (interestBgn * pct) / 100;
}

// ── Държавни такси в съда (Тарифа по ГПК) ───────────────────────────────────
export type CourtFeeType = {
  id: string;
  label: string;
  note: string;
} & ({ kind: "pct"; pct: number; minBgn: number } | { kind: "flat"; flatBgn: number });

export const courtFeeTypes: CourtFeeType[] = [
  {
    id: "isk",
    label: "Исково производство (първа инстанция)",
    kind: "pct",
    pct: 4,
    minBgn: 50,
    note: "4 % върху цената на иска, но не по-малко от 50 лв.",
  },
  {
    id: "vazziv",
    label: "Въззивно обжалване",
    kind: "pct",
    pct: 2,
    minBgn: 25,
    note: "50 % от таксата за първа инстанция, върху обжалваемия интерес.",
  },
  {
    id: "zapoved",
    label: "Заповедно производство (чл. 410 ГПК)",
    kind: "pct",
    pct: 2,
    minBgn: 25,
    note: "2 % върху интереса, но не по-малко от 25 лв.",
  },
  {
    id: "obezpechenie",
    label: "Обезпечение на бъдещ иск",
    kind: "flat",
    flatBgn: 40,
    note: "Фиксирана такса за молбата за обезпечение.",
  },
];

export function courtFeeBgn(type: CourtFeeType, interestBgn: number) {
  if (type.kind === "flat") return type.flatBgn;
  if (!Number.isFinite(interestBgn) || interestBgn <= 0) return 0;
  return Math.max((interestBgn * type.pct) / 100, type.minBgn);
}

// ── Минимални адвокатски възнаграждения (Наредба № 1, чл. 7, ал. 2) ─────────
// Бележка: след решението на СЕС по дело C-438/22 съдилищата не са обвързани
// от минимумите - стойностите тук служат само за ориентир при договаряне.
export const attorneyBrackets: FeeBracket[] = [
  { upTo: 1_000, base: 400, pct: 0, over: 0 },
  { upTo: 10_000, base: 400, pct: 10, over: 1_000 },
  { upTo: 25_000, base: 1_300, pct: 9, over: 10_000 },
  { upTo: 100_000, base: 2_650, pct: 8, over: 25_000 },
  { upTo: 500_000, base: 8_650, pct: 4, over: 100_000 },
  { upTo: 1_000_000, base: 24_650, pct: 3, over: 500_000 },
  { upTo: 10_000_000, base: 39_650, pct: 1.5, over: 1_000_000 },
  { upTo: null, base: 174_650, pct: 0.8, over: 10_000_000 },
];

export function attorneyMinFeeBgn(interestBgn: number) {
  return bracketFee(attorneyBrackets, interestBgn);
}

export const VAT_RATE = 0.2;
