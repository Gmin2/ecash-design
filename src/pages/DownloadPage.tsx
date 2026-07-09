import { useEffect, useState } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, SectionLabel } from "@/components/primitives"
import { IconApple, IconAndroid, IconArrowRight, IconClose, IconClipboard, IconCheck } from "@/components/icons"

const wallet = [
  {
    platform: "iOS",
    note: "join the testflight beta",
    url: "https://testflight.apple.com/join/KfTBarUr",
    Icon: IconApple,
  },
  {
    platform: "Android",
    note: "download the apk",
    url: "https://github.com/LayerTwo-Labs/ecash-wallet-mobile/releases",
    Icon: IconAndroid,
  },
]

const desktop = [
  {
    platform: "macOS",
    ext: "apple silicon + intel",
    file: "BitWindow.dmg",
    url: "https://releases.drivechain.info/BitWindow-latest-x86_64-apple-darwin.dmg",
    Icon: IconApple,
  },
  {
    platform: "Windows",
    ext: "64-bit installer",
    file: "BitWindow.exe",
    url: "https://releases.drivechain.info/BitWindow-latest-x86_64-windows.exe",
    Icon: IconWindows,
  },
  {
    platform: "Linux",
    ext: "all builds + releases",
    file: "releases.drivechain.info",
    url: "https://releases.drivechain.info",
    Icon: IconLinux,
  },
]

const linuxCmd =
  "curl -sSL https://raw.githubusercontent.com/LayerTwo-Labs/drivechain-frontends/refs/heads/master/install/install-bitwindow.sh | bash"

const shots = [
  {
    n: "01",
    src: "/screenshots/bw-overview.png",
    title: "overview",
    caption: "live bitcoin price, wallet activity, block explorer and coin news on one screen.",
  },
  {
    n: "02",
    src: "/screenshots/bw-sidechains.png",
    title: "sidechains",
    caption: "deposit to thunder, bitnames, bitassets and zSide from the same interface.",
  },
  {
    n: "03",
    src: "/screenshots/bw-wallet.png",
    title: "wallet creation",
    caption: "BIP39 with custom entropy. paranoid mode shows word indices as you type.",
  },
  {
    n: "04",
    src: "/screenshots/bw-settings.png",
    title: "auto-updates",
    caption: "bitwindow checks for updates on launch and installs in one click.",
  },
]

// simple platform glyphs not present in nucleo, drawn to match the apple/android weight
function IconWindows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2,4.9l11.6-1.6v11.2H2V4.9ZM2,27.1l11.6,1.6v-11.1H2v9.5ZM15,28.9l15,2.1v-13.4h-15v11.3ZM15,3.1v11.4h15V1l-15,2.1Z" />
    </svg>
  )
}

function IconLinux({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16,1.5c-3,0-5,2.5-4.9,6.1,0,1.4.2,2.5.1,3.9-.1,1.5-1.2,2.7-2.2,4.2-1.1,1.6-2.5,3.4-2.9,5.6-.2,1,.1,1.6.6,1.9-.3,1.1.2,2.3,1.3,2.6.2,1.2,1.2,2,2.7,1.8.9-.1,1.7-.6,2.6-.9,1-.3,2-.3,3-.3s2,0,3,.3c.9.3,1.7.8,2.6.9,1.5.2,2.5-.6,2.7-1.8,1.1-.3,1.6-1.5,1.3-2.6.5-.3.8-.9.6-1.9-.4-2.2-1.8-4-2.9-5.6-1-1.5-2.1-2.7-2.2-4.2-.1-1.4.1-2.5.1-3.9C21,4,19,1.5,16,1.5ZM13.6,7.4c.5,0,.9.6.9,1.3s-.4,1.3-.9,1.3-.9-.6-.9-1.3.4-1.3.9-1.3ZM18.4,7.4c.5,0,.9.6.9,1.3s-.4,1.3-.9,1.3-.9-.6-.9-1.3.4-1.3.9-1.3ZM16,10.6c1.1,0,2.5.7,2.5,1.3,0,.4-.7.8-1.4,1.1-.4.2-.8.5-1.1.5s-.7-.3-1.1-.5c-.7-.3-1.4-.7-1.4-1.1,0-.6,1.4-1.3,2.5-1.3Z" />
    </svg>
  )
}

function CopyCmd() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(linuxCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border border-ink/15 bg-accent-fade">
      <code className="mono flex-1 overflow-x-auto whitespace-nowrap px-4 py-3 text-[12.5px] leading-relaxed text-ink/75">
        <span className="select-none text-accent-deep">$ </span>
        {linuxCmd}
      </code>
      <button
        onClick={copy}
        aria-label={copied ? "copied" : "copy command"}
        className="flex shrink-0 items-center justify-center border-l border-ink/10 px-4 text-ink/50 transition-colors hover:bg-accent/15 hover:text-accent-deep"
      >
        {copied ? <IconCheck className="h-4 w-4 text-accent-deep" /> : <IconClipboard className="h-4 w-4" />}
      </button>
    </div>
  )
}

