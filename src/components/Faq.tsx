import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "./Reveal"
import { BracketHeading, EdgeRulers, SectionLabel } from "./primitives"

const faqs = [
  {
    q: "do i need to do anything to get eCash?",
    a: "no. every BTC address gets eCash 1:1 at block ~964,000. no claim, no form, no whitelist. run a node and you have it.",
  },
  {
    q: "what happens to my BTC?",
    a: "nothing. your BTC stays yours. eCash is a separate coin you also receive — before: 1 BTC, after fork: 1 BTC + 1 eCash.",
  },
  {
    q: "what is a drivechain?",
    a: "BIP 300/301 let bitcoin add sidechains without changing the L1. eCash activates them via the hard fork — sidechains for everything BTC cant do.",
  },
  {
    q: "wont the hashrate be low? how do you prevent a 51% attack?",
    a: "eCash is merged-mined by bitcoin miners, so no new hashrate has to be bootstrapped. BitcoinSV was never 51% attacked even at under 0.5% hashrate.",
  },
  {
    q: "when is the fork?",
    a: "at block ~964,000, around 21 august 2026. download bitwindow and sync a node before then.",
  },
  {
    q: "where can i trade eCash?",
    a: "exchanges and instant-swaps are listed at launch. because it is a hard fork, any BTC liquidity becomes eCash liquidity — BTC is an on-ramp.",
  },
]

export function Faq() {
  return (
    <section id="launch-faq" className="scroll-mt-20 bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel>faq</SectionLabel>
        <div className="grid gap-10 py-14 md:grid-cols-[0.7fr_1.3fr] md:py-20">
          <Reveal>
            <BracketHeading className="lowercase text-[clamp(28px,4vw,48px)]">
              &nbsp;common questions&nbsp;
            </BracketHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="w-full border-t border-hairline">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-hairline">
                  <AccordionTrigger className="font-display text-[17px] font-medium text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl text-[15px] leading-[1.55] text-ink/65">
                    {f.a}
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
