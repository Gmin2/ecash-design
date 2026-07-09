import { Link } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "./Reveal"
import { IconArrowRight } from "./icons"
import { BracketHeading, EdgeRulers, SectionLabel } from "./primitives"
import faqItems from "../data/faq.json"

const teaser = faqItems.slice(0, 4)

export function Faq() {
  return (
    <section id="launch-faq" className="scroll-mt-20 bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel>faq</SectionLabel>
        <div className="grid gap-10 py-14 md:grid-cols-[0.7fr_1.3fr] md:py-20">
          <Reveal>
            <div>
              <BracketHeading className="lowercase text-[clamp(28px,4vw,48px)]">
                &nbsp;common questions&nbsp;
              </BracketHeading>
              <Link
                to="/faq"
                className="group mt-6 inline-flex items-center gap-2 font-display text-[15px] font-medium text-accent-deep transition-colors hover:text-ink"
              >
                all {faqItems.length} questions
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="w-full border-t border-hairline">
              {teaser.map((f) => (
                <AccordionItem key={f.question} value={f.question} className="border-hairline">
                  <AccordionTrigger className="font-display text-[17px] font-medium text-ink hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl space-y-3 text-[15px] leading-[1.55] text-ink/65">
                    {f.answer.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
