"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ui } from "@/content/site";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(currentTheme()), []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
    setTheme(next);
  };

  const label = theme === "dark" ? ui.themeToLight : ui.themeToDark;
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
