import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { AttorneyFeeCalculator } from "@/components/calculators/AttorneyFeeCalculator";

export const metadata: Metadata = {
  title: "Калкулатор: адвокатско възнаграждение",
  description:
    "Ориентировъчно минимално адвокатско възнаграждение по Наредба № 1 според материалния интерес по делото.",
};

export default function AttorneyFeeCalculatorPage() {
  return (
    <CalculatorShell
      href="/kalkulatori/advokatski-vaznagrazhdeniya"
      title="Минимално адвокатско възнаграждение"
      lead="Въведете материалния интерес по делото, за да видите минималното възнаграждение за процесуално представителство по граждански и търговски дела. Конкретното възнаграждение се договаря индивидуално."
      legalBasis="Наредба № 1 за минималните размери на адвокатските възнаграждения (чл. 7, ал. 2); след решението на СЕС по дело C-438/22 минимумите имат ориентировъчен характер"
    >
      <AttorneyFeeCalculator />
    </CalculatorShell>
  );
}
