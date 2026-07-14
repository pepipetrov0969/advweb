import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { NotaryCalculator } from "@/components/calculators/NotaryCalculator";

export const metadata: Metadata = {
  title: "Калкулатор: разноски при имотна сделка",
  description:
    "Изчислете нотариалната такса, таксата за вписване и местния данък при покупко-продажба на недвижим имот.",
};

export default function NotaryCalculatorPage() {
  return (
    <CalculatorShell
      href="/kalkulatori/notarialni-taksi"
      title="Разноски при имотна сделка"
      lead="Въведете материалния интерес (цената на имота), за да получите ориентировъчна сметка на нотариалната такса, таксата за вписване и местния данък при придобиване."
      legalBasis="Тарифа за нотариалните такси към ЗННД (чл. 8), Тарифа за държавните такси, събирани от Агенцията по вписванията, и ЗМДТ (чл. 44-47)"
    >
      <NotaryCalculator />
    </CalculatorShell>
  );
}