function Lightbox({ shot, onClose }: { shot: (typeof shots)[number] | null; onClose: () => void }) {
  useEffect(() => {
    if (!shot) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [shot, onClose])

  if (!shot) return null
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10"
      >
        <IconClose className="h-4 w-4" />
      </button>
      <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
        <img
          src={shot.src}
          alt={shot.title}
          className="max-h-[78vh] w-auto rounded-lg border border-white/10 shadow-2xl"
        />
        <figcaption className="mono mt-4 text-center text-[12px] uppercase tracking-[0.12em] text-white/55">
          {shot.n} — {shot.title}
        </figcaption>
      </figure>
    </div>
  )
}

export function DownloadPage() {
  const [open, setOpen] = useState<(typeof shots)[number] | null>(null)

  return (
    <PageShell>
      <PageHero
        label="download"
        title="run a node, get eCash"
        subhead="the eCash mobile wallet, and BitWindow: the desktop node with native drivechain support. sync a node before fork day."
        pad="px-2 sm:px-8 lg:px-14"
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />

        <div className="px-2 sm:px-8 lg:px-14">
        {/* mobile wallet */}
        <div className="pt-6">
          <SectionLabel>eCash wallet · mobile</SectionLabel>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink/65">
            a native mobile wallet for eCash. send, receive, and manage your balance from your
            phone.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {wallet.map((w, i) => (
              <Reveal key={w.platform} delay={i * 0.06}>
                <a
                  href={w.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 border border-accent/40 bg-accent-fade p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-deep/60 hover:shadow-[0_16px_40px_-28px_rgba(207,138,46,0.6)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-accent/25 text-accent-deep transition-colors group-hover:bg-accent group-hover:text-ink">
                    <w.Icon className="h-[22px] w-[22px]" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[17px] font-medium text-ink">{w.platform}</span>
                    <span className="mono text-[11px] uppercase tracking-[0.08em] text-ink/50">{w.note}</span>
                  </span>
                  <span className="mono ml-auto rounded-full bg-accent/25 px-2 py-1 text-[9.5px] uppercase tracking-[0.08em] text-ink/60">
                    available now
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* bitwindow desktop */}
        <div className="pt-12 md:pt-14">
          <SectionLabel>bitwindow · desktop</SectionLabel>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink/65">
            an alternative Bitcoin Core frontend with native drivechain support: wallet,
            sidechains, and blind merge mining in one app.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {desktop.map((d, i) => (
              <Reveal key={d.platform} delay={i * 0.06}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 border border-ink/15 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-[0_16px_40px_-28px_rgba(26,18,6,0.35)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-ink/[0.06] text-ink transition-colors group-hover:bg-accent group-hover:text-ink">
                      <d.Icon className="h-[22px] w-[22px]" />
                    </span>
                    <span className="mono text-ink/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent-deep">
                      <IconArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div>
                    <span className="block font-display text-[17px] font-medium text-ink">{d.platform}</span>
                    <span className="mono text-[11px] uppercase tracking-[0.08em] text-ink/45">{d.ext}</span>
                    <span className="mono mt-2 block text-[11px] text-ink/35">{d.file}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-4">
              <p className="mono mb-2 text-[10.5px] uppercase tracking-[0.1em] text-ink/40">
                linux · paste into a terminal
              </p>
              <CopyCmd />
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-4 border-l-2 border-accent bg-accent/10 px-5 py-3.5 text-[13.5px] leading-[1.55] text-ink/70">
              heads up: current builds run on <span className="font-medium text-ink">signet only</span> until
              fork day. this is a testnet preview, not mainnet eCash.
            </p>
          </Reveal>
        </div>

        {/* gallery */}
        <div className="pt-12 md:pt-14">
          <SectionLabel>what you'll see</SectionLabel>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {shots.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <figure className="group overflow-hidden border border-hairline bg-white transition-all duration-200 hover:border-accent/50 hover:shadow-[0_20px_50px_-30px_rgba(26,18,6,0.4)]">
                  <button
                    onClick={() => setOpen(s)}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-accent-fade"
                  >
                    <img
                      src={s.src}
                      alt={s.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="mono absolute bottom-2 right-2 rounded-md bg-ink/70 px-2 py-1 text-[9.5px] uppercase tracking-[0.1em] text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      expand
                    </span>
                  </button>
                  <figcaption className="p-5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="mono text-[11px] tabular-nums text-ink/35">{s.n}</span>
                      <h3 className="font-display text-[17px] font-medium lowercase text-ink">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-ink/60">{s.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="pb-16 pt-12 md:pb-24 md:pt-16">
          <NextLinks
            links={[
              { name: "what to expect", href: "/what-to-expect", note: "why you run a node before the fork" },
              { name: "sidechains", href: "/sidechains", note: "what bitwindow connects to" },
              { name: "faq", href: "/faq", note: "common questions, answered" },
            ]}
          />
        </div>
        </div>
      </div>

      <Lightbox shot={open} onClose={() => setOpen(null)} />
    </PageShell>
  )
}
