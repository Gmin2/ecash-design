import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { animate } from "animejs"
import { ChainIllustration } from "./ChainIllustration"

type Pillar = { key: string; title: string; description: string; color: string }

const pillars: Pillar[] = [
  {
    key: "drivechains",
    title: "drivechains",
    description:
      "BIP 300/301 add sidechains to bitcoin without changing the L1. it stays identical to Bitcoin Core.",
    color: "#e8a84a",
  },
  {
    key: "airdrop",
    title: "1:1 to holders",
    description:
      "every BTC address receives eCash 1:1 at block ~964,000. no claim, no form. run a node and you have it.",
    color: "#e57a3c",
  },
  {
    key: "merged",
    title: "merged-mined",
    description:
      "secured by bitcoin miners through merged mining. no new hashrate has to be bootstrapped.",
    color: "#f1c552",
  },
  {
    key: "sidechains",
    title: "what BTC cant do",
    description:
      "a DEX, privacy, identity, high-throughput payments. all on sidechains, none of it forced onto BTC.",
    color: "#c98a3e",
  },
]

const AUTOPLAY = 4500

function AutoProgress({ duration, color }: { duration: number; color: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const a = animate(ref.current, { scaleX: [0, 1], duration, ease: "linear" })
    return () => {
      a.pause()
    }
  }, [duration])
  return (
    <span
      ref={ref}
      className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
      style={{ background: color, transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  )
}

export function SolutionStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const restart = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setIndex((i) => (i + 1) % pillars.length), AUTOPLAY)
  }

  useEffect(() => {
    if (inView) restart()
    else if (timer.current) clearInterval(timer.current)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [inView])

  const select = (i: number) => {
    setIndex(i)
    restart()
  }

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      {/* LEFT: one illustration block, its bars re-fill as the pillar changes */}
      <div className="relative mx-auto w-full max-w-[300px]">
        <ChainIllustration key={index} active accent={pillars[index].color} />
      </div>

      {/* RIGHT: numbered list with a connector line through the nodes */}
      <div className="relative">
        <span className="absolute bottom-7 left-[31px] top-7 w-px bg-ink/15" aria-hidden="true" />
        <div className="flex flex-col gap-1">
          {pillars.map((p, i) => {
            const active = i === index
            return (
              <motion.button
                key={p.key}
                layout
                onClick={() => select(i)}
                transition={{ layout: { type: "spring", bounce: 0.2, duration: 0.5 } }}
                className={`group relative grid grid-cols-[38px_1fr] gap-4 overflow-hidden rounded-2xl px-3 text-left transition-colors ${
                  active ? "bg-white shadow-[0_6px_24px_rgba(0,0,0,0.05)] ring-1 ring-ink/10" : "hover:bg-ink/[0.03]"
                }`}
                style={{ paddingTop: active ? 18 : 14, paddingBottom: active ? 18 : 14 }}
              >
                <motion.span
                  layout="position"
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white"
                  style={{
                    boxShadow: active ? `inset 0 0 0 2px ${p.color}` : "inset 0 0 0 1.5px rgba(26,18,6,0.15)",
                  }}
                >
                  <span className="mono text-[12px] tabular-nums" style={{ color: active ? p.color : "rgba(26,18,6,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.span>

                <motion.div layout="position" className="min-w-0">
                  <span className={`mono text-[15px] tracking-[0.02em] ${active ? "text-ink" : "text-ink/55"}`}>
                    {p.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                        exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.45 }}
                        className="overflow-hidden pt-2 text-[14px] leading-relaxed text-ink/70"
                      >
                        {p.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {active && <AutoProgress key={index} duration={AUTOPLAY} color={p.color} />}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
