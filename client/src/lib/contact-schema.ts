import { z } from "zod";
import { contactPage, contactRoutes, type RouteId } from "@/content/site";

export const routeIds = Object.keys(contactRoutes) as RouteId[];

export function isRouteId(value: unknown): value is RouteId {
  return typeof value === "string" && (routeIds as string[]).includes(value);
}

const EMAIL = z.email();
const WHATSAPP = /^\+?[\d\s()-]{7,20}$/;

export function isEmail(value: string) {
  return EMAIL.safeParse(value).success;
}

const e = contactPage.errors;

/** Shared by the form (client-side feedback) and POST /api/contact (the real check). */
export const contactSchema = z
  .object({
    route: z.enum(routeIds as [RouteId, ...RouteId[]]),
    name: z.string().trim().min(1, e.name).max(120, e.name),
    contact: z
      .string()
      .trim()
      .refine((v) => isEmail(v) || WHATSAPP.test(v), e.contact),
    topic: z.string().trim().min(1, e.topic),
    message: z.string().trim().min(10, e.message).max(5000, e.message),
    // Honeypot: hidden from people, filled in by bots.
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((d) => contactRoutes[d.route].options.includes(d.topic), { path: ["topic"], message: e.topic });

export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
