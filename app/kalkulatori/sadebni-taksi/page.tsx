import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CourtFeeCalculator } from "@/components/calculators/CourtFeeCalculator";

export const metadata: Metadata = {
  title: "Калкулатор: държавни такси в съда",
  description:
    "Изчислете държавната такса за исково, заповедно или въззивно производство според цената на иска.",
};

export default function CourtFeeCalculatorPage() {
  return (
    <CalculatorShell
      href="/kalkulatori/sadebni-taksi"
      title="Държавни такси в съда"
      lead="Изберете вида производство и въведете материалния интерес, за да видите дължимата държавна такса при завеждане на делото."
      legalBasis="Тарифа за държавните такси, които се събират от съдилищата по ГПК"
    >
      <CourtFeeCalculator />
    </CalculatorShell>
  );
}
