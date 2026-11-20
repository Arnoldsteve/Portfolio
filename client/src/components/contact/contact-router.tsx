"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { contactPage as c, contactRoutes, person, type RouteId } from "@/content/site";
import { contactSchema, fieldErrors, routeIds, type FieldErrors } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/primitives";
import { Tag } from "@/components/ui/badge";
import { useRadioGroup } from "@/components/ui/use-radio-group";
import { choiceClass, FieldError, FormError, Honeypot, inputClass, labelClass } from "@/components/ui/form";
import { HONEYPOT } from "@/lib/honeypot";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const errorFor: Record<number, string> = { 429: c.errorRateLimit, 503: c.errorUnavailable };

/** Route picker (accessible radio group) + the form that adapts to the chosen route. */
export function ContactRouter({ initialRoute }: { initialRoute: RouteId }) {
  const [route, setRoute] = useState<RouteId>(initialRoute);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const r = contactRoutes[route];

  const pick = (id: RouteId) => {
    setRoute(id);
    setStatus("idle");
    setErrors({});
    setFormError("");
  };

  const radioProps = useRadioGroup(routeIds, pick);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // The spam trap is not validated here; only the server judges it.
    const parsed = contactSchema.safeParse({ route, ...Object.fromEntries(form) });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setFormError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT]: form.get(HONEYPOT) ?? "" }),
      });
      if (res.ok) return setStatus("success");
      const json = await res.json().catch(() => ({}));
      if (json.fields) setErrors(json.fields);
      setFormError(errorFor[res.status] ?? (json.fields ? "" : c.errorGeneric));
    } catch {
      setFormError(c.errorGeneric);
    }
    setStatus("error");
  }

  const field = (name: keyof FieldErrors) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
  });
  const errorText = (name: keyof FieldErrors) => <FieldError id={`f-${name}-error`}>{errors[name]}</FieldError>;

  return (
    <>
      <div role="radiogroup" aria-label={c.pickerLabel} className="mt-5 grid gap-2.5 sm:mt-8 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:gap-4">
        {routeIds.map((id, i) => {
          const on = id === route;
          const def = contactRoutes[id];
          return (
            <button
              key={id}
              {...radioProps(i)}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => pick(id)}
              className={choiceClass(on, "flex items-center justify-between gap-3 p-4 sm:grid sm:content-start sm:gap-2 sm:p-6")}
            >
              <span className="grid gap-0.5 sm:gap-2">
                <span className="text-[17px] font-semibold sm:text-[19px]">{def.title}</span>
                <span className="text-[13px] text-ink-muted sm:hidden">{def.short}</span>
                <span className={cn("hidden text-[15px] leading-[1.5] sm:block", on ? "text-ink" : "text-ink-muted")}>{def.text}</span>
              </span>
              <span className={cn("hidden text-sm font-semibold sm:block", on ? "text-jacaranda-deep" : "text-jacaranda")}>{def.dest}</span>
              <span
                aria-hidden="true"
                className={cn("size-5.5 shrink-0 rounded-full sm:hidden", on ? "border-[7px] border-jacaranda" : "border-2 border-line")}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 sm:mt-10">
        {status === "success" ? (
          <div role="status" className="grid gap-2.5 rounded-lg border border-line bg-surface p-6 sm:gap-3 sm:p-10">
            <Label as="span" className="text-acacia">
              {c.sentLabel}
            </Label>
            <span className="text-[22px] font-semibold tracking-[-0.02em] sm:text-[28px]">{c.sentHeading}</span>
            <span className="text-[15px] text-ink-muted sm:text-base">{r.after}</span>
            <Button size="sm" className="mt-2 sm:justify-self-start" onClick={() => setStatus("idle")}>
              {c.sendAnother}
            </Button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-3.5 rounded-lg border border-line bg-surface p-5 sm:gap-4.5 sm:p-8">
            <div className="flex flex-col-reverse items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2.5">
              <h2 className="m-0 text-xl font-semibold tracking-[-0.015em] sm:text-[22px]">{r.heading}</h2>
              <Tag tone={r.recipient === "satechs" ? "navy" : "jacaranda"}>{r.tag}</Tag>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4">
              <label className={labelClass} htmlFor="f-name">
                {c.nameLabel}
                <input {...field("name")} type="text" autoComplete="name" placeholder={c.namePlaceholder} className={inputClass} />
                {errorText("name")}
              </label>
              <label className={labelClass} htmlFor="f-contact">
                {c.contactLabel}
                <input {...field("contact")} type="text" autoComplete="email" placeholder={c.contactPlaceholder} className={inputClass} />
                {errorText("contact")}
              </label>
            </div>
            <label className={labelClass} htmlFor="f-topic">
              {r.selectLabel}
              <select {...field("topic")} key={route} defaultValue={r.options[0]} className={inputClass}>
                {r.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              {errorText("topic")}
            </label>
            <label className={labelClass} htmlFor="f-message">
              {r.messageLabel}
              <textarea {...field("message")} rows={4} placeholder={c.messagePlaceholder} className={cn(inputClass, "resize-y")} />
              {errorText("message")}
            </label>
            <Honeypot />
            {formError && (
              <FormError>
                {formError}{" "}
                <a href={`mailto:${person.email}`} className="font-semibold text-jacaranda underline">
                  {person.email}
                </a>
              </FormError>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto">
                {status === "submitting" && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
                {status === "submitting" ? c.sending : r.cta}
              </Button>
              <span className="text-center text-[13px] text-ink-faint sm:text-left sm:text-sm">{c.privacy}</span>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
