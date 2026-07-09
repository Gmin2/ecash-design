import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"
import { BracketHeading } from "./primitives"

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const IconDownload = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 3v12M7 11l5 5 5-5" />
    <path d="M5 20h14" />
  </svg>
)
const IconGift = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="4" y="9" width="16" height="11" rx="1.5" />
    <path d="M4 13h16M12 9v11M9 9a2.5 2.5 0 1 1 3-2.5A2.5 2.5 0 1 1 15 9" />
  </svg>
)
const IconCubes = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 11.7V5.3L7 3 2 5.3v6.4L7 14l5-2.3Z" />
    <path d="M22 11.7V5.3L17 3l-5 2.3v6.4L17 14l5-2.3Z" />
    <path d="M17 20.4V14l-5-2.3L7 14v6.4L12 22.7l5-2.3Z" />
  </svg>
)

type Step = { n: number; eyebrow: string; title: string; body: string; cta: string; href: string; icon: ReactNode }

const steps: Step[] = [
  {
    n: 1,
    eyebrow: "before",
    title: "run a node",
    body: "download BitWindow and sync an eCash node before block ~964,000. no account, no form, no whitelist.",
    cta: "download bitwindow",
    href: "#run-a-node",
    icon: IconDownload,
  },
  {
    n: 2,
    eyebrow: "fork day · 21 aug 2026",
    title: "the 1:1 airdrop",
    body: "the hard fork activates BIP 300/301. every BTC address gets eCash 1:1. your BTC stays yours.",
    cta: "the airdrop",
    href: "#the-airdrop",
    icon: IconGift,
  },
  {
    n: 3,
    eyebrow: "after",
    title: "use the sidechains",
    body: "a DEX, privacy, payments. everything BTC cant do. BTC becomes an on-ramp for eCash.",
    cta: "what BTC cant do",
    href: "#solution",
    icon: IconCubes,
  },
]

export function WhatToExpect() {
  return (
    <section
      id="what-to-expect"
      className="notch-top relative overflow-hidden bg-night text-paper"
    >
      {/* concentric rings */}
      <span
        className="pointer-events-none absolute left-[58%] top-1/2 hidden aspect-square w-[900px] -translate-y-1/2 md:block"
        style={{
          background:
            "repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 1px, transparent 1px 46px)",
          WebkitMaskImage: "radial-gradient(circle, #000 25%, transparent 70%)",
          maskImage: "radial-gradient(circle, #000 25%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1126px] px-6 pb-24 pt-32 md:pb-28">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <span className="mono text-[12px] uppercase tracking-[0.16em] text-accent">
                what to expect
              </span>
              <BracketHeading className="mt-4 lowercase text-[clamp(30px,4.4vw,56px)]">
                &nbsp;three moments&nbsp;
              </BracketHeading>
              <Link
                to="/what-to-expect"
                className="group mt-6 inline-flex items-center gap-2 font-display text-[15px] font-medium text-accent transition-colors hover:text-paper"
              >
                the full timeline
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </Reveal>

          {/* numbered timeline */}
          <div className="relative">
            <span className="absolute bottom-8 left-[17px] top-8 w-px bg-white/15" aria-hidden="true" />
            <div className="flex flex-col gap-14">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <div className="grid grid-cols-[36px_56px_1fr] items-start gap-5">
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-night ring-1 ring-white/25">
                      <span className="mono text-[12px] text-accent">{s.n}</span>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-accent text-night">
                      {s.icon}
                    </div>
                    <div>
                      <span className="mono text-[11px] uppercase tracking-[0.14em] text-paper/45">
                        {s.eyebrow}
                      </span>
                      <h3 className="mt-1 font-display text-[24px] font-medium lowercase tracking-[-0.01em] text-paper">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-[440px] text-[15px] leading-[1.5] text-paper/55">
                        {s.body}
                      </p>
                      <a
                        href={s.href}
                        className="mono mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-[12px] uppercase tracking-[0.06em] text-night transition-colors hover:bg-accent"
                      >
                        {s.cta}
                        <Arrow />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
