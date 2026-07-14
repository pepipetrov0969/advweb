// Официален фиксиран курс при приемането на еврото.
export const BGN_PER_EUR = 1.95583;

export function eurToBgn(eur: number) {
  return eur * BGN_PER_EUR;
}

export function bgnToEur(bgn: number) {
  return bgn / BGN_PER_EUR;
}

export function fmtMoney(value: number, currency: "EUR" | "BGN", exact = false) {
  return new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency,
    minimumFractionDigits: exact ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

// Двойно обозначаване на цени (EUR + BGN) съгласно Закона за въвеждане на еврото.
// След края на задължителния период може да се върне само fmtMoney(eur, "EUR").
export function dualPrice(eur: number, prefix?: string) {
  const label = `${fmtMoney(eur, "EUR")} / ${fmtMoney(eurToBgn(eur), "BGN")}`;
  return prefix ? `${prefix} ${label}` : label;
}

// Двойно показване на изчислена такса (в лева по тарифа + равностойност в евро).
export function dualFeeFromBgn(bgn: number) {
  return `${fmtMoney(bgnToEur(bgn), "EUR", true)} / ${fmtMoney(bgn, "BGN", true)}`;
}
