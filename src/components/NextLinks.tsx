import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"
import { IconArrowRight } from "./icons"

export type NextLink = { name: string; href: string; note: string; external?: boolean }

// end-of-page trio: numbered cells with an arrow chip and an accent underline
// that grows in from the left on hover
export function NextLinks({ links }: { links: NextLink[] }) {
  return (
    <Reveal>
      <div className="grid overflow-hidden border border-hairline max-md:divide-y md:grid-cols-3 md:divide-x md:divide-hairline max-md:divide-hairline">
        {links.map((l, i) => {
          const inner = (
            <>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <span className="mono text-[11px] tabular-nums text-ink/35 transition-colors group-hover:text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 flex items-center justify-between gap-4">
                <span className="font-display text-[clamp(19px,2.2vw,24px)] font-medium lowercase tracking-[-0.01em] text-ink">
                  {l.name}
                  {l.external && <span className="ml-1.5 text-[0.7em] text-ink/35">↗</span>}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/50 transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </span>
              <span className="mt-2 block text-[13.5px] leading-snug text-ink/55">{l.note}</span>
            </>
          )
          const cls =
            "group relative flex flex-col p-6 transition-colors hover:bg-accent/[0.05] md:p-8"
          return l.external ? (
            <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={l.name} to={l.href} className={cls}>
              {inner}
            </Link>
          )
        })}
      </div>
    </Reveal>
  )
}
