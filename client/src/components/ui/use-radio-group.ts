"use client";

import { useRef, type KeyboardEvent } from "react";

const STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/**
 * Keyboard behaviour of a native radio group for custom `role="radio"` buttons:
 * arrow keys move focus and select. Pair with `tabIndex={selected ? 0 : -1}` on each option.
 */
export function useRadioGroup<T extends string>(ids: readonly T[], select: (id: T) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const radioProps = (index: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      refs.current[index] = el;
    },
    onKeyDown: (e: KeyboardEvent) => {
      const step = STEP[e.key];
      if (!step) return;
      e.preventDefault();
      const next = (index + step + ids.length) % ids.length;
      select(ids[next]);
      refs.current[next]?.focus();
    },
  });

  return radioProps;
}
