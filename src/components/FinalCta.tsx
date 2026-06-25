import { Reveal } from "./Reveal"
import { IconArrowRight } from "./icons"

export function FinalCta() {
  return (
    <section className="notch-top relative overflow-hidden bg-night text-paper">
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[1100px] -translate-x-1/2 -translate-y-1/2 md:block"
        style={{
          background: "repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 1px, transparent 1px 50px)",
          WebkitMaskImage: "radial-gradient(circle, #000 20%, transparent 65%)",
          maskImage: "radial-gradient(circle, #000 20%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1126px] px-6 pb-28 pt-32 text-center">
        <Reveal>
          <span className="mono text-[12px] uppercase tracking-[0.16em] text-accent">
            august 21, 2026
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(34px,5.5vw,72px)] font-medium lowercase leading-[1.0] tracking-[-0.03em]">
            <span className="text-accent">[</span> fork bitcoin. keep your BTC.
            get eCash 1:1 <span className="text-accent">]</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#run-a-node"
              className="mono inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[13px] uppercase tracking-[0.06em] text-night transition-colors hover:bg-accent-deep"
            >
              download bitwindow <IconArrowRight className="size-4" />
            </a>
            <a
              href="#what-to-expect"
              className="mono inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] uppercase tracking-[0.06em] text-paper transition-colors hover:border-white/60"
            >
              what to expect
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
