import { useState } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { IconX, IconYoutube } from "@/components/icons"
import ecash from "../data/endorsements-ecash.json"
import archive from "../data/endorsements-drivechain-archive.json"

type Entry = {
  id: string
  type: string
  person: string
  handle?: string
  role?: string
  snippet: string
  link: string
  date?: string
  featured?: boolean
}

const forkFeed = ecash as Entry[]
const archiveFeed = [...(archive as Entry[])].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
)

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
function fmtDate(d?: string) {
  if (!d) return null
  const [y, m] = d.split("-")
  if (!y || !m) return d
  return `${months[Number(m) - 1]} ${y}`
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9z" />
    </svg>
  )
}

function IconMic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  )
}

function typeIcon(type: string) {
  switch (type) {
    case "Tweet":
      return IconX
    case "Video":
      return IconYoutube
    case "Podcast":
      return IconMic
    default:
      return IconGlobe
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function QuoteCard({ e }: { e: Entry }) {
  const Icon = typeIcon(e.type)
  const date = fmtDate(e.date)
  return (
    <a
      href={e.link}
      target="_blank"
      rel="noreferrer"
      className={`group mb-4 block break-inside-avoid border p-5 transition-all duration-200 hover:-translate-y-0.5 ${
        e.featured
          ? "border-accent/60 bg-accent-fade hover:border-accent-deep/70 hover:shadow-[0_10px_30px_rgba(232,168,74,0.22)]"
          : "border-hairline bg-white hover:border-accent/50 hover:shadow-[0_14px_36px_-26px_rgba(26,18,6,0.4)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`mono flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
            e.featured ? "bg-accent text-ink" : "bg-accent/20 text-accent-deep"
          }`}
        >
          {initials(e.person)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-[14.5px] font-medium text-ink">{e.person}</span>
          {e.handle && <span className="mono block truncate text-[10.5px] text-ink/45">{e.handle}</span>}
        </span>
        <Icon className="ml-auto h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-accent-deep" />
      </div>
      {e.role && <p className="mt-2.5 text-[11.5px] leading-snug text-ink/50">{e.role}</p>}
      <p className="mt-3 line-clamp-5 text-[13.5px] leading-[1.55] text-ink/70">{e.snippet}</p>
      <div className="mono mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-ink/35">
        <span>{e.type}</span>
        {date && (
          <>
            <span className="text-ink/20">·</span>
            <span>{date}</span>
          </>
        )}
        <span className="ml-auto transition-colors group-hover:text-accent-deep">↗</span>
      </div>
    </a>
  )
}

const archiveTypes = ["all", ...Array.from(new Set(archiveFeed.map((e) => e.type)))]

export function EndorsementsPage() {
  const [filter, setFilter] = useState("all")
  const shown = filter === "all" ? archiveFeed : archiveFeed.filter((e) => e.type === filter)

  return (
    <PageShell>
      <PageHero
        label="endorsements"
        title="dont take our word for it"
        subhead="what bitcoiners, researchers, and builders are saying about eCash and a decade of drivechain."
        center
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <p className="mono pb-2 text-center text-[12px] uppercase tracking-[0.12em] text-ink/45">
          {forkFeed.length + archiveFeed.length} voices · 2 collections
        </p>

        <div className="px-1 md:px-4">
          {/* the fork reactions */}
          <section className="pt-6">
            <SectionLabel>the fork · 2026</SectionLabel>
            <p className="mx-auto mt-4 max-w-xl text-center text-[13.5px] leading-relaxed text-ink/55">
              reactions since the announcement: press, podcasts, and the timeline.
            </p>
            <Reveal>
              <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {forkFeed.map((e) => (
                  <QuoteCard key={e.id} e={e} />
                ))}
              </div>
            </Reveal>
          </section>

          {/* the decade archive */}
          <section className="pt-12 md:pt-16">
            <SectionLabel>a decade of drivechain</SectionLabel>
            <p className="mx-auto mt-4 max-w-xl text-center text-[13.5px] leading-relaxed text-ink/55">
              the backlog: bitcoin voices endorsing BIP 300/301 long before the fork was announced.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {archiveTypes.map((t) => {
                const on = filter === t
                const count = t === "all" ? archiveFeed.length : archiveFeed.filter((e) => e.type === t).length
                return (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`mono inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[10.5px] lowercase tracking-[0.04em] transition-colors ${
                      on
                        ? "border-accent bg-accent text-ink"
                        : "border-ink/15 text-ink/50 hover:border-accent-deep/50 hover:text-ink"
                    }`}
                  >
                    {t.toLowerCase()}
                    <span className={on ? "text-ink/60" : "text-ink/30"}>{count}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {shown.map((e) => (
                <QuoteCard key={e.id} e={e} />
              ))}
            </div>
          </section>

          <div className="py-16 md:pb-24 md:pt-16">
            <NextLinks
              links={[
                { name: "media", href: "/media", note: "watch the interviews behind these" },
                { name: "socials", href: "/socials", note: "join the conversation" },
                { name: "why hardfork", href: "/why-hardfork", note: "the argument they endorse" },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
