import type { Metadata } from "next";
import { contactPage as c, faq, person, seo, ui } from "@/content/site";
import { ContactRouter } from "@/components/contact/contact-router";
import { ButtonLink } from "@/components/ui/button";
import { Container, Fact, Label } from "@/components/ui/primitives";
import { isRouteId } from "@/lib/contact-schema";
import { linkOr } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: seo.contact.title },
  description: seo.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: seo.contact.title, description: seo.contact.description, url: "/contact" },
};

type Props = { searchParams: Promise<{ route?: string }> };

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const textLink = "font-semibold text-jacaranda underline-offset-3 hover:underline";

export default async function ContactPage({ searchParams }: Props) {
  const { route } = await searchParams;
  const initialRoute = isRouteId(route) ? route : "build";
  const whatsapp = linkOr(person.links.whatsapp, `mailto:${person.email}`);

  return (
    <>
      <Container as="section" className="pt-7 sm:pt-14">
        <Label>{c.eyebrow}</Label>
        <h1 className="mt-2 text-[38px] leading-[1.05] font-semibold tracking-[-0.035em] sm:mt-3 sm:text-[clamp(40px,5vw,64px)]">{c.heading}</h1>
        <p className="mt-2.5 text-base text-ink-muted sm:mt-4 sm:text-[19px]">{c.text}</p>
      </Container>

      <Container className="flex flex-wrap gap-6 sm:gap-8">
        <div className="min-w-0 flex-[999_1_560px]">
          <ContactRouter key={initialRoute} initialRoute={initialRoute} />
        </div>

        <aside className="grid flex-[1_1_300px] content-start gap-3 sm:mt-10 sm:gap-4">
          <div className="grid gap-3.5 rounded-lg bg-ink-band p-[18px] text-on-band sm:p-7">
            <Label as="span" className="text-on-band-ochre">
              {c.talkEyebrow}
            </Label>
            <span className="text-lg leading-[1.25] font-semibold sm:text-[22px]">{c.talkHeading}</span>
            <span className="text-[15px] leading-[1.55] text-on-band-muted">{c.talkText}</span>
            <ButtonLink href={linkOr(person.links.booking, ui.bookCall.href)} variant="onBand" block>
              {c.talkCta}
            </ButtonLink>
          </div>

          {/* Phone: WhatsApp and Email as two buttons. */}
          <div className="grid grid-cols-2 gap-2.5 sm:hidden">
            <ButtonLink href={whatsapp}>{ui.whatsapp}</ButtonLink>
            <ButtonLink href={`mailto:${person.email}`}>{ui.emailLabel}</ButtonLink>
          </div>

          <div className="hidden gap-3.5 rounded-lg border border-line bg-surface p-6 sm:grid">
            <Fact label={ui.emailLabel}>
              <a href={`mailto:${person.email}`} className={textLink}>
                {person.email}
              </a>
            </Fact>
            <Fact label={c.elsewhereLabel}>
              <span className="flex flex-wrap gap-x-2">
                <a href={whatsapp} className={textLink}>
                  {ui.whatsapp}
                </a>
                ·
                <a href={person.links.linkedin} {...ext} className={textLink}>
                  {ui.linkedin}
                </a>
                ·
                <a href={person.links.github} {...ext} className={textLink}>
                  {ui.github}
                </a>
              </span>
            </Fact>
            <Fact label={c.hoursLabel}>{c.hours}</Fact>
          </div>
        </aside>
      </Container>

      <Container as="section" className="max-w-[880px] pt-12 pb-16 sm:pt-24 sm:pb-30">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[32px]">{c.faqHeading}</h2>
        <div className="mt-3.5 grid gap-2 sm:mt-6 sm:gap-2.5">
          {faq.map((item) => (
            <details key={item.q} className="rounded-md border border-line bg-surface px-4 py-3.5 sm:rounded-[14px] sm:px-[22px] sm:py-[18px]">
              <summary className="cursor-pointer text-[15px] font-semibold sm:text-[17px]">{item.q}</summary>
              <p className="mt-2.5 text-sm leading-[1.6] text-ink-muted sm:mt-3 sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
