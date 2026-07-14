"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { submitContact, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import {
  FieldError,
  inputClass,
  labelClass,
  textareaClass,
} from "@/components/ui/form";

const initialState: FormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-parchment p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-coffee" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-2xl font-semibold text-espresso">
          Съобщението е изпратено
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-clay">
          Благодарим ви! Ще получите отговор на посочения имейл - обикновено в
          рамките на един работен ден.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-ime" className={labelClass}>
            Име и фамилия <span className="text-chestnut">*</span>
          </label>
          <input
            id="contact-ime"
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
          <label htmlFor="contact-telefon" className={labelClass}>
            Телефон
          </label>
          <input
            id="contact-telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            defaultValue={state.values?.telefon ?? ""}
            className={inputClass}
          />
          <FieldError message={state.errors?.telefon} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-email" className={labelClass}>
          Имейл <span className="text-chestnut">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email ?? ""}
          className={inputClass}
        />
        <FieldError message={state.errors?.email} />
      </div>

      <div className="mt-5">
        <label htmlFor="contact-saobshtenie" className={labelClass}>
          Съобщение <span className="text-chestnut">*</span>
        </label>
        <textarea
          id="contact-saobshtenie"
          name="saobshtenie"
          rows={5}
          required
          defaultValue={state.values?.saobshtenie ?? ""}
          className={textareaClass}
        />
        <FieldError message={state.errors?.saobshtenie} />
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
          <Send className="size-5" />
        )}
        {pending ? "Изпращане…" : "Изпратете съобщението"}
      </Button>
    </form>
  );
}
