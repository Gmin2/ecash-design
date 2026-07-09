import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { IconArrowRight, IconClose, IconYoutube } from "@/components/icons"
import { TocRail } from "@/components/TocRail"
import videos from "../data/videos.json"

type Video = {
  id: string
  title: string
  description: string
  date?: string
  author?: string
  externalUrl?: string
}

type Section = {
  key: string
  label: string
  playlistId?: string
  items: Video[]
}

const sections: Section[] = videos.sections.map((s) => ({
  key: s.key,
  label: s.label,
  playlistId: "playlistId" in s ? (s.playlistId as string) : undefined,
  items: (("featured" in s ? s.featured : (s as { curated: Video[] }).curated) ?? []) as Video[],
}))

const totalCount = sections.reduce((n, s) => n + s.items.length, 0)

function fmtDate(d?: string) {
  if (!d) return null
  const [y, m] = d.split("-")
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  return `${months[Number(m) - 1]} ${y}`
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  )
}

// palette the dither quantizes to: ink -> deep gold -> gold -> cream
const DITHER_TONES: [number, number, number][] = [
  [23, 17, 10],
  [138, 92, 31],
  [232, 168, 74],
  [250, 241, 221],
]

// 4x4 bayer matrix, normalized 0..1
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((n) => (n + 0.5) / 16))

// draws the thumbnail through an ordered dither at low res, so it prints
// like halftone in the site palette. falls back to the raw img if the
// canvas gets tainted (no cors) or the fetch fails.
function DitheredThumb({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let gone = false
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => {
      if (gone) return
      const canvas = canvasRef.current
      if (!canvas) return
      const w = 176
      const h = Math.max(1, Math.round((img.height / img.width) * w))
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      try {
        ctx.drawImage(img, 0, 0, w, h)
        const frame = ctx.getImageData(0, 0, w, h)
        const px = frame.data
        const steps = DITHER_TONES.length - 1
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4
            const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255
            const level = Math.min(steps, Math.floor(lum * steps + BAYER[y % 4][x % 4]))
            const [r, g, b] = DITHER_TONES[level]
            px[i] = r
            px[i + 1] = g
            px[i + 2] = b
          }
        }
        ctx.putImageData(frame, 0, 0)
      } catch {
        setFailed(true)
      }
    }
    img.onerror = () => !gone && setFailed(true)
    return () => {
      gone = true
    }
  }, [src])

  if (failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    )
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated] transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {/* darkens on hover so the play button pops */}
      <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
    </>
  )
}

function VideoCard({ v, onPlay }: { v: Video; onPlay: (v: Video) => void }) {
  const external = Boolean(v.externalUrl)
  const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`

  const inner = (
    <>
      <div className="relative aspect-video w-full overflow-hidden bg-ink/[0.06]">
        {external ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-fade to-accent/25 text-accent-deep">
            <IconYoutube className="h-8 w-8 opacity-0" />
          </div>
        ) : (
          <DitheredThumb src={thumb} alt={v.title} />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/55 text-white backdrop-blur-sm transition-all duration-200 group-hover:scale-110 group-hover:bg-accent group-hover:text-ink">
            <PlayGlyph className="ml-0.5 h-5 w-5" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[15.5px] font-medium leading-snug tracking-[-0.01em] text-ink">
          {v.title}
        </h3>
        {(v.author || v.date) && (
          <p className="mono mt-2 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.08em] text-ink/45">
            {v.author && <span>{v.author}</span>}
            {v.author && v.date && <span className="text-ink/25">·</span>}
            {v.date && <span>{fmtDate(v.date)}</span>}
          </p>
        )}
        <p className="mt-2.5 text-[13px] leading-[1.5] text-ink/60">{v.description}</p>
      </div>
    </>
  )

  const cls =
    "group flex h-full flex-col overflow-hidden border border-hairline bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_16px_40px_-28px_rgba(26,18,6,0.4)]"

  if (external) {
    return (
      <a href={v.externalUrl} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={() => onPlay(v)} className={`${cls} text-left`}>
      {inner}
    </button>
  )
}

function Player({ v, onClose }: { v: Video | null; onClose: () => void }) {
  useEffect(() => {
    if (!v) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [v, onClose])

  if (!v) return null
  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-md md:p-10"
    >
      <button
        onClick={onClose}
        aria-label="close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10"
      >
        <IconClose className="h-4 w-4" />
      </button>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 12, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
        className="w-full max-w-5xl"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&color=white&modestbranding=1`}
            title={v.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mono mt-4 text-center text-[12px] uppercase tracking-[0.1em] text-white/55">
          {v.author ? `${v.author} · ` : ""}
          {v.title}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function MediaPage() {
  const [active, setActive] = useState(sections[0]?.key ?? "")
  const [playing, setPlaying] = useState<Video | null>(null)

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
        label="media"
        title="a decade on camera"
        subhead="every eCash interview, a decade of drivechain talks, the x spaces, and the debates. all in one place."
        center
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <p className="mono text-center text-[12px] uppercase tracking-[0.12em] text-ink/45">
          {totalCount}+ videos · {sections.length} sections
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[190px_1fr]">
          <aside className="max-lg:hidden lg:mt-[3.25rem]">
            <TocRail
              title="sections"
              items={sections.map((s) => ({ id: s.key, label: s.label }))}
              activeId={active}
            >
              <a
                href={videos.channelUrl}
                target="_blank"
                rel="noreferrer"
                className="mono mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-accent-deep transition-colors hover:text-ink"
              >
                <IconYoutube className="h-4 w-4" />
                open channel
                <IconArrowRight className="h-3.5 w-3.5" />
              </a>
            </TocRail>
          </aside>

          {/* content column */}
          <div className="min-w-0">
            {sections.map((s) => (
              <section
                key={s.key}
                id={s.key}
                data-msec
                className="scroll-mt-28 border-t border-hairline pb-4 pt-8 first:border-t-0 first:pt-2"
              >
                <div className="-mr-6 lg:-ml-6">
                  <SectionLabel>{s.label}</SectionLabel>
                </div>
                {s.playlistId && (
                  <p className="mono mt-4 text-center text-[10.5px] uppercase tracking-[0.08em] text-ink/40">
                    live playlist · more on youtube
                  </p>
                )}
                <div className="mt-6 grid gap-4 px-1 sm:grid-cols-2 md:px-3">
                  {s.items.map((v, i) => (
                    <Reveal key={v.id} delay={i * 0.04}>
                      <VideoCard v={v} onPlay={setPlaying} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}

            <div className="py-16 md:pb-24 md:pt-10">
              <NextLinks
                links={[
                  { name: "reading", href: "/reading", note: "the essays behind the thesis" },
                  { name: "why hardfork", href: "/why-hardfork", note: "the argument, in full" },
                  { name: "socials", href: "/socials", note: "where the community gathers" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <Player v={playing} onClose={() => setPlaying(null)} />
    </PageShell>
  )
}
