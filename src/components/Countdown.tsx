import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useDialKit } from "dialkit"
import { HexStream } from "./HexStream"
import { PlusDecorator } from "./primitives"

// the bitcoin hard fork that activates eCash — block ~964,000
export const FORK_DATE = new Date("2026-08-21T12:00:00Z")

type Parts = { days: number; hours: number; mins: number; secs: number }

function diff(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now())
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  }
}

// one digit slot, rolls vertically when its value changes (motion-craft #14)
function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden tabular-nums">
      {/* invisible spacer keeps the slot width stable */}
      <span className="invisible">0</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, "0").split("")
  return (
    <div className="flex flex-col items-start">
      <div className="flex font-display text-[clamp(40px,7vw,92px)] font-medium leading-none tracking-tight text-ink">
        {digits.map((d, i) => (
          <Digit key={i} value={d} />
        ))}
      </div>
      <span className="mono mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/70">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const [parts, setParts] = useState<Parts>(() => diff(FORK_DATE))

  useEffect(() => {
    const id = setInterval(() => setParts(diff(FORK_DATE)), 1000)
    return () => clearInterval(id)
  }, [])

  // live-tunable pattern controls (interface-craft DialKit)
  const d = useDialKit("Countdown Box", {
    pattern: {
      type: "select",
      options: ["none", "hatch", "hatch+grid", "grid", "dots"],
      default: "none",
    },
    hatchOpacity: [0.4, 0, 0.6],
    gridOpacity: [0.18, 0, 0.4],
    hexOpacity: [0, 0, 0.5],
    scanSeconds: [4, 1, 12],
    showScan: false,
    plusFrame: true,
    cornerBrackets: false,
  }) as {
    pattern: string
    hatchOpacity: number
    gridOpacity: number
    hexOpacity: number
    scanSeconds: number
    showScan: boolean
    plusFrame: boolean
    cornerBrackets: boolean
  }

  const showHatch = d.pattern === "hatch" || d.pattern === "hatch+grid"
  const showGrid = d.pattern === "grid" || d.pattern === "hatch+grid"
  const showDots = d.pattern === "dots"

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 400, damping: 35 }}>
      <div className="relative w-full overflow-hidden border border-ink/35 bg-accent px-6 py-6 sm:px-9 sm:py-8">
        {/* layered technical texture (tunable) */}
        {showGrid && (
          <span
            className="tex-grid pointer-events-none absolute inset-0"
            style={{ opacity: d.gridOpacity }}
          />
        )}
        {showHatch && (
          <span
            className="tex-hatch mask-edges pointer-events-none absolute inset-0"
            style={{ opacity: d.hatchOpacity }}
          />
        )}
        {showDots && (
          <span
            className="tex-dots mask-edges pointer-events-none absolute inset-0"
            style={{ opacity: d.hatchOpacity }}
          />
        )}
        <HexStream
          className="text-[clamp(9px,1vw,13px)]"
          style={{ color: `color-mix(in srgb, var(--color-ink) ${d.hexOpacity * 100}%, transparent)` }}
        />
        {d.showScan && (
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-ink/[0.06] to-transparent"
            style={{ animation: `scanY ${d.scanSeconds}s linear infinite` }}
          />
        )}

        {/* plus-decorator frame around the card (secondary-hero/20 style) */}
        {d.plusFrame && (
          <>
            <PlusDecorator className="left-1/2 top-[3px] -translate-x-1/2" />
            <PlusDecorator className="bottom-[3px] left-1/2 -translate-x-1/2" />
            <PlusDecorator className="left-[3px] top-1/2 -translate-y-1/2" />
            <PlusDecorator className="right-[3px] top-1/2 -translate-y-1/2" />
          </>
        )}
        {d.cornerBrackets && (
          <>
            <Corner className="left-[-1px] top-[-1px] border-l-2 border-t-2" />
            <Corner className="right-[-1px] top-[-1px] border-r-2 border-t-2" />
            <Corner className="bottom-[-1px] left-[-1px] border-b-2 border-l-2" />
            <Corner className="bottom-[-1px] right-[-1px] border-b-2 border-r-2" />
          </>
        )}

        {/* readout header */}
        <div className="relative mono flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink/70">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            bitcoin hard fork
          </span>
          <span className="hidden sm:inline">21 aug 2026 · block ~964,000</span>
        </div>

        <div className="relative mt-5 flex flex-wrap items-start gap-x-8 gap-y-6 sm:gap-x-12">
          <Unit value={parts.days} label="days" />
          <Sep />
          <Unit value={parts.hours} label="hours" />
          <Sep />
          <Unit value={parts.mins} label="minutes" />
          <Sep />
          <Unit value={parts.secs} label="seconds" />
        </div>

        {/* the core promise */}
        <div className="relative mt-7 border-t border-ink/15 pt-4">
          <p className="mono text-[12px] uppercase tracking-[0.1em] text-ink/75">
            1 BTC → 1 BTC + 1 eCash
            <span className="text-ink/45"> · your BTC stays yours</span>
          </p>
        </div>
      </div>
    </MotionConfig>
  )
}

// compact inline version for the navbar
export function MiniCountdown() {
  const [parts, setParts] = useState<Parts>(() => diff(FORK_DATE))
  useEffect(() => {
    const id = setInterval(() => setParts(diff(FORK_DATE)), 1000)
    return () => clearInterval(id)
  }, [])
  const cells = [
    { v: parts.days, u: "d" },
    { v: parts.hours, u: "h" },
    { v: parts.mins, u: "m" },
    { v: parts.secs, u: "s" },
  ]
  return (
    <MotionConfig transition={{ type: "spring", stiffness: 400, damping: 35 }}>
      <span className="mono flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-ink">
        <span className="text-ink/55">fork in</span>
        <span className="flex items-center gap-0.5 font-medium">
          {cells.map((c, i) => (
            <span key={i} className="flex">
              {String(c.v).padStart(2, "0")
                .split("")
                .map((d, j) => (
                  <Digit key={`${i}-${j}`} value={d} />
                ))}
              <span className="text-ink/45">{c.u}</span>
            </span>
          ))}
        </span>
      </span>
    </MotionConfig>
  )
}

function Sep() {
  return (
    <span className="font-display text-[clamp(40px,7vw,92px)] font-medium leading-none text-ink/30">
      :
    </span>
  )
}

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-4 w-4 border-ink ${className}`}
      aria-hidden="true"
    />
  )
}
