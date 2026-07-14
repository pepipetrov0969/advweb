"use client";

import { useState } from "react";
import { eurToBgn } from "@/lib/format";
import {
  DEFAULT_LOCAL_TAX_PCT,
  localTaxBgn,
  notaryFeeBgn,
  registryFeeBgn,
  VAT_RATE,
} from "@/lib/tariffs";
import {
  AmountField,
  parseAmount,
  ResultRow,
  ResultsCard,
  ToggleRow,
  type Currency,
} from "@/components/calculators/calc-ui";
import { inputClass, labelClass } from "@/components/ui/form";

export function NotaryCalculator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [localTaxPct, setLocalTaxPct] = useState(String(DEFAULT_LOCAL_TAX_PCT));
  const [withVat, setWithVat] = useState(true);
  const [withRegistry, setWithRegistry] = useState(true);
  const [withLocalTax, setWithLocalTax] = useState(true);

  const parsed = parseAmount(amount);
  const interestBgn = currency === "EUR" ? eurToBgn(parsed) : parsed;

  const notary = notaryFeeBgn(interestBgn);
  const vat = withVat ? notary * VAT_RATE : 0;
  const registry = withRegistry ? registryFeeBgn(interestBgn) : 0;
  const taxPct = parseAmount(localTaxPct);
  const local = withLocalTax ? localTaxBgn(interestBgn, taxPct) : 0;
  const total = notary + vat + registry + local;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-5">
        <AmountField
          id="notary-amount"
          label="Материален интерес (цена на имота)"
          value={amount}
          onChange={setAmount}
          currency={currency}
          onCurrencyChange={setCurrency}
          hint="Върху по-високата от продажната цена и данъчната оценка."
        />

        <div>
          <label htmlFor="local-tax-pct" className={labelClass}>
            Ставка на местния данък (%)
          </label>
          <input
            id="local-tax-pct"
            type="text"
            inputMode="decimal"
            value={localTaxPct}
            onChange={(e) => setLocalTaxPct(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-clay">
            Определя се от общината по местонахождение на имота (между 0,1 % и
            3 %). Проверете актуалната ставка за конкретната община.
          </p>
        </div>

        <div className="space-y-2.5">
          <ToggleRow
            label="ДДС върху нотариалната такса (20 %)"
            hint="Начислява се от нотариуси, регистрирани по ЗДДС."
            checked={withVat}
            onChange={setWithVat}
          />
          <ToggleRow
            label="Такса за вписване (0,1 %, мин. 10 лв.)"
            hint="Събира се от Агенцията по вписванията."
            checked={withRegistry}
            onChange={setWithRegistry}
          />
          <ToggleRow
            label="Местен данък за придобиване"
            hint="Не се дължи при дарение между роднини по права линия."
            checked={withLocalTax}
            onChange={setWithLocalTax}
          />
        </div>
      </div>

      <ResultsCard totalBgn={total} totalLabel="Общо разноски" empty={parsed <= 0}>
        <ResultRow label="Нотариална такса" bgn={notary} note="чл. 8 от Тарифата към ЗННД" />
        {withVat ? <ResultRow label="ДДС върху таксата (20 %)" bgn={vat} /> : null}
        {withRegistry ? (
          <ResultRow label="Такса за вписване (0,1 %)" bgn={registry} />
        ) : null}
        {withLocalTax ? (
          <ResultRow label={`Местен данък (${localTaxPct || "0"} %)`} bgn={local} />
        ) : null}
      </ResultsCard>
    </div>
  );
}
