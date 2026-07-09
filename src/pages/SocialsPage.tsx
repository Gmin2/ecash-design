import type { ComponentType } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { IconArrowRight, IconGithub, IconTelegram, IconX, IconYoutube } from "@/components/icons"
import socials from "../data/socials.json"

type Channel = (typeof socials)[number]

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9z" />
    </svg>
  )
}

const platformIcon: Record<string, ComponentType<{ className?: string }>> = {
  "X · Twitter": IconX,
  Telegram: IconTelegram,
  YouTube: IconYoutube,
  GitHub: IconGithub,
  Blog: IconGlobe,
}

const roleLabel: Record<string, string> = {
  official: "official",
  "main-contributor": "core contributor",
  community: "community",
}

function RoleChip({ role }: { role: string }) {
  const official = role === "official"
  const core = role === "main-contributor"
  return (
    <span
      className={`mono inline-flex items-center rounded-full px-2.5 py-1 text-[9.5px] uppercase tracking-[0.1em] ${
        official
          ? "bg-accent text-ink"
          : core
            ? "border border-accent-deep/50 text-accent-deep"
            : "border border-dashed border-ink/25 text-ink/45"
      }`}
    >
      {roleLabel[role] ?? role}
    </span>
  )
}

// keep platforms in first-seen order
const platforms = socials.reduce<string[]>((acc, s) => {
  if (!acc.includes(s.platform)) acc.push(s.platform)
  return acc
}, [])

function stripUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export function SocialsPage() {
  return (
    <PageShell>
      <PageHero
        label="community"
        title="where eCash lives"
        subhead="every place the community gathers, grouped by platform. announcements, debate, and a decade of drivechain talks."
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />

        <p className="mono pb-2 text-[12px] uppercase tracking-[0.12em] text-ink/45">
          {socials.length} channels · {platforms.length} platforms
        </p>

        {platforms.map((platform) => {
          const items = socials.filter((s) => s.platform === platform)
          const Glyph = platformIcon[platform] ?? IconGlobe
          return (
            <div key={platform}>
              <SectionLabel>{platform}</SectionLabel>
              <div className="mt-6 grid gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c: Channel, i) => (
                  <Reveal key={c.url} delay={i * 0.05}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col border border-accent/40 bg-accent-fade p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-deep/60 hover:shadow-[0_10px_30px_rgba(232,168,74,0.22)]"
                    >
                      <div className="flex items-start justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-accent/25 text-accent-deep transition-colors group-hover:bg-accent group-hover:text-ink">
                          <Glyph className="h-5 w-5" />
                        </span>
                        <RoleChip role={c.role} />
                      </div>
                      <h3 className="mt-6 font-display text-[18px] font-medium tracking-[-0.01em] text-ink">
                        {c.handle}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.5] text-ink/60">{c.description}</p>
                      <span className="mono mt-auto flex items-center gap-2 pt-5 text-[11px] tracking-[0.02em] text-ink/45 transition-colors group-hover:text-accent-deep">
                        {stripUrl(c.url)}
                        <IconArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}

        <div className="py-16 md:pb-24 md:pt-12">
          <NextLinks
            links={[
              { name: "media", href: "/media", note: "talks, interviews and explainers" },
              { name: "reading", href: "/reading", note: "the essays behind the thesis" },
              { name: "faq", href: "/faq", note: "common questions, answered" },
            ]}
          />
        </div>
      </div>
    </PageShell>
  )
}
