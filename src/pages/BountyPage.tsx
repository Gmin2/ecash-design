import { useEffect, useState } from "react"
import { PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, FramedBand, SectionLabel } from "@/components/primitives"
import { IconArrowRight, IconGithub, IconAward } from "@/components/icons"
import bounty from "../data/bounty.json"

const tierColor: Record<string, string> = {
  T1: "text-danger",
  T2: "text-accent-deep",
  T3: "text-ink/70",
  T4: "text-ink/50",
  T5: "text-ink/40",
}

const steps = [
  { n: "01", title: "pay the entry", body: "a one-time entry fee (20 telegram stars) opens your two-week window for the contest." },
  { n: "02", title: "hunt", body: "review the in-scope repos and document each bug you find: what it is, and why it qualifies." },
  { n: "03", title: "submit", body: "send your bug list to @psztorc by wednesday 09:00 UTC. invalid submissions incur negative points, so be sure." },
  { n: "04", title: "get paid", body: "winners are announced thursday 5pm NYC and bug lists are made public. payouts in BTC or USD." },
]

type Parts = { d: number; h: number; m: number; s: number }
function nextDeadline(): { date: Date | null; parts: Parts } {
  const now = Date.now()
  const upcoming = bounty.deadlines_utc.map((d) => new Date(d)).find((d) => d.getTime() > now) ?? null
  if (!upcoming) return { date: null, parts: { d: 0, h: 0, m: 0, s: 0 } }
  const ms = upcoming.getTime() - now
  const t = Math.floor(ms / 1000)
  return {
    date: upcoming,
    parts: { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 },
  }
}

function DeadlineChip() {
  const [state, setState] = useState(nextDeadline)
  useEffect(() => {
    const id = setInterval(() => setState(nextDeadline()), 1000)
    return () => clearInterval(id)
  }, [])
  const { date, parts } = state
  if (!date) {
    return (
      <span className="mono inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-ink/50">
        season complete
      </span>
    )
  }
  const p = (n: number) => String(n).padStart(2, "0")
  const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).toLowerCase()
  return (
    <span className="mono inline-flex items-center gap-2.5 rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-[12px] tracking-[0.06em] text-ink">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-deep/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-deep" />
      </span>
      next deadline {label}
      <span className="font-medium tabular-nums text-accent-deep">
        {parts.d}d {p(parts.h)}h {p(parts.m)}m {p(parts.s)}s
      </span>
    </span>
  )
}

