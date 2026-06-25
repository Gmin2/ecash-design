import { IconGithub, IconYoutube, IconTelegram, IconX } from "./icons"
import { LogoMark } from "./Logo"

const cols = [
  {
    title: "the fork",
    links: [
      { name: "countdown", href: "#countdown" },
      { name: "run a node", href: "#run-a-node" },
      { name: "what to expect", href: "#what-to-expect" },
      { name: "the airdrop", href: "#the-airdrop" },
    ],
  },
  {
    title: "learn",
    links: [
      { name: "why hardfork", href: "#why" },
      { name: "launch faq", href: "#launch-faq" },
      { name: "drivechain faq", href: "https://drivechain.info" },
      { name: "further reading", href: "#reading" },
    ],
  },
  {
    title: "more",
    links: [
      { name: "media", href: "#media" },
      { name: "literature", href: "#literature" },
      { name: "brand", href: "#brand" },
      { name: "community", href: "#community" },
    ],
  },
]

const socials = [
  { Icon: IconTelegram, href: "#", label: "telegram" },
  { Icon: IconX, href: "#", label: "x" },
  { Icon: IconYoutube, href: "#", label: "youtube" },
  { Icon: IconGithub, href: "#", label: "github" },
]

export function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="mx-auto max-w-[1126px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7 object-contain" tone="gold" />
              <span className="font-display text-[20px] font-semibold tracking-tight text-paper">
                eCash
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-[1.5] text-paper/50">
              a hard fork of bitcoin that activates drivechains. every BTC holder
              receives eCash 1:1 on fork day.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-paper/40">
                {c.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => {
                  const external = l.href.startsWith("http")
                  return (
                    <li key={l.name}>
                      <a
                        href={l.href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="font-display text-[14px] text-paper/70 transition-colors hover:text-paper"
                      >
                        {l.name}
                        {external && <span className="ml-1 text-paper/30">↗</span>}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <span className="mono text-[11px] uppercase tracking-[0.12em] text-paper/40">
            eCash · a layertwo labs project
          </span>
          <span className="mono text-[11px] uppercase tracking-[0.12em] text-paper/40">
            fork day · 21 aug 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
