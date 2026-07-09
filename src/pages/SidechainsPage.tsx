import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers } from "@/components/primitives"
import { IconArrowRight, IconGithub } from "@/components/icons"
import sidechains from "../data/sidechains.json"


const I = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)

// one glyph per sidechain, nucleo-style strokes
const glyphs: Record<string, ReactNode> = {
  thunder: I(<path d="M13 2.5 5.5 13.5H11L9.5 21.5 18.5 9.5H12.5L13 2.5z" />),
  zside: I(<><path d="M12 3l7 3v5c0 4.6-3 7.6-7 9.5-4-1.9-7-4.9-7-9.5V6l7-3z" /><path d="M9 11.5h6l-6 4h6" /></>),
  bitnames: I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="M15.5 12v1.5a2 2 0 0 0 4 0V12a7.5 7.5 0 1 0-3 6" /></>),
  bitassets: I(<><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" /><path d="M4 12l8 4.5 8-4.5" /><path d="M4 16.5 12 21l8-4.5" /></>),
  photon: I(<><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="9" ry="3.8" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-60 12 12)" /></>),
  truthcoin: I(<><path d="M4 20h16" /><path d="M6 20v-6" /><path d="M11 20V9" /><path d="M16 20V12" /><path d="M4 6.5 9 9l5-4 5 2.5" /></>),
  coinshift: I(<><path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" /></>),
}

function StatusChip({ status }: { status: string }) {
  const live = status === "live"
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] ${
        live ? "bg-accent/35 text-ink/80" : "border border-dashed border-ink/25 text-ink/45"
      }`}
    >
      {live ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-deep/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-deep" />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full border border-ink/40" />
      )}
      {live ? "live" : "in progress"}
    </span>
  )
}

export function SidechainsPage() {
  const liveCount = sidechains.filter((s) => s.status === "live").length
  return (
    <PageShell>
      <PageHero
        label="sidechains"
        title="seven sidechains at fork"
        subhead="seven working L2s launch alongside eCash on fork day. everything BTC cant do, each on its own chain, none of it forced onto the L1."
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />

        <p className="mono pb-2 text-[12px] uppercase tracking-[0.12em] text-ink/45">
          {sidechains.length} sidechains · {liveCount} live · {sidechains.length - liveCount} in progress
        </p>

        <div className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {sidechains.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <a
                href={s.repo}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col border border-accent/40 bg-accent-fade p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-deep/60 hover:shadow-[0_10px_30px_rgba(232,168,74,0.22)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-accent/25 text-accent-deep transition-colors group-hover:bg-accent group-hover:text-ink">
                    <span className={s.slug === "photon" ? "glyph-spin" : "glyph-anim"}>
                      {glyphs[s.slug]}
                    </span>
                  </span>
                  <StatusChip status={s.status} />
                </div>
                <div className="mt-6 flex items-baseline gap-2.5">
                  <span className="mono text-[11px] tabular-nums text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[20px] font-medium tracking-[-0.01em] text-ink">
                    {s.name}
                  </h3>
                </div>
                <p className="mt-2 text-[14px] leading-[1.5] text-ink/60">{s.description}</p>
                <span className="mono mt-auto flex items-center gap-2 pt-5 text-[11px] uppercase tracking-[0.08em] text-ink/45 transition-colors group-hover:text-accent-deep">
                  <IconGithub className="h-4 w-4" />
                  {s.repo.replace("https://github.com/", "")}
                  <IconArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}

          {/* filler card keeps the 3-col grid balanced and lands the message */}
          <Reveal delay={sidechains.length * 0.05}>
            <div className="flex h-full flex-col justify-between border border-dashed border-accent-deep/40 bg-accent/5 p-6">
              <p className="font-display text-[17px] font-medium lowercase leading-snug text-ink/60">
                sidechains are permissionless. anyone can build the eighth.
              </p>
              <a
                href="https://drivechain.info"
                target="_blank"
                rel="noreferrer"
                className="mono mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-accent-deep transition-colors hover:text-ink"
              >
                learn how on drivechain.info
                <IconArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* photon footnote */}
        <Reveal>
          <p className="max-w-2xl border-l-2 border-accent bg-accent/10 px-5 py-4 text-[14px] leading-[1.6] text-ink/70">
            photon is the quantum-resistant sidechain. it is how eCash answers the
            quantum question without touching the L1.{" "}
            <Link to="/faq" className="font-medium text-accent-deep hover:text-ink">
              see the faq →
            </Link>
          </p>
        </Reveal>

        <div className="py-16 md:pb-24">
          <NextLinks
            links={[
              { name: "why hardfork", href: "/why-hardfork", note: "why these need a fork at all" },
              { name: "what to expect", href: "/what-to-expect", note: "fork mechanics, step by step" },
              { name: "bounty", href: "/bounty", note: "these repos pay bounties right now" },
            ]}
          />
        </div>
      </div>
    </PageShell>
  )
}
