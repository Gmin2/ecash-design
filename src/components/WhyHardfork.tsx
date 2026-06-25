import { Reveal } from "./Reveal"
import { EdgeRulers } from "./primitives"

const points = [
  "bitcoin can still improve. drivechains are ready. eCash ships them.",
  "BTC becomes an on-ramp — its liquidity becomes eCash liquidity.",
  "the L1 stays identical to Bitcoin Core. nothing is forced onto BTC.",
]

export function WhyHardfork() {
  return (
    <section id="why" className="scroll-mt-20 bg-accent text-ink">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <div className="py-20 md:py-28">
          <Reveal>
            <span className="mono text-[12px] uppercase tracking-[0.16em] text-ink/60">
              why hardfork
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(30px,4.6vw,60px)] font-medium lowercase leading-[1.04] tracking-[-0.02em]">
              <span className="text-ink/55">[</span> it is not the BTC code that
              is broken — it is the BTC community <span className="text-ink/55">]</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-3">
            {points.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="h-full bg-accent p-6">
                  <span className="mono text-[12px] text-ink/45">0{i + 1}</span>
                  <p className="mt-3 font-display text-[16px] leading-[1.4] text-ink/85">
                    {p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <a
              href="#"
              className="mono mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] uppercase tracking-[0.06em] text-accent transition-colors hover:bg-ink-pure"
            >
              read the essay →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
