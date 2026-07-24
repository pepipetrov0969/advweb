"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, LoaderCircle } from "lucide-react";
import { submitBooking, type FormState } from "@/app/actions";
import { NO_PREFERENCE, timeSlots } from "@/lib/booking-slots";
import { trackConversion } from "@/lib/gtag";
import { Button } from "@/components/ui/Button";
import {
  FieldError,
  Hint,
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const initialState: FormState = { status: "idle" };

export function BookingForm({
  topics,
  defaultTopic,
  title,
  compact = false,
}: {
  topics: string[];
  defaultTopic?: string;
  title?: string;
  compact?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitBooking, initialState);
  const today = new Date().toISOString().slice(0, 10);

  // При избрана дата зареждаме кои часове вече са заети, за да ги забраним.
  const [izbranaData, setIzbranaData] = useState("");
  const [zaetiChasove, setZaetiChasove] = useState<string[]>([]);

  useEffect(() => {
    if (!izbranaData) {
      setZaetiChasove([]);
      return;
    }
    let active = true;
    fetch(`/api/zaeti-chasove?data=${izbranaData}`)
      .then((res) => res.json())
      .then((json) => {
        if (active) setZaetiChasove(json.zaeti ?? []);
      })
      .catch(() => {
        if (active) setZaetiChasove([]);
      });
    return () => {
      active = false;
    };
  }, [izbranaData]);

  useEffect(() => {
    if (state.status === "success") {
      trackConversion("7zUtCPby3tUcEJzNhaJE");
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-parchment p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-coffee" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-2xl font-semibold text-espresso">
          Запитването е изпратено
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-clay">
          Благодарим ви! Ще се свържем с вас по телефона или имейла за
          потвърждение на точния ден и час на консултацията.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={cn(
        "rounded-2xl border border-line bg-white shadow-sm",
        compact ? "p-6 sm:p-7" : "p-7 sm:p-9",
      )}
      noValidate
    >
      {title ? (
        <h2 className="mb-5 font-display text-xl font-semibold text-espresso">
          {title}
        </h2>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ime" className={labelClass}>
            Име и фамилия <span className="text-chestnut">*</span>
          </label>
          <input
            id="ime"
            name="ime"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.ime ?? ""}
            className={inputClass}
          />
          <FieldError message={state.errors?.ime} />
        </div>

        <div>
          <label htmlFor="telefon" className={labelClass}>
            Телефон <span className="text-chestnut">*</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={state.values?.telefon ?? ""}
            className={inputClass}
          />
          <FieldError message={state.errors?.telefon} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Имейл
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email ?? ""}
            className={inputClass}
          />
          <FieldError message={state.errors?.email} />
        </div>

        <div>
          <label htmlFor="tema" className={labelClass}>
            Тема на консултацията
          </label>
          <select
            id="tema"
            name="tema"
            defaultValue={state.values?.tema ?? defaultTopic ?? ""}
            className={selectClass}
          >
            <option value="">Изберете тема…</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="data" className={labelClass}>
            Предпочитана дата
          </label>
          <input
            id="data"
            name="data"
            type="date"
            min={today}
            defaultValue={state.values?.data ?? ""}
            onChange={(e) => setIzbranaData(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="chas" className={labelClass}>
            Предпочитан час
          </label>
          <select
            id="chas"
            name="chas"
            defaultValue={state.values?.chas ?? timeSlots[0]}
            className={selectClass}
          >
            {timeSlots.map((slot) => {
              const zaet = slot !== NO_PREFERENCE && zaetiChasove.includes(slot);
              return (
                <option key={slot} value={slot} disabled={zaet}>
                  {zaet ? `${slot} (зает)` : slot}
                </option>
              );
            })}
          </select>
          <FieldError message={state.errors?.chas} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="opisanie" className={labelClass}>
          Кратко описание на казуса
        </label>
        <textarea
          id="opisanie"
          name="opisanie"
          rows={compact ? 3 : 5}
          defaultValue={state.values?.opisanie ?? ""}
          className={textareaClass}
          placeholder="Опишете с няколко изречения въпроса, по който търсите съдействие…"
        />
        <FieldError message={state.errors?.opisanie} />
        <Hint>Не изпращайте чувствителни документи през формата - ще ги обсъдим при консултацията.</Hint>
      </div>

      {/* Скрито поле срещу спам - да остане празно */}
      <input
        type="text"
        name="uebsait"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-clay">
        <input type="checkbox" name="saglasie" className="mt-0.5 size-4 accent-coffee" />
        <span>
          Съгласен/на съм личните ми данни да бъдат обработени за целите на
          запитването, съгласно{" "}
          <Link href="/politika-za-poveritelnost" className="font-medium text-coffee underline underline-offset-2">
            политиката за поверителност
          </Link>
          . <span className="text-chestnut">*</span>
        </span>
      </label>
      <FieldError message={state.errors?.saglasie} />

      {state.status === "error" && state.message ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <Button size="lg" className="mt-6 w-full sm:w-auto" disabled={pending}>
        {pending ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : (
          <CalendarCheck className="size-5" />
        )}
        {pending ? "Изпращане…" : "Изпратете запитването"}
      </Button>
    </form>
  );
}
