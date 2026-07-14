// Общ списък с часове за консултация - използва се и от формата (клиент),
// и от сървърната валидация, за да не се разминават.

export const NO_PREFERENCE = "Без предпочитание";

// Едночасови интервали в рамките на приемното време (9:00 - 17:00).
export const timeSlots = [
  NO_PREFERENCE,
  ...Array.from({ length: 8 }, (_, i) => {
    const from = String(9 + i).padStart(2, "0");
    const to = String(10 + i).padStart(2, "0");
    return `${from}:00 - ${to}:00`;
  }),
];
