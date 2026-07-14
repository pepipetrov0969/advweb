"use client";

import { useState } from "react";
import { eurToBgn } from "@/lib/format";
import { attorneyMinFeeBgn, VAT_RATE } from "@/lib/tariffs";
import {
  AmountField,
  parseAmount,
  ResultRow,
  ResultsCard,
  ToggleRow,
  type Currency,
} from "@/components/calculators/calc-ui";

export function AttorneyFeeCalculator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [withVat, setWithVat] = useState(false);

  const parsed = parseAmount(amount);
  const interestBgn = currency === "EUR" ? eurToBgn(parsed) : parsed;
  const fee = attorneyMinFeeBgn(interestBgn);
  const vat = withVat ? fee * VAT_RATE : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-5">
        <AmountField
          id="attorney-amount"
          label="Материален интерес по делото"
          value={amount}
          onChange={setAmount}
          currency={currency}
          onCurrencyChange={setCurrency}
          hint="Стойността на претенцията, около която се води спорът."
        />
        <ToggleRow
          label="ДДС върху възнаграждението (20 %)"
          hint="Начислява се, когато адвокатът е регистриран по ЗДДС."
          checked={withVat}
          onChange={setWithVat}
        />
      </div>

      <ResultsCard
        totalBgn={fee + vat}
        totalLabel="Минимално възнаграждение"
        empty={parsed <= 0}
      >
        <ResultRow
          label="Възнаграждение по Наредба № 1"
          bgn={fee}
          note="чл. 7, ал. 2 - граждански и търговски дела"
        />
        {withVat ? <ResultRow label="ДДС (20 %)" bgn={vat} /> : null}
      </ResultsCard>
    </div>
  );
}
