import Image from "next/image";
import { experience, stats } from "@/content/site";
import { Container, Label, Stat } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/** Logo chip on a constant light ground (on-band) so logos read in both themes; name tile if no logo file. */
function LogoTile({ job }: { job: (typeof experience)[number] }) {
  return (
    <div className="flex h-12 w-fit min-w-24 items-center gap-2 rounded-md border border-line bg-on-band px-3" aria-hidden={!job.logo || job.logo.mark ? true : undefined}>
      {job.logo && <Image src={job.logo.src} alt={job.logo.alt} width={job.logo.width} height={job.logo.height} className="h-7 w-auto" />}
      {(!job.logo || job.logo.mark) && <span className="text-[15px] font-bold tracking-[-0.02em] text-ink-band">{job.org}</span>}
    </div>
  );
}

/** Stat strip + experience strip with company logos, directly under the hero. */
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

      <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 sm:mt-10 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-6">
        {experience
          .filter((job) => job.onHome)
          .map((job) => (
            <li
              key={job.org}
              className={cn("grid content-start gap-1 border-t-2 pt-3 sm:pt-3.5", job.current ? "border-jacaranda" : "border-ink")}
            >
              <LogoTile job={job} />
              <Label as="span" className="mt-2 text-ink-faint">
                {job.dates}
              </Label>
              <span className="font-semibold sm:text-[17px]">{job.org}</span>
              <span className="text-[13px] text-ink-muted sm:text-sm">{job.role}</span>
            </li>
          ))}
      </ul>
    </Container>
  );
}
