import { useState } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, PlusDecorator, SectionLabel } from "@/components/primitives"
import { IconArrowRight } from "@/components/icons"
import blogPosts from "../data/blog-posts.json"

type Post = {
  id: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  readTime: string
  tags: string[]
  attribution: { name: string; url: string }
  featured: boolean
}

const posts = blogPosts as Post[]
const featured = posts.find((p) => p.featured)
const rest = posts.filter((p) => p !== featured)
const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))]

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
function fmtDate(d: string) {
  const [y, m, day] = d.split("-")
  return `${months[Number(m) - 1]} ${Number(day)}, ${y}`
}

function PostRow({ post }: { post: Post }) {
  return (
    <a
      href={post.attribution.url}
      target="_blank"
      rel="noreferrer"
      className="group grid gap-x-8 gap-y-2 border-b border-hairline py-7 transition-colors hover:bg-accent/[0.04] md:grid-cols-[130px_minmax(0,1fr)_auto]"
    >
      <div className="mono pt-1 text-[10.5px] uppercase tracking-[0.08em] text-ink/40">
        {fmtDate(post.date)}
        <span className="mt-1.5 block text-ink/30">{post.readTime}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="mono rounded-full border border-accent-deep/40 px-2.5 py-0.5 text-[9.5px] uppercase tracking-[0.1em] text-accent-deep">
            {post.category}
          </span>
        </div>
        <h3 className="mt-2.5 font-display text-[clamp(18px,2.2vw,23px)] font-medium lowercase leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-deep">
          {post.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-[1.6] text-ink/60">{post.excerpt}</p>
        <p className="mono mt-3 text-[10px] uppercase tracking-[0.08em] text-ink/35">
          {post.author} · originally on {post.attribution.name}
        </p>
      </div>
      <span className="mono hidden items-center self-center text-ink/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent-deep md:flex">
        <IconArrowRight className="h-4 w-4" />
      </span>
    </a>
  )
}

export function BlogPage() {
  const [filter, setFilter] = useState("all")
  const shown = filter === "all" ? rest : rest.filter((p) => p.category === filter)
  const showFeatured = featured && (filter === "all" || featured.category === filter)

  return (
    <PageShell>
      <PageHero
        label="blog"
        title="the writing"
        subhead="long-form writing on eCash, drivechains, mining, and bitcoin governance. mostly from a decade of truthcoin essays."
        center
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <p className="mono pb-2 text-center text-[12px] uppercase tracking-[0.12em] text-ink/45">
          {posts.length} posts · {categories.length - 1} categories
        </p>

        {/* category filter */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => {
            const on = filter === c
            const count = c === "all" ? posts.length : posts.filter((p) => p.category === c).length
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`mono inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[10.5px] lowercase tracking-[0.04em] transition-colors ${
                  on
                    ? "border-accent bg-accent text-ink"
                    : "border-ink/15 text-ink/50 hover:border-accent-deep/50 hover:text-ink"
                }`}
              >
                {c.toLowerCase()}
                <span className={on ? "text-ink/60" : "text-ink/30"}>{count}</span>
              </button>
            )
          })}
        </div>

        <div className="px-1 md:px-4">
          {/* featured post */}
          {showFeatured && featured && (
            <Reveal>
              <a
                href={featured.attribution.url}
                target="_blank"
                rel="noreferrer"
                className="group relative mt-10 block border border-accent/50 bg-accent-fade px-6 py-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-deep/60 hover:shadow-[0_16px_44px_-30px_rgba(207,138,46,0.7)] md:px-9 md:py-9"
              >
                <PlusDecorator className="left-1/2 top-[3px] -translate-x-1/2" />
                <PlusDecorator className="bottom-[3px] left-1/2 -translate-x-1/2" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono rounded-full bg-accent px-2.5 py-1 text-[9.5px] uppercase tracking-[0.1em] text-ink">
                    featured
                  </span>
                  <span className="mono rounded-full border border-accent-deep/40 px-2.5 py-0.5 text-[9.5px] uppercase tracking-[0.1em] text-accent-deep">
                    {featured.category}
                  </span>
                  <span className="mono text-[10.5px] uppercase tracking-[0.08em] text-ink/45">
                    {fmtDate(featured.date)} · {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(22px,3vw,32px)] font-medium lowercase leading-[1.15] tracking-[-0.015em] text-ink">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.65] text-ink/70">{featured.excerpt}</p>
                <span className="mono mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-accent-deep transition-colors group-hover:text-ink">
                  read on {featured.attribution.name}
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          )}

          {/* the index */}
          <div className="pt-10">
            <SectionLabel>all posts</SectionLabel>
            <Reveal>
              <div className="mt-4 border-t border-hairline">
                {shown.map((p) => (
                  <PostRow key={p.id} post={p} />
                ))}
                {shown.length === 0 && !showFeatured && (
                  <p className="mono py-10 text-center text-[12px] uppercase tracking-[0.1em] text-ink/40">
                    nothing in this category yet
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          <div className="py-16 md:pb-24 md:pt-12">
            <NextLinks
              links={[
                { name: "reading", href: "/reading", note: "the full source library" },
                { name: "why hardfork", href: "/why-hardfork", note: "the manifesto itself" },
                { name: "media", href: "/media", note: "prefer to watch instead" },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
