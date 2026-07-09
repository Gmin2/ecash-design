import { useState } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { LogoMark } from "@/components/Logo"
import { IconClipboard, IconCheck, IconDownload } from "@/components/icons"

const logoVariants = [
  { n: "01", name: "amber · transparent", note: "primary · default", tone: "gold" as const, bg: "bg-[#17110a]" },
  { n: "02", name: "white · transparent", note: "dark contexts", tone: "white" as const, bg: "bg-[#17110a]" },
  { n: "03", name: "black · transparent", note: "light contexts", tone: "ink" as const, bg: "bg-accent-fade" },
  { n: "04", name: "amber on white", note: "print · solid-bg", tone: "gold" as const, bg: "bg-white border border-hairline" },
]

const logoRules = [
  "always a single flat color. never gradient, never outlined.",
  "clear space: minimum 1/4 of the mark's height on all sides.",
  "below 24px digital / 10mm print, use a favicon variant instead.",
  "never rotate, skew, recolor outside the four variants, or add drop shadows.",
]

const neutrals = [
  { name: "near black", token: "--bg-0", hex: "#0a0a0b", use: "page background" },
  { name: "carbon", token: "--bg-1", hex: "#131316", use: "card & surface background" },
  { name: "border deep", token: "--border-0", hex: "#1f1f23", use: "section dividers" },
  { name: "border", token: "--border-2", hex: "#2a2a30", use: "inputs, hairlines" },
  { name: "zinc 600", token: "--text-3", hex: "#52525b", use: "muted labels, § prefixes" },
  { name: "zinc 500", token: "--text-2", hex: "#71717a", use: "captions, nav items" },
  { name: "zinc 400", token: "--text-1", hex: "#a1a1aa", use: "body text on dark" },
  { name: "zinc 200", token: "--text-05", hex: "#e4e4e7", use: "default body on dark" },
  { name: "white", token: "--text-0", hex: "#ffffff", use: "headings on dark" },
]

const accents = [
  { name: "cyan", hex: "#5AC8D6", use: "live · streaming" },
  { name: "lime", hex: "#A8D65A", use: "success · shipped" },
  { name: "pink", hex: "#E86A8A", use: "warning · off-spec" },
]

const weights = [
  { w: "300 light", role: "rarely used, only very large display numerals" },
  { w: "400 regular", role: "body · default · navigation" },
  { w: "500 medium", role: "labels · nav · emphasis · card titles" },
  { w: "600 semibold", role: "headings · active states · key data" },
]

const habits = [
  {
    title: "mostly lowercase",
    body: "body, headings, navigation, links: all lowercase. exception: acronyms (BTC, BIP) and proper names.",
  },
  {
    title: "loose-tracked uppercase for labels only",
    body: "+100–200 letter-spacing, only in metadata labels, section markers, and nav tabs. never body.",
  },
  {
    title: "the § prefix",
    body: "section markers begin with § + space + lowercase label. the visual signature of the brand: § how it works · § sidechains · § further reading",
  },
]

const oneLiners = [
  "Bitcoin hard fork. August 21, 2026. Every BTC holder receives eCash 1:1. ecash.com",
  "Bitcoin can still improve. Drivechains are ready. eCash ships them.",
  "Before: 1 BTC. After fork: 1 BTC + 1 eCash. Your BTC stays yours.",
  "Sidechains for payments, privacy, assets, identity, prediction markets. August 21, 2026. ecash.com",
  "eCash isn't a token. It's a Bitcoin hard fork. Block ~964,000. ecash.com",
]

const postCopy = [
  "Bitcoin's monetary policy is sacred. Bitcoin's technical conservatism isn't. Drivechains let Bitcoin do more without changing what makes Bitcoin Bitcoin. August 21, 2026.",
  "Every BTC address gets eCash 1:1 at block ~964,000. No claim, no airdrop form, no whitelist. Run a node, you have it.",
  "What Lightning was supposed to do — and didn't. What Liquid was supposed to do — and didn't. Drivechains, on Bitcoin, no federation. August 21, 2026.",
  "Miners get new fee markets. Holders get new coins to spend. Developers get new platforms to build. All from one fork. Block ~964,000.",
]

