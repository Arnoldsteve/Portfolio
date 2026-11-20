import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PLACEHOLDER = /\[[^\]]+\]/;

/** True when a content value still contains a [bracketed] placeholder. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || PLACEHOLDER.test(value);
}

/** Returns `url` when it is filled in, otherwise `fallback` — so placeholder links never dead-end. */
export function linkOr(url: string, fallback: string): string {
  return isPlaceholder(url) ? fallback : url;
}

export function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf");
}
