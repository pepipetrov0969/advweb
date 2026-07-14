"use client";

import { useState } from "react";
import { eurToBgn } from "@/lib/format";
import { courtFeeBgn, courtFeeTypes } from "@/lib/tariffs";
import {
  AmountField,
  parseAmount,
  ResultRow,
  ResultsCard,
  type Currency,
} from "@/components/calculators/calc-ui";
import { labelClass, selectClass } from "@/components/ui/form";

export function CourtFeeCalculator() {
  const [typeId, setTypeId] = useState(courtFeeTypes[0].id);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("EUR");

  const feeType = courtFeeTypes.find((t) => t.id === typeId) ?? courtFeeTypes[0];
  const parsed = parseAmount(amount);
  const interestBgn = currency === "EUR" ? eurToBgn(parsed) : parsed;
  const fee = courtFeeBgn(feeType, interestBgn);
  const isFlat = feeType.kind === "flat";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-5">
        <div>
          <label htmlFor="court-fee-type" className={labelClass}>
            Вид производство
          </label>
          <select
            id="court-fee-type"
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className={selectClass}
          >
            {courtFeeTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-clay">{feeType.note}</p>
        </div>

        {!isFlat ? (
          <AmountField
            id="court-amount"
            label="Цена на иска / материален интерес"
            value={amount}
            onChange={setAmount}
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        ) : null}
      </div>

      <ResultsCard
        totalBgn={fee}
        totalLabel="Държавна такса"
        empty={!isFlat && parsed <= 0}
      >
        <ResultRow label={feeType.label} bgn={fee} note={feeType.note} />
      </ResultsCard>
    </div>
  );
}
