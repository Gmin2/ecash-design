import { EdgeRulers, SectionLabel } from "./primitives"

const outlets = [
  "Bitcoin News",
  "ForkLog",
  "CryptoNews",
  "Crypto Economy",
  "Binance Square",
  "Bitcoin Magazine",
  "CoinDesk",
  "Decrypt",
]

export function Media() {
  const row = [...outlets, ...outlets]
  return (
    <section id="media" className="scroll-mt-20 bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel>as seen in</SectionLabel>
        <div className="py-10">
          <div
            className="relative overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            <div className="flex w-max gap-12" style={{ animation: "marqueeX 38s linear infinite" }}>
              {row.map((o, i) => (
                <span
                  key={i}
                  className="shrink-0 font-display text-[clamp(18px,2.2vw,26px)] font-medium text-ink/40"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
