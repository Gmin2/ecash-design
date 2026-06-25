import { Reveal } from "./Reveal"
import { EdgeRulers, FramedBand, SectionLabel } from "./primitives"

const stats = [
  { value: "21 aug", unit: "2026", label: "fork day" },
  { value: "964,000", unit: "", label: "activation block" },
  { value: "1:1", unit: "", label: "every BTC address" },
  { value: "300 / 301", unit: "BIP", label: "drivechains activated" },
]

export function StatBand() {
  return (
    <section className="bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel>the fork</SectionLabel>
        <div className="py-12 md:py-16">
          <FramedBand className="px-2 py-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="flex flex-col items-start px-6 py-8 max-md:border-b max-md:border-hairline md:border-l md:border-hairline md:first:border-l-0 md:[&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[clamp(34px,5vw,56px)] font-medium leading-none tracking-tight text-ink">
                        {s.value}
                      </span>
                      {s.unit && (
                        <span className="mono text-[13px] uppercase tracking-[0.06em] text-ink/55">
                          {s.unit}
                        </span>
                      )}
                    </div>
                    <span className="mono mt-3 text-[11px] uppercase tracking-[0.14em] text-ink/55">
                      {s.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </FramedBand>
        </div>
      </div>
    </section>
  )
}
