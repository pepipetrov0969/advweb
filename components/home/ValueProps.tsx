import { BadgeCheck, Clock, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const values = [
  {
    icon: UserCheck,
    title: "Личен подход",
    text: "Всеки казус се води лично от адвоката - познавате човека, който защитава интересите ви.",
  },
  {
    icon: BadgeCheck,
    title: "Ясни условия",
    text: "Прозрачно ценообразуване и ясен план за действие още от първата среща.",
  },
  {
    icon: ShieldCheck,
    title: "Пълна конфиденциалност",
    text: "Адвокатска тайна и дискретност по всички въпроси - без изключения.",
  },
  {
    icon: Clock,
    title: "Навременна реакция",
    text: "Спазени срокове и редовна обратна връзка за движението на вашия казус.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-white">
      <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
              <value.icon className="size-5.5" strokeWidth={1.9} />
            </span>
            <h3 className="font-display text-lg font-semibold text-espresso">
              {value.title}
            </h3>
            <p className="text-sm leading-relaxed text-clay">{value.text}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
