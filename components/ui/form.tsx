export const labelClass = "mb-1.5 block text-sm font-medium text-espresso";

export const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-clay/60 focus:border-coffee focus:outline-none focus:ring-2 focus:ring-coffee/20";

export const selectClass = inputClass;

export const textareaClass = `${inputClass} min-h-28 resize-y`;

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-700">{message}</p>;
}

export function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-clay">{children}</p>;
}
