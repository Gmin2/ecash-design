import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers } from "@/components/primitives"
import faqItems from "../data/faq.json"

const crossLinks = [
  { name: "why hardfork", href: "/why-hardfork", note: "the case for forking bitcoin" },
  { name: "what to expect", href: "/what-to-expect", note: "fork mechanics, step by step" },
  { name: "drivechain faq", href: "https://drivechain.info", note: "BIP 300/301 technical questions", external: true },
]

export function FaqPage() {
  return (
    <PageShell>
      <PageHero
        label="faq"
        title="common questions"
        subhead="the hardfork, drivechains, mining, exchanges, and the airdrop. answered."
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <div className="py-10 md:py-14">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full border-t border-hairline">
              {faqItems.map((f, i) => (
                <AccordionItem key={f.question} value={f.question} className="border-hairline">
                  <AccordionTrigger className="gap-6 py-5 hover:no-underline">
                    <span className="flex items-baseline gap-4">
                      <span className="mono text-[12px] tabular-nums text-accent-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[17px] font-medium leading-snug text-ink md:text-[19px]">
                        {f.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7">
                    <div className="max-w-2xl space-y-4 pl-10 text-[15px] leading-[1.6] text-ink/70">
                      {f.answer.split("\n\n").map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/* keep reading */}
        <div className="pb-16 md:pb-24">
          <NextLinks links={crossLinks} />
        </div>
      </div>
    </PageShell>
  )
}
