import type { ReactNode } from "react"
import { motion } from "motion/react"
import { IconMenu } from "./icons"

const ITEM_H = 34

// the rail: a vertical line that detours left around the active item,
// with a diamond riding the detoured segment (skiper "on this page" style)
function RailPath({ activeIndex, count }: { activeIndex: number; count: number }) {
  const total = count * ITEM_H
  const x = 10 // resting line
  const bx = 1 // bumped-out line
  const a = activeIndex * ITEM_H
  const b = a + ITEM_H
  const d = `M${x} 0 L${x} ${a} L${bx} ${a + 9} L${bx} ${b - 9} L${x} ${b} L${x} ${total}`
  const spring = { type: "spring", stiffness: 380, damping: 34 } as const

  return (
    <svg
      width="16"
      height={total}
      viewBox={`0 0 16 ${total}`}
      className="absolute left-0 top-0 overflow-visible"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        animate={{ d }}
        transition={spring}
        fill="none"
        strokeWidth="1"
        className="stroke-ink/20"
      />
      <motion.g animate={{ x: bx, y: a + ITEM_H / 2 }} transition={spring}>
        <rect x="-3.5" y="-3.5" width="7" height="7" transform="rotate(45)" className="fill-accent" />
      </motion.g>
    </svg>
  )
}

export type TocItem = { id: string; label: string; num?: string }

// sticky sidebar toc shared by the long pages (media, why hardfork)
export function TocRail({
  title,
  items,
  activeId,
  children,
}: {
  title: string
  items: TocItem[]
  activeId: string
  children?: ReactNode
}) {
  const activeIndex = Math.max(0, items.findIndex((it) => it.id === activeId))

  return (
    <nav className="sticky top-24">
      <div className="mb-4 flex items-center gap-2 text-ink/40">
        <IconMenu className="h-3.5 w-3.5" />
        <span className="mono text-[11px] uppercase tracking-[0.16em]">{title}</span>
      </div>

      <div className="relative">
        <RailPath activeIndex={activeIndex} count={items.length} />
        <ul className="flex flex-col">
          {items.map((it) => {
            const on = activeId === it.id
            return (
              <li key={it.id} style={{ height: ITEM_H }}>
                <a
                  href={`#${it.id}`}
                  className={`flex h-full items-center gap-2.5 pl-7 text-[13.5px] lowercase transition-colors ${
                    on ? "font-medium text-ink" : "text-ink/45 hover:text-ink/75"
                  }`}
                >
                  {it.num && (
                    <span className={`mono text-[10.5px] tabular-nums ${on ? "text-accent-deep" : "text-ink/30"}`}>
                      {it.num}
                    </span>
                  )}
                  <span className="truncate">{it.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {children}
    </nav>
  )
}
