import { person, ui } from "@/content/site";
import { linkOr } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const linkClass = "inline-flex min-h-11 items-center text-ink-muted underline-offset-3 hover:text-ink hover:underline";

export function Footer() {
  const links = [
    { label: person.email, href: `mailto:${person.email}` },
    { label: ui.github, href: person.links.github },
    { label: ui.linkedin, href: person.links.linkedin },
    { label: ui.whatsapp, href: linkOr(person.links.whatsapp, "/contact") },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4 text-sm text-ink-muted sm:px-8 sm:py-6">
        <span>
          © {new Date().getFullYear()} {person.name} · {person.city}
        </span>
        <div className="flex flex-wrap items-center gap-x-4">
          <ul className="m-0 flex list-none flex-wrap gap-x-4 p-0">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkClass} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
