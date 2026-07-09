import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { IconArrowRight } from "@/components/icons"

const steps = [
  {
    n: "01",
    title: "be in the top 15",
    body: "hold one of the 15 largest positions in the pump.fun sol-ecash token. only the top 15 holders qualify, nobody else.",
  },
  {
    n: "02",
    title: "the fork happens",
    body: "august 21, 2026, block ~964,000. real eCash comes into existence as a bitcoin hard fork, not a token on any chain.",
  },
  {
    n: "03",
    title: "redeem once",
    body: "each qualifying holder can perform a single one-time redemption of their sol-ecash into real eCash. one swap per holder, ever.",
  },
]

export function SolTokenPage() {
  return (
    <PageShell>
      <PageHero
        label="sol token"
        title="sol-ecash → real eCash"
        subhead="how the top 15 holders of the pump.fun sol-ecash token can each redeem once into real eCash after the fork."
        center
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />

        <div className="px-2 sm:px-8 lg:px-14">
          {/* the clarifier, first */}
          <Reveal>
            <div className="mx-auto max-w-2xl border border-accent/50 bg-accent-fade px-6 py-6 text-center md:px-10">
              <p className="font-display text-[clamp(18px,2.2vw,24px)] font-medium lowercase leading-snug text-ink">
                eCash isn't a token. it's a bitcoin hard fork.
              </p>
              <p className="mt-3 text-[14px] leading-[1.65] text-ink/65">
                the sol-ecash token on pump.fun is an unofficial community token on solana. it is
                not eCash, and you never need it: every BTC holder receives real eCash 1:1 at the
                fork, automatically. this page only documents a one-time courtesy swap for its
                largest holders.
              </p>
            </div>
          </Reveal>

          {/* how the swap works */}
          <div className="pt-12 md:pt-14">
            <SectionLabel>how the swap works</SectionLabel>
            <div className="mt-6 grid gap-px overflow-hidden border border-ink/15 bg-ink/10 sm:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06}>
                  <div className="h-full bg-white p-6">
                    <span className="mono text-[12px] tabular-nums text-accent-deep">{s.n}</span>
                    <h3 className="mt-3 font-display text-[17px] font-medium lowercase text-ink">{s.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-ink/60">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-4 border-l-2 border-accent bg-accent/10 px-5 py-3.5 text-[13.5px] leading-[1.6] text-ink/70">
                details, timing, and the redemption process are announced through official
                channels. if you are not in the top 15, nothing here applies to you: hold BTC and
                you get real eCash anyway.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://dexscreener.com/search?q=ecash"
                  target="_blank"
                  rel="noreferrer"
                  className="mono inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[12px] uppercase tracking-[0.06em] text-accent transition-colors hover:bg-ink-pure"
                >
                  find the token on dexscreener
                  <IconArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://t.me/ecashcom_official"
                  target="_blank"
                  rel="noreferrer"
                  className="mono inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-[12px] uppercase tracking-[0.06em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-accent"
                >
                  official announcements
                </a>
              </div>
            </Reveal>
          </div>

          <div className="py-16 md:pb-24 md:pt-16">
            <NextLinks
              links={[
                { name: "what to expect", href: "/what-to-expect", note: "how the real 1:1 works" },
                { name: "faq", href: "/faq", note: "common questions, answered" },
                { name: "socials", href: "/socials", note: "the official channels" },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
