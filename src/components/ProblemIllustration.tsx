import { useEffect, useRef } from "react"
import { createTimeline, animate, stagger } from "animejs"

const STROKE = "rgba(26,18,6,0.6)"
const DIM = "rgba(26,18,6,0.3)"

function useReveal(run: (root: SVGSVGElement) => () => void) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    let cleanup: (() => void) | undefined
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            cleanup?.()
            cleanup = run(root)
          }
        }
      },
      { threshold: 0.3 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      cleanup?.()
    }
  }, [])
  return ref
}

/* milestone timeline (ai-journey style) */
function Timeline() {
  const ref = useReveal((root) => {
    const q = (s: string) => root.querySelectorAll(s)
    const tl = createTimeline()
    tl.add(root.querySelector(".tl-line")!, { scaleX: [0, 1], duration: 750, ease: "out(3)" }, 0)
      .add(q(".tl-node"), { scale: [0, 1], opacity: [0, 1], duration: 480, ease: "outBack", delay: stagger(150) }, 250)
      .add(root.querySelector(".tl-drop")!, { scaleY: [0, 1], duration: 450, ease: "out(3)" }, 850)
      .add(q(".tl-fade"), { opacity: [0, 1], duration: 450 }, 950)
      .add(root.querySelector(".tl-head")!, { opacity: [0, 1], duration: 250 }, 850)
      // progress travels segwit -> taproot
      .add(root.querySelector(".tl-head-travel")!, { translateX: [0, 246], duration: 1000, ease: "out(3)" }, 950)
      // the blocker drops in just past taproot
      .add(root.querySelector(".tl-blocker")!, { opacity: [0, 1], scale: [0.5, 1], duration: 380, ease: "outBack" }, 1600)
    const glow = animate(q(".tl-glow"), { opacity: [0.15, 0.4], scale: [0.92, 1.08], loop: true, alternate: true, duration: 1400, ease: "inOut(2)" })
    const miss = animate(q(".tl-miss"), { opacity: [0.25, 0.7], loop: true, alternate: true, duration: 1300, ease: "inOut(2)", delay: 1100 })
    // the head shakes against the blocker, cant get past
    const shake = animate(root.querySelectorAll(".tl-head-shake"), { translateX: [0, 5, -1, 3, 0], loop: true, duration: 500, ease: "inOut(2)", delay: 2050 })
    const bshake = animate(root.querySelectorAll(".tl-blocker-shake"), { translateX: [0, 2, -2, 0], loop: true, duration: 500, ease: "inOut(2)", delay: 2050 })
    return () => {
      tl.pause()
      glow.pause()
      miss.pause()
      shake.pause()
      bshake.pause()
    }
  })

  const lineY = 150
  const nodes = [
    { cx: 150, label: "segwit · 17", active: false, miss: false },
    { cx: 360, label: "taproot · 21", active: true, miss: false },
    { cx: 560, label: "", active: false, miss: true },
  ]

  return (
    <svg ref={ref} viewBox="0 0 700 320" className="h-auto w-full">
      <defs>
        <pattern id="pl-hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="16" stroke="var(--color-accent)" strokeWidth="7" opacity="0.1" />
        </pattern>
      </defs>

      <g>
        {Array.from({ length: 43 }).map((_, i) => (
          <line key={i} x1={26 + i * 15} y1={28} x2={26 + i * 15} y2={48} stroke="var(--color-accent)" strokeWidth="1.5" opacity={0.35} />
        ))}
      </g>
      <rect x="0" y="84" width="700" height="132" fill="url(#pl-hatch)" />

      <line
        className="tl-line"
        x1="24"
        y1={lineY}
        x2="676"
        y2={lineY}
        stroke="var(--color-accent-deep)"
        strokeWidth="2"
        strokeDasharray="2 11"
        strokeLinecap="round"
        style={{ transformBox: "fill-box", transformOrigin: "left center", transform: "scaleX(0)" }}
      />

      <line
        className="tl-drop"
        x1="360"
        y1={lineY + 32}
        x2="360"
        y2={lineY + 108}
        stroke="var(--color-accent-deep)"
        strokeWidth="1.5"
        style={{ transformBox: "fill-box", transformOrigin: "center top", transform: "scaleY(0)" }}
      />
      <text className="tl-fade mono" x="360" y={lineY + 130} textAnchor="middle" fontSize="13" fill={STROKE} style={{ opacity: 0 }}>
        last upgrade · 2021
      </text>

      {nodes.map((n, i) => (
        <g key={i} className="tl-node" style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scale(0)" }}>
          {n.active && <circle className="tl-glow" cx={n.cx} cy={lineY} r={44} fill="var(--color-accent)" style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0.2 }} />}
          <circle
            className={n.miss ? "tl-miss" : ""}
            cx={n.cx}
            cy={lineY}
            r={n.active ? 32 : 28}
            fill={n.active ? "var(--color-accent)" : "#ffffff"}
            stroke={n.active ? "none" : n.miss ? DIM : "var(--color-accent-deep)"}
            strokeWidth="2"
            strokeDasharray={n.miss ? "3 4" : undefined}
            style={n.miss ? { opacity: 0.4 } : undefined}
          />
          {n.miss ? (
            <text className="tl-miss" x={n.cx} y={lineY + 1} textAnchor="middle" dominantBaseline="central" fontSize="24" fill={DIM} style={{ opacity: 0.5 }}>
              ?
            </text>
          ) : (
            <path d={`M${n.cx - 9},${lineY} l5,6 l12,-14`} fill="none" stroke={n.active ? "#ffffff" : "var(--color-accent-deep)"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {n.label && (
            <text className="tl-fade mono" x={n.cx} y={lineY - 46} textAnchor="middle" fontSize="12" fill={STROKE} style={{ opacity: 0 }}>
              {n.label}
            </text>
          )}
        </g>
      ))}

      {/* blocker between taproot and the missing future */}
      <g className="tl-blocker" style={{ opacity: 0, transformBox: "fill-box", transformOrigin: "center", transform: "scale(0.5)" }}>
        <g className="tl-blocker-shake">
          <rect x={400} y={lineY - 28} width={12} height={56} rx={3} fill="var(--color-accent)" stroke={STROKE} strokeWidth={2} />
          <line x1={402} y1={lineY - 12} x2={410} y2={lineY - 20} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
          <line x1={402} y1={lineY + 4} x2={410} y2={lineY - 4} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
          <line x1={402} y1={lineY + 20} x2={410} y2={lineY + 12} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
        </g>
      </g>

      {/* progress head: segwit -> taproot, then blocked */}
      <g className="tl-head" style={{ opacity: 0 }}>
        <g className="tl-head-travel">
          <g className="tl-head-shake">
            <circle cx={150} cy={lineY} r={7} fill="var(--color-ink)" stroke="#fff" strokeWidth={2} />
          </g>
        </g>
      </g>

      <text className="tl-miss mono" x="560" y={lineY + 62} textAnchor="middle" fontSize="12" fill={DIM} style={{ opacity: 0.4 }}>
        nowhere in sight
      </text>
    </svg>
  )
}

function gearPath(cx: number, cy: number, teeth: number, ri: number, ro: number) {
  const step = Math.PI / teeth
  let d = ""
  for (let i = 0; i < teeth * 2; i++) {
    const a = i * step
    const r = i % 2 === 0 ? ro : ri
    d += (i === 0 ? "M" : "L") + (cx + Math.cos(a) * r).toFixed(1) + "," + (cy + Math.sin(a) * r).toFixed(1)
  }
  return d + "Z"
}

/* seized gears (anime.js: rock, jam, never turn) */
function Gears() {
  const ref = useReveal((root) => {
    const q = (s: string) => root.querySelectorAll(s)
    const a1 = animate(q(".gr-1"), { rotate: [0, 7], loop: true, alternate: true, duration: 720, ease: "inOut(3)" })
    const a2 = animate(q(".gr-2"), { rotate: [0, -7], loop: true, alternate: true, duration: 720, ease: "inOut(3)" })
    const wedge = animate(q(".gr-wedge"), { translateY: [-20, 0], opacity: [0, 1], duration: 650, ease: "outBack" })
    return () => {
      a1.pause()
      a2.pause()
      wedge.pause()
    }
  })

  const g1 = { cx: 220, cy: 175 }
  const g2 = { cx: 390, cy: 175 }
  return (
    <svg ref={ref} viewBox="0 0 620 340" className="h-auto w-full">
      <g className="gr-1" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={gearPath(g1.cx, g1.cy, 12, 64, 92)} fill="#ffffff" stroke={STROKE} strokeWidth={3} />
        <circle cx={g1.cx} cy={g1.cy} r={25} fill="none" stroke={STROKE} strokeWidth={3} />
        <text x={g1.cx} y={g1.cy + 1} textAnchor="middle" dominantBaseline="central" fontFamily="Matter, sans-serif" fontWeight="600" fontSize="48" fill="rgba(26,18,6,0.7)">
          ₿
        </text>
      </g>
      <g className="gr-2" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={gearPath(g2.cx, g2.cy, 12, 64, 92)} fill="#ffffff" stroke={STROKE} strokeWidth={3} />
        <circle cx={g2.cx} cy={g2.cy} r={25} fill="none" stroke={STROKE} strokeWidth={3} />
      </g>
      <path className="gr-wedge" d="M305,88 L329,140 L281,140 Z" fill="var(--color-accent)" stroke={STROKE} strokeWidth={3} style={{ opacity: 0 }} />
    </svg>
  )
}

export function ProblemIllustration() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <Timeline />
      <Gears />
    </div>
  )
}
