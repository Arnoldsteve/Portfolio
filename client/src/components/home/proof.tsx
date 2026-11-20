import { experience, stats } from "@/content/site";
import { Container, Label, Stat } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/** Stat strip + experience strip, directly under the hero. */
export function Proof() {
  return (
    <Container as="section" aria-label="Proof" className="pt-8 sm:pt-0">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:rounded-lg">
        {stats.map((s) => (
          <div key={s.cap} className="bg-surface p-4 sm:p-6">
            <Stat num={s.num} cap={s.cap} />
          </div>
        ))}
      </div>

      {/* Current role, previous role, own company. */}
      <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-6">
        {experience.slice(0, 3).map((job) => (
          <li
            key={job.org}
            className={cn("grid gap-0.5 border-t-2 pt-2.5 sm:gap-1 sm:pt-3.5", job.current ? "border-jacaranda" : "border-ink")}
          >
            <Label as="span" className="text-ink-faint">
              {job.dates}
            </Label>
            <span className="font-semibold sm:text-[17px]">{job.org}</span>
            <span className="text-sm text-ink-muted">
              {job.role} · {job.context}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
