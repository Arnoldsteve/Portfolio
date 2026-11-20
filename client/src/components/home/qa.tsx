import { qaFindings, qaSection } from "@/content/site";
import { Container, Label } from "@/components/ui/primitives";

export function Qa() {
  return (
    <Container as="section" id="qa" className="flex flex-wrap gap-5 pt-16 sm:gap-12 sm:pt-28">
      <div className="flex-[1_1_320px]">
        <Label>{qaSection.eyebrow}</Label>
        <h2 className="mt-2 text-[28px] leading-[1.15] font-semibold tracking-[-0.025em] sm:mt-3 sm:text-[40px] sm:leading-[1.1]">
          {qaSection.heading}
        </h2>
        <p className="mt-[18px] hidden text-[17px] leading-[1.6] text-ink-muted sm:block">{qaSection.text}</p>
      </div>
      <ul className="m-0 grid flex-[1.4_1_480px] list-none gap-2.5 p-0 sm:gap-3">
        {qaFindings.map((f) => (
          <li key={f.kind} className="flex flex-wrap gap-2 rounded-[14px] border border-line bg-surface p-4 sm:gap-5 sm:rounded-lg sm:px-6 sm:py-[22px]">
            <Label as="span" className="h-[18px] basis-full border-l-3 border-ochre pl-2 sm:basis-[110px] sm:pl-2.5">
              {f.kind}
            </Label>
            <span className="flex-[1_1_280px] text-[15px] leading-[1.5] sm:text-base sm:leading-[1.55]">{f.text}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
