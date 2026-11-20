import Link from "next/link";
import type { ComponentProps } from "react";
import { cn, isExternal } from "@/lib/utils";

const variants = {
  /** The one jacaranda action per view. */
  primary: "bg-jacaranda border-jacaranda text-on-jacaranda hover:bg-jacaranda-deep hover:border-jacaranda-deep",
  secondary: "bg-surface border-line text-ink hover:border-ink-faint",
  /** On the SaTechs navy band. */
  onNavy: "bg-surface border-surface text-navy hover:bg-paper",
  outlineNavy: "bg-transparent border-on-navy-muted text-on-navy hover:bg-band-well",
  /** On the dark ink band. */
  onBand: "bg-on-band-jacaranda border-on-band-jacaranda text-ink-band hover:opacity-90",
  outlineBand: "bg-transparent border-band-line text-on-band hover:bg-band-well",
} as const;

const sizes = {
  md: "min-h-12 sm:min-h-13 px-6 text-base",
  sm: "min-h-11 px-4 text-[15px]",
} as const;

export type ButtonVariant = keyof typeof variants;

type StyleProps = { variant?: ButtonVariant; size?: keyof typeof sizes; block?: boolean };

export function buttonClasses({ variant = "secondary", size = "md", block = false }: StyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md border font-semibold leading-none no-underline",
    "transition-colors duration-150 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
    variants[variant],
    sizes[size],
    block && "flex w-full",
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** A link styled as a button. External URLs and files open as plain anchors. */
export function ButtonLink({ variant, size, block, className, href, ...props }: ButtonLinkProps) {
  const classes = cn(buttonClasses({ variant, size, block }), className);
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props} />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}

type ButtonProps = StyleProps & ComponentProps<"button">;

export function Button({ variant, size, block, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClasses({ variant, size, block }), className)} {...props} />;
}
