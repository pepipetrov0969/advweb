"use server";

import { escapeHtml } from "@/lib/utils";
import { sendNotificationEmail } from "@/lib/send-email";
import { NO_PREFERENCE, timeSlots } from "@/lib/booking-slots";
import { releaseSlot, reserveSlot } from "@/lib/bookings";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+\d][\d\s()./-]{5,}$/;

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function htmlRow(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#6F4E37;white-space:nowrap;vertical-align:top"><strong>${label}</strong></td><td style="padding:6px 0">${escapeHtml(value).replaceAll("\n", "<br>")}</td></tr>`;
}

export async function submitBooking(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Скрито поле срещу спам ботове - хората не го попълват.
  if (field(formData, "uebsait")) {
    return { status: "success" };
  }

  const values = {
    ime: field(formData, "ime"),
    telefon: field(formData, "telefon"),
    email: field(formData, "email"),
    tema: field(formData, "tema"),
    data: field(formData, "data"),
    chas: field(formData, "chas"),
    opisanie: field(formData, "opisanie"),
  };

  const errors: Record<string, string> = {};
  if (values.ime.length < 2) errors.ime = "Моля, въведете вашето име.";
  if (!phoneRe.test(values.telefon))
    errors.telefon = "Моля, въведете валиден телефонен номер.";
  if (values.email && !emailRe.test(values.email))
    errors.email = "Имейл адресът изглежда невалиден.";
  if (values.opisanie.length > 5000)
    errors.opisanie = "Описанието е твърде дълго (до 5000 знака).";
  if (formData.get("saglasie") !== "on")
    errors.saglasie = "Необходимо е съгласие за обработка на данните.";

  if (values.chas && !timeSlots.includes(values.chas))
    errors.chas = "Моля, изберете час от списъка.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Моля, коригирайте отбелязаните полета.",
      errors,
      values,
    };
  }

  // Конкретен час се пази еднократно за дата - без двойни резервации.
  const wantsSlot =
    values.data !== "" && values.chas !== "" && values.chas !== NO_PREFERENCE;

  if (wantsSlot) {
    let reserved: boolean;
    try {
      reserved = await reserveSlot(values.data, values.chas);
    } catch (error) {
      console.error("Неуспешна проверка/запис на часа:", error);
      return {
        status: "error",
        message:
          "Възникна техническа грешка при изпращането. Моля, опитайте отново или се обадете по телефона.",
        values,
      };
    }
    if (!reserved) {
      return {
        status: "error",
        message: "Моля, коригирайте отбелязаните полета.",
        errors: {
          chas: "Този час вече е зает за избраната дата. Моля, изберете друг час.",
        },
        values,
      };
    }
  }

  const html = `
    <h2 style="color:#4E342E">Ново запитване за час от сайта</h2>
    <table style="border-collapse:collapse;font-size:15px">
      ${htmlRow("Име", values.ime)}
      ${htmlRow("Телефон", values.telefon)}
      ${htmlRow("Имейл", values.email)}
      ${htmlRow("Тема", values.tema)}
      ${htmlRow("Предпочитана дата", values.data)}
      ${htmlRow("Предпочитан час", values.chas)}
      ${htmlRow("Описание", values.opisanie)}
    </table>`;

  const sent = await sendNotificationEmail({
    subject: `Запазване на час - ${values.ime}`,
    html,
    replyTo: emailRe.test(values.email) ? values.email : undefined,
  });

  if (!sent) {
    // Освобождаваме часа, за да не остане блокиран от неуспешно запитване.
    if (wantsSlot) {
      await releaseSlot(values.data, values.chas).catch((error) =>
        console.error("Неуспешно освобождаване на часа:", error),
      );
    }
    return {
      status: "error",
      message:
        "Възникна техническа грешка при изпращането. Моля, опитайте отново или се обадете по телефона.",
      values,
    };
  }

  return { status: "success" };
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (field(formData, "uebsait")) {
    return { status: "success" };
  }

  const values = {
    ime: field(formData, "ime"),
    email: field(formData, "email"),
    telefon: field(formData, "telefon"),
    saobshtenie: field(formData, "saobshtenie"),
  };

  const errors: Record<string, string> = {};
  if (values.ime.length < 2) errors.ime = "Моля, въведете вашето име.";
  if (!emailRe.test(values.email))
    errors.email = "Моля, въведете валиден имейл адрес.";
  if (values.telefon && !phoneRe.test(values.telefon))
    errors.telefon = "Телефонният номер изглежда невалиден.";
  if (values.saobshtenie.length < 10)
    errors.saobshtenie = "Моля, опишете накратко въпроса си (поне 10 знака).";
  if (values.saobshtenie.length > 5000)
    errors.saobshtenie = "Съобщението е твърде дълго (до 5000 знака).";
  if (formData.get("saglasie") !== "on")
    errors.saglasie = "Необходимо е съгласие за обработка на данните.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Моля, коригирайте отбелязаните полета.",
      errors,
      values,
    };
  }

  const html = `
    <h2 style="color:#4E342E">Ново съобщение от контактната форма</h2>
    <table style="border-collapse:collapse;font-size:15px">
      ${htmlRow("Име", values.ime)}
      ${htmlRow("Имейл", values.email)}
      ${htmlRow("Телефон", values.telefon)}
      ${htmlRow("Съобщение", values.saobshtenie)}
    </table>`;

  const sent = await sendNotificationEmail({
    subject: `Съобщение от сайта - ${values.ime}`,
    html,
    replyTo: values.email,
  });

  if (!sent) {
    return {
      status: "error",
      message:
        "Възникна техническа грешка при изпращането. Моля, опитайте отново или се обадете по телефона.",
      values,
    };
  }

  return { status: "success" };
}
