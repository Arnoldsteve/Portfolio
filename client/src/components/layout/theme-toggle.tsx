"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { ui } from "@/content/site";

type Theme = "light" | "dark";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return media().matches ? "dark" : "light";
}

/** The theme is external state (the <html data-theme> attribute + OS preference): subscribe to both. */
function subscribe(onChange: () => void) {
  const mq = media();
  const observer = new MutationObserver(onChange);
  mq.addEventListener("change", onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    mq.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

export function ThemeToggle() {
  // Server render has no theme: show a neutral label until the browser knows.
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
  };

  const label = theme === null ? ui.themeToggle : theme === "dark" ? ui.themeToLight : ui.themeToDark;
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-11 items-center justify-center rounded-md border border-line bg-surface text-ink hover:border-ink-faint"
    >
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
