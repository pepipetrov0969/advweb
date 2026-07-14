"use client";

import { dualFeeFromBgn } from "@/lib/format";
import { inputClass, labelClass } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type Currency = "EUR" | "BGN";

// Позволява въвеждане и с десетична запетая (български формат).
export function parseAmount(raw: string): number {
  const value = Number.parseFloat(raw.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function CurrencyToggle({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (currency: Currency) => void;
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-line" role="group" aria-label="Валута на въведената сума">
      {(["EUR", "BGN"] as const).map((currency) => (
        <button
          key={currency}
          type="button"
          onClick={() => onChange(currency)}
          aria-pressed={value === currency}
          className={cn(
            "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
            value === currency
              ? "bg-coffee text-white"
              : "bg-white text-clay hover:bg-cream",
          )}
        >
          {currency === "EUR" ? "€" : "лв."}
        </button>
      ))}
    </div>
  );
}

export function AmountField({
  id,
  label,
  value,
  onChange,
  currency,
  onCurrencyChange,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          placeholder="напр. 100 000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        <CurrencyToggle value={currency} onChange={onCurrencyChange} />
      </div>
      {hint ? <p className="mt-1.5 text-xs text-clay">{hint}</p> : null}
    </div>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-white px-4 py-3 transition-colors hover:bg-parchment">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 accent-coffee"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-clay">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ResultRow({
  label,
  bgn,
  note,
}: {
  label: string;
  bgn: number;
  note?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-cream/20 py-2.5 text-sm">
      <span className="text-cream/85">
        {label}
        {note ? <span className="block text-xs text-cream/60">{note}</span> : null}
      </span>
      <span className="whitespace-nowrap font-medium text-white">
        {dualFeeFromBgn(bgn)}
      </span>
    </div>
  );
}

export function ResultsCard({
  totalBgn,
  totalLabel = "Общо",
  empty,
  children,
}: {
  totalBgn: number;
  totalLabel?: string;
  empty: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-espresso p-7" aria-live="polite">
      {empty ? (
        <p className="py-6 text-center text-sm text-cream/70">
          Въведете сума, за да видите изчислението.
        </p>
      ) : (
        <>
          <div>{children}</div>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <span className="font-display text-lg font-semibold text-white">
              {totalLabel}
            </span>
            <span className="whitespace-nowrap font-display text-xl font-semibold text-tan">
              {dualFeeFromBgn(totalBgn)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
