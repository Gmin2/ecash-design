import { useEffect, useState } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { IconArrowRight } from "@/components/icons"
import { TocRail } from "@/components/TocRail"
import readingList from "../data/reading-list.json"

type Item = { name: string; url: string; description: string }
type Group = { group: string; items: Item[] }

const groups = readingList as Group[]
const totalLinks = groups.reduce((n, g) => n + g.items.length, 0)

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function LinkRow({ item, index }: { item: Item; index: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group grid grid-cols-[28px_1fr] items-baseline gap-x-3 gap-y-1 border-b border-hairline py-4 transition-colors hover:bg-accent/[0.05] sm:grid-cols-[36px_minmax(0,15rem)_1fr_auto] sm:gap-x-5"
    >
      <span className="mono text-[11px] tabular-nums text-ink/30 transition-colors group-hover:text-accent-deep">
        {String(index).padStart(2, "0")}
      </span>
      <span className="font-display text-[15.5px] font-medium lowercase leading-snug text-ink">
        {item.name}
      </span>
      <span className="col-start-2 text-[13.5px] leading-snug text-ink/55 sm:col-start-3">
        {item.description.toLowerCase()}
      </span>
      <span className="mono col-start-2 flex items-center gap-2 text-[10.5px] text-ink/40 transition-colors group-hover:text-accent-deep sm:col-start-4">
        {domain(item.url)}
        <IconArrowRight className="h-3 w-3 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  )
}

export function ReadingPage() {
  const [active, setActive] = useState(slug(groups[0]?.group ?? ""))

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-15% 0px -75% 0px" },
    )
    document.querySelectorAll("[data-msec]").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <PageShell>
      <PageHero
        label="further reading"
        title="the source material"
        subhead="nearly 10 years of research, code, and debate. the curated library behind the fork."
        center
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <p className="mono pb-2 text-center text-[12px] uppercase tracking-[0.12em] text-ink/45">
          {totalLinks} links · {groups.length} collections · all primary sources
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[200px_1fr]">
          <aside className="max-lg:hidden lg:mt-[3.25rem]">
            <TocRail
              title="collections"
              items={groups.map((g) => ({ id: slug(g.group), label: g.group }))}
              activeId={active}
            />
          </aside>

          <div className="min-w-0">
            {groups.map((g) => (
              <section
                key={g.group}
                id={slug(g.group)}
                data-msec
                className="scroll-mt-28 pb-10 first:pt-2"
              >
                <div className="-mr-6 lg:-ml-6">
                  <SectionLabel>{g.group}</SectionLabel>
                </div>
                <Reveal>
                  <div className="mt-4 border-t border-hairline px-1 md:px-3">
                    {g.items.map((item, i) => (
                      <LinkRow key={item.url + item.name} item={item} index={i + 1} />
                    ))}
                  </div>
                </Reveal>
              </section>
            ))}

            <div className="py-16 md:pb-24 md:pt-6">
              <NextLinks
                links={[
                  { name: "media", href: "/media", note: "the same decade, on camera" },
                  { name: "why hardfork", href: "/why-hardfork", note: "the argument, in full" },
                  { name: "socials", href: "/socials", note: "where the community gathers" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