export function BountyPage() {
  const stats = [
    { v: "$20,000", l: "per contest" },
    { v: "5", l: "contests total" },
    { v: "biweekly", l: "cadence" },
    { v: "3", l: "winners / round" },
  ]

  return (
    <PageShell>
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel highlight>bounty</SectionLabel>

        {/* hero */}
        <div className="py-10 md:py-14">
          <Reveal>
            <h1 className="font-display text-[clamp(56px,10vw,120px)] font-medium leading-[0.9] tracking-[-0.03em] text-ink">
              $100,000
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl font-display text-[clamp(17px,2vw,22px)] leading-snug text-ink/70">
              summer 2026 bug hunt hackathon. by layertwolabs, cross-promoted by eCash.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6">
              <DeadlineChip />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={bounty.primary_cta.url}
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[13px] uppercase tracking-[0.06em] text-ink transition-colors hover:bg-accent-deep"
              >
                submit via @psztorc
                <IconArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://drivechain.info/blog/bug-contest/"
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-[13px] uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink hover:text-accent"
              >
                full rules ↗
              </a>
            </div>
          </Reveal>
        </div>

        {/* stats strip */}
        <Reveal>
          <div className="grid grid-cols-2 border border-hairline md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`px-6 py-6 ${i % 2 === 1 ? "border-l border-hairline" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} md:border-l md:first:border-l-0 border-hairline`}
              >
                <div className="font-display text-[clamp(24px,3vw,34px)] font-medium leading-none text-ink">{s.v}</div>
                <div className="mono mt-2 text-[10.5px] uppercase tracking-[0.12em] text-ink/50">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* scope */}
        <div className="pt-16 md:pt-20">
          <SectionLabel>scope</SectionLabel>
          <div className="pt-6">
            <Reveal>
              <div className="mb-4 flex items-start gap-3 border border-danger/40 bg-danger/[0.06] px-5 py-4">
                <span className="mono mt-0.5 shrink-0 rounded bg-danger px-2 py-0.5 text-[11px] font-medium text-white">T1</span>
                <p className="text-[14px] leading-[1.55] text-ink/75">
                  one <span className="font-medium text-ink">ForkNet</span> bug is an automatic 1st
                  place, regardless of what else is submitted. this is the repo to hit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="overflow-x-auto border border-hairline">
                <table className="w-full min-w-[560px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-hairline bg-ink/[0.02]">
                      {["tier", "repo", "severity", ""].map((h, i) => (
                        <th key={i} className="mono px-4 py-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink/45">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {bounty.repos_in_scope.map((r) => (
                      <tr key={r.name} className="transition-colors hover:bg-accent/[0.04]">
                        <td className="px-4 py-3">
                          <span className={`mono text-[12px] font-medium ${tierColor[r.tier] ?? "text-ink/60"}`}>{r.tier}</span>
                        </td>
                        <td className="px-4 py-3 font-display font-medium text-ink">{r.name}</td>
                        <td className="px-4 py-3 text-ink/55">{r.severity.replace("—", "·")}</td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-accent-deep hover:text-ink"
                          >
                            <IconGithub className="h-3.5 w-3.5" />
                            repo
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal>
              <p className="mono mt-3 text-[11px] uppercase tracking-[0.08em] text-ink/40">
                dev stack reference · drivechain.info/dev.txt
              </p>
            </Reveal>
          </div>
        </div>

        {/* severity + prizes */}
        <div className="grid gap-8 pt-16 md:grid-cols-2 md:pt-20">
          <div>
            <SectionLabel>severity</SectionLabel>
            <Reveal>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {bounty.severity_tiers.map((t) => (
                  <li key={t.tier} className="flex items-start gap-4 py-4">
                    <span className={`mono shrink-0 text-[13px] font-medium ${tierColor[t.tier]}`}>{t.tier}</span>
                    <span className="text-[14px] leading-snug text-ink/70">{t.label.replace("—", "·")}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionLabel>prize pool</SectionLabel>
            <Reveal delay={0.05}>
              <FramedBand className="mt-6 px-6 py-7">
                <p className="mono text-[11px] uppercase tracking-[0.1em] text-ink/45">
                  at 4+ qualified entries, per contest
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { place: "1st", amt: bounty.prizes_at_4plus_entries["1st"] },
                    { place: "2nd", amt: bounty.prizes_at_4plus_entries["2nd"] },
                    { place: "3rd", amt: bounty.prizes_at_4plus_entries["3rd"] },
                  ].map((p, i) => (
                    <div key={p.place} className={i === 0 ? "rounded-lg bg-accent/20 py-4" : "py-4"}>
                      <div className="flex items-center justify-center gap-1.5">
                        {i === 0 && <IconAward className="h-3.5 w-3.5 text-accent-deep" />}
                        <span className="mono text-[11px] uppercase tracking-[0.1em] text-ink/50">{p.place}</span>
                      </div>
                      <div className="mt-1 font-display text-[clamp(20px,2.6vw,28px)] font-medium text-ink">
                        ${p.amt.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-ink/10 pt-4 text-[13.5px] leading-snug text-ink/65">
                  sole entry takes home the full <span className="font-medium text-ink">$20,000</span>. fewer
                  entrants means larger individual payouts. 5 contests total.
                </p>
              </FramedBand>
            </Reveal>
          </div>
        </div>

        {/* how to enter */}
        <div className="pt-16 md:pt-20">
          <SectionLabel>how to enter</SectionLabel>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="flex h-full gap-4 border border-hairline bg-white p-6">
                  <span className="mono text-[13px] tabular-nums text-accent-deep">{s.n}</span>
                  <div>
                    <h3 className="font-display text-[17px] font-medium lowercase text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-ink/60">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* full rules callout */}
          <Reveal>
            <a
              href="https://drivechain.info/blog/bug-contest/"
              target="_blank"
              rel="noreferrer"
              className="group mt-4 flex items-center justify-between gap-4 border border-ink/20 bg-accent/[0.06] px-6 py-5 transition-colors hover:bg-accent/[0.12]"
            >
              <div>
                <span className="mono text-[11px] uppercase tracking-[0.1em] text-accent-deep">complete rules &amp; info</span>
                <p className="mt-1 font-display text-[16px] font-medium text-ink">
                  the full contest rules, scoring, and fine print live on drivechain.info
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/50 transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="py-16 md:pb-24 md:pt-20">
          <NextLinks
            links={[
              { name: "sidechains", href: "/sidechains", note: "the repos in scope" },
              { name: "why hardfork", href: "/why-hardfork", note: "why this is worth hardening" },
              { name: "reading", href: "/reading", note: "the dev stack and source material" },
            ]}
          />
        </div>
      </div>
    </PageShell>
  )
}
