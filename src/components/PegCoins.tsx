import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { BracketHeading, EdgeRulers, FramedBand, SectionLabel } from "./primitives"

const ECASH_PATH =
  "M58.19,86.51c15.68-9.09,31.51-18.17,47.19-27.26a15,15,0,0,1,15.25,0l23.3,13.34a2.06,2.06,0,0,1,0,3.52l-57,32.83a4.68,4.68,0,0,0-2.34,4.1V140.6a4.45,4.45,0,0,0,2.34,4l23.9,13.78a4.23,4.23,0,0,0,4.54,0l98.49-56.72c16.71-9.68,16.71-37.52,0-47.2l-88.52-51a23.66,23.66,0,0,0-24.48,0l-88.53,51A24.2,24.2,0,0,0,0,75.67c0,34.15.15,68.15,0,102.15a24.22,24.22,0,0,0,12.31,21.26l88.53,51.15a24.4,24.4,0,0,0,24.48,0l88.52-51.15A23.92,23.92,0,0,0,226,177.82V133.41l-105.38,61a15,15,0,0,1-15.25,0l-47-27.27a14.91,14.91,0,0,1-7.62-13.19V99.56a15,15,0,0,1,7.48-13Z"

const cx = 180
const rx = 96
const ry = 50 // foreshortened => the tilt
const T = 28 // coin thickness
const INK = "rgba(26,18,6,0.35)"

// a tilted (cylinder) coin: bottom ellipse + side wall + top face
function Coin({
  cy,
  id,
  grad,
  wall,
  bottom,
  children,
}: {
  cy: number
  id: string
  grad: [string, string]
  wall: string
  bottom: string
  children: React.ReactNode
}) {
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="40%" cy="28%" r="85%">
          <stop offset="0%" stopColor={grad[0]} />
          <stop offset="100%" stopColor={grad[1]} />
        </radialGradient>
      </defs>
      {/* bottom edge */}
      <ellipse cx={cx} cy={cy + T} rx={rx} ry={ry} fill={bottom} stroke={INK} strokeWidth={1.5} />
      {/* side wall */}
      <rect x={cx - rx} y={cy} width={rx * 2} height={T} fill={wall} />
      {/* reeding */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = cx - rx + 8 + i * ((rx * 2 - 16) / 21)
        return <line key={i} x1={x} y1={cy + 3} x2={x} y2={cy + T - 1} stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
      })}
      <line x1={cx - rx} y1={cy} x2={cx - rx} y2={cy + T} stroke={INK} strokeWidth={1.5} />
      <line x1={cx + rx} y1={cy} x2={cx + rx} y2={cy + T} stroke={INK} strokeWidth={1.5} />
      {/* top face */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} stroke={INK} strokeWidth={2} />
      <ellipse cx={cx} cy={cy} rx={rx - 11} ry={ry - 6} fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth={1.5} strokeDasharray="2 5" />
      {children}
    </g>
  )
}

function Coins() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: false })
  const btcY = 190
  const xecY = 142

  return (
    <svg
      ref={ref}
      viewBox="0 70 360 220"
      className="mx-auto h-auto w-full max-w-[360px] overflow-visible"
      style={{ transform: "rotate(-9deg)" }}
    >
      <motion.ellipse
        cx={cx}
        cy={btcY + T + ry + 14}
        rx={rx * 0.82}
        ry={12}
        fill="rgba(0,0,0,0.12)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* BTC coin, under */}
      <motion.g
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.5 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <Coin cy={btcY} id="btcG" grad={["#ffb04a", "#f7931a"]} wall="#c46f08" bottom="#a85f06">
            <g transform={`translate(${cx},${btcY}) scale(1,0.58)`}>
              <text textAnchor="middle" dominantBaseline="central" fontFamily="Matter, sans-serif" fontWeight={700} fontSize={80} fill="#fff">
                ₿
              </text>
            </g>
          </Coin>
        </motion.g>
      </motion.g>

      {/* eCash coin, drops onto the BTC coin */}
      <motion.g
        initial={{ opacity: 0, y: -150 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -150 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 150, damping: 12 }}
      >
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}>
          <Coin cy={xecY} id="xecG" grad={["#f3c074", "#e8a84a"]} wall="#c2851f" bottom="#a8731a">
            <g transform={`translate(${cx},${xecY}) scale(0.36,0.208)`}>
              <path d={ECASH_PATH} transform="translate(-113,-126)" fill="#ffffff" />
            </g>
          </Coin>
        </motion.g>
      </motion.g>
    </svg>
  )
}

export function PegSection() {
  return (
    <section id="the-airdrop" className="bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel>the airdrop</SectionLabel>
        <div className="py-12 md:py-16">
          <FramedBand className="px-6 py-16 md:px-12 md:py-20">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <BracketHeading className="lowercase text-[clamp(28px,4.4vw,56px)]">
                &nbsp;pegged 1:1 to bitcoin&nbsp;
              </BracketHeading>
              <p className="mt-6 max-w-md px-4 py-2 font-display text-[clamp(16px,1.8vw,20px)] font-medium leading-relaxed text-ink/75">
                after block ~964,000, every BTC address has eCash. no claim, no
                form, your BTC stays yours.
              </p>
              <div className="mt-8 w-full">
                <Coins />
              </div>
            </div>
          </FramedBand>
        </div>
      </div>
    </section>
  )
}