const hashtags = "#eCash #Drivechains #BIP300 #BIP301 Aug 21 2026 block 964000"

function CopyChip({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <button
      onClick={copy}
      className="mono inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.06em] text-ink/45 transition-colors hover:text-accent-deep"
    >
      {label ?? value}
      {copied ? <IconCheck className="h-3 w-3 text-accent-deep" /> : <IconClipboard className="h-3 w-3" />}
    </button>
  )
}

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <button
      onClick={copy}
      className="group flex w-full items-start gap-4 border-b border-hairline py-4 text-left transition-colors hover:bg-accent/[0.05]"
    >
      <span className="flex-1 text-[14px] leading-[1.6] text-ink/75">{text}</span>
      <span className="mt-0.5 shrink-0 text-ink/30 transition-colors group-hover:text-accent-deep">
        {copied ? <IconCheck className="h-4 w-4 text-accent-deep" /> : <IconClipboard className="h-4 w-4" />}
      </span>
    </button>
  )
}

export function BrandPage() {
  return (
    <PageShell>
      <PageHero
        label="brand"
        title="the brand kit"
        subhead="the official eCash logo, color, and type, plus copy-paste launch lines. everything you need to represent the project consistently."
        center
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />

        <div className="px-2 sm:px-8 lg:px-14">
          {/* logo */}
          <div className="pt-4">
            <SectionLabel>the mark</SectionLabel>
            <p className="mx-auto mt-4 max-w-xl text-center text-[13.5px] leading-relaxed text-ink/55">
              one mark: a lowercase e built from a circular arc, the bitcoin ₿ opened and reformed.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {logoVariants.map((v, i) => (
                <Reveal key={v.n} delay={i * 0.05}>
                  <figure className="border border-hairline bg-white">
                    <div className={`flex aspect-square items-center justify-center ${v.bg}`}>
                      <LogoMark tone={v.tone} className="h-20 w-20 object-contain" />
                    </div>
                    <figcaption className="flex items-baseline gap-2.5 border-t border-hairline p-4">
                      <span className="mono text-[10.5px] tabular-nums text-ink/35">{v.n}</span>
                      <span className="min-w-0">
                        <span className="block font-display text-[13.5px] font-medium lowercase text-ink">{v.name}</span>
                        <span className="mono text-[9.5px] uppercase tracking-[0.08em] text-ink/40">{v.note}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <ul className="max-w-xl space-y-1.5">
                  {logoRules.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[13px] leading-relaxed text-ink/60">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-accent-deep" />
                      {r}
                    </li>
                  ))}
                </ul>
                <a
                  href="/logos/ecash-e-gold.png"
                  download="ecash-mark-amber.png"
                  className="mono inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.06em] text-accent transition-colors hover:bg-ink-pure"
                >
                  <IconDownload className="h-4 w-4" />
                  download the mark
                </a>
              </div>
            </Reveal>
          </div>

          {/* color */}
          <div className="pt-12 md:pt-14">
            <SectionLabel>color</SectionLabel>
            <Reveal>
              <div className="mt-6 flex items-center gap-5 border border-accent/50 bg-accent-fade p-5">
                <span className="h-16 w-16 shrink-0 rounded-[12px] bg-accent ring-1 ring-ink/15" />
                <div className="min-w-0">
                  <p className="font-display text-[16px] font-medium lowercase text-ink">ecash gold · primary</p>
                  <p className="mt-1 text-[13px] text-ink/60">logo, highlights, CTAs.</p>
                  <CopyChip value="#E8A84A" />
                </div>
                <p className="mono ml-auto hidden max-w-[220px] text-right text-[10px] uppercase leading-relaxed tracking-[0.06em] text-ink/45 md:block">
                  70% ink · 25% neutral · 5% amber. past ~10% amber loses its signal value.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-4 overflow-hidden border border-hairline">
                <div className="grid grid-cols-3 sm:grid-cols-9">
                  {neutrals.map((c) => (
                    <div key={c.token} className="h-14" style={{ background: c.hex }} />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1 p-4 sm:grid-cols-3">
                  {neutrals.map((c) => (
                    <div key={c.token} className="flex items-baseline justify-between gap-3 py-1">
                      <span className="text-[12.5px] lowercase text-ink/70">{c.name}</span>
                      <span className="mono text-[10px] text-ink/40">{c.token}</span>
                      <CopyChip value={c.hex} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {accents.map((a, i) => (
                <Reveal key={a.name} delay={i * 0.05}>
                  <div className="flex items-center gap-4 border border-hairline bg-white p-4">
                    <span className="h-10 w-10 shrink-0 rounded-full" style={{ background: a.hex }} />
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-medium lowercase text-ink">{a.name}</p>
                      <p className="mono text-[9.5px] uppercase tracking-[0.08em] text-ink/40">{a.use}</p>
                    </div>
                    <span className="ml-auto">
                      <CopyChip value={a.hex} />
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-3 text-center text-[12px] text-ink/45">
                secondary accents: use one at a time, never three together.
              </p>
            </Reveal>
          </div>

          {/* typography */}
          <div className="pt-12 md:pt-14">
            <SectionLabel>typography</SectionLabel>
            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <Reveal>
                <div className="h-full border border-hairline bg-white p-6">
                  <p className="mono text-[34px] leading-none text-ink">Aa</p>
                  <p className="mt-4 font-display text-[16px] font-medium lowercase text-ink">jetbrains mono</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/60">
                    the only typeface on the site. 4 weights, no companions. variable 100–800, SIL
                    open font 1.1, via fonts.google.com.
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-hairline pt-4">
                    {weights.map((w) => (
                      <div key={w.w} className="flex items-baseline justify-between gap-4">
                        <span className="mono text-[11.5px] text-ink/70">{w.w}</span>
                        <span className="text-right text-[11.5px] text-ink/45">{w.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <div className="grid gap-4">
                {habits.map((h, i) => (
                  <Reveal key={h.title} delay={i * 0.06}>
                    <div className="border border-hairline bg-white p-5">
                      <div className="flex items-baseline gap-2.5">
                        <span className="mono text-[11px] tabular-nums text-accent-deep">0{i + 1}</span>
                        <h3 className="font-display text-[15px] font-medium lowercase text-ink">{h.title}</h3>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-[1.6] text-ink/60">{h.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* launch kit */}
          <div className="pt-12 md:pt-14">
            <SectionLabel>launch kit</SectionLabel>
            <p className="mx-auto mt-4 max-w-xl text-center text-[13.5px] leading-relaxed text-ink/55">
              copy-paste marketing lines. click any line to copy it.
            </p>

            <Reveal>
              <div className="mt-8">
                <p className="mono text-[10.5px] uppercase tracking-[0.12em] text-ink/40">one-liners</p>
                <div className="mt-2 border-t border-hairline">
                  {oneLiners.map((t) => (
                    <CopyLine key={t} text={t} />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8">
                <p className="mono text-[10.5px] uppercase tracking-[0.12em] text-ink/40">ready-made posts</p>
                <div className="mt-2 border-t border-hairline">
                  {postCopy.map((t) => (
                    <CopyLine key={t} text={t} />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <p className="mono mr-2 text-[10.5px] uppercase tracking-[0.12em] text-ink/40">hashtags</p>
                {hashtags.split(" ").length > 0 && (
                  <span className="mono rounded-full border border-ink/15 px-3 py-1.5 text-[11px] text-ink/60">
                    {hashtags}
                  </span>
                )}
                <CopyChip value={hashtags} label="copy all" />
              </div>
            </Reveal>
          </div>

          <div className="py-16 md:pb-24 md:pt-16">
            <NextLinks
              links={[
                { name: "socials", href: "/socials", note: "where to post it" },
                { name: "media", href: "/media", note: "the video library" },
                { name: "endorsements", href: "/endorsements", note: "what people are saying" },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
