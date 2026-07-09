import { motion } from "motion/react"

// spot diagrams for the what-to-expect steps. same drawn-gold language as
// ForkDiagram: mono labels, ink strokes, gold for the eCash side.

const INK = "#1a1206"
const GOLD = "#e8a84a"
const DEEP = "#cf8a2e"
const FADE = "#faf1dd"
const MUTE = "rgba(26,18,6,0.45)"
const HAIR = "rgba(26,18,6,0.18)"
const MONO = "'Matter Mono', ui-monospace, monospace"

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: d, duration: 0.5, ease: "easeInOut" as const },
      opacity: { delay: d, duration: 0.01 },
    },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 5 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.4 } }),
}

const pop = {
  hidden: { opacity: 0, scale: 0.5 },
  show: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: d, type: "spring" as const, stiffness: 320, damping: 20 },
  }),
}

const popStyle = { transformBox: "fill-box", transformOrigin: "center" } as const

function Mono({
  x,
  y,
  text,
  size = 10.5,
  fill = MUTE,
  anchor = "middle",
  weight,
  d = 0,
}: {
  x: number
  y: number
  text: string
  size?: number
  fill?: string
  anchor?: "start" | "middle" | "end"
  weight?: number
  d?: number
}) {
  return (
    <motion.text
      variants={fade}
      custom={d}
      x={x}
      y={y}
      fontFamily={MONO}
      fontSize={size}
      letterSpacing="0.07em"
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight}
    >
      {text.toUpperCase()}
    </motion.text>
  )
}

function Frame({
  vb,
  label,
  children,
  className = "",
}: {
  vb: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.svg
      viewBox={vb}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={label}
    >
      {children}
    </motion.svg>
  )
}

// 01 · the snapshot: the ledger is read, every balance credited 1:1
export function SnapshotDiagram() {
  const rows = [
    { addr: "bc1q…4f2a", amt: "1.00" },
    { addr: "bc1q…9be1", amt: "0.42" },
    { addr: "3j98…x71k", amt: "6.15" },
  ]
  return (
    <Frame vb="0 0 360 216" label="diagram: the snapshot credits every btc address with eCash">
      {/* header: the fork block being read */}
      <motion.g variants={pop} custom={0.1} style={popStyle}>
        <path d="M20 18h26v26h-26z" fill={GOLD} stroke={INK} strokeWidth={1.5} />
      </motion.g>
      <Mono x={58} y={30} text="block ~964,000" anchor="start" fill={INK} size={11} weight={600} d={0.2} />
      <Mono x={58} y={44} text="ledger read once" anchor="start" size={9.5} d={0.26} />
      <motion.path variants={draw} custom={0.3} d="M20 62h320" fill="none" stroke={HAIR} strokeWidth={1.2} />

      {/* ledger rows */}
      {rows.map((r, i) => {
        const y = 94 + i * 34
        const d = 0.45 + i * 0.14
        return (
          <g key={r.addr}>
            <Mono x={20} y={y} text={r.addr} anchor="start" fill="rgba(26,18,6,0.6)" d={d} />
            <Mono x={172} y={y} text={`${r.amt} btc`} anchor="end" fill={MUTE} d={d + 0.04} />
            <motion.path
              variants={draw}
              custom={d + 0.1}
              d={`M186 ${y - 3.5}h26m-7 -5l7 5l-7 5`}
              fill="none"
              stroke={DEEP}
              strokeWidth={1.3}
            />
            <Mono x={226} y={y} text={`+${r.amt} ecash`} anchor="start" fill={DEEP} weight={600} d={d + 0.18} />
          </g>
        )
      })}

      {/* scanline sweeping the rows */}
      <motion.rect
        x={14}
        width={332}
        height={3}
        rx={1.5}
        fill={GOLD}
        initial={{ y: 72, opacity: 0 }}
        whileInView={{ y: [72, 196, 196], opacity: [0, 0.7, 0] }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 0.45, duration: 1.1, times: [0, 0.85, 1], ease: "easeInOut" }}
      />
      <Mono x={180} y={210} text="no claim · no form · automatic" size={9} d={1.3} />
    </Frame>
  )
}

// 02 · your btc is safe: one address, two coins (drawn on the gold card)
export function SafeDiagram() {
  return (
    <Frame vb="0 0 360 216" label="diagram: your btc stays untouched, eCash arrives alongside">
      {/* address chip */}
      <motion.g variants={pop} custom={0.1} style={popStyle}>
        <rect x={90} y={16} width={180} height={30} rx={15} fill="#fff" stroke={INK} strokeWidth={1.3} />
      </motion.g>
      <Mono x={180} y={35} text="your address · bc1q…" fill={INK} size={10.5} weight={600} d={0.2} />

      {/* connectors down to the two coins */}
      <motion.path
        variants={draw}
        custom={0.35}
        d="M160 46 C 130 66, 110 74, 104 92"
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
      />
      <motion.path
        variants={draw}
        custom={0.45}
        d="M200 46 C 230 66, 250 74, 256 92"
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeDasharray="3 4"
      />

      {/* btc coin: untouched */}
      <motion.g variants={pop} custom={0.6} style={popStyle}>
        <circle cx={100} cy={130} r={34} fill="#fff" stroke={INK} strokeWidth={1.6} />
        <text x={100} y={140} fontFamily={MONO} fontSize={26} fontWeight={700} fill={INK} textAnchor="middle">
          ₿
        </text>
        {/* check badge */}
        <circle cx={126} cy={106} r={10} fill={INK} />
        <path d="M121.5 106l3 3.5l6 -7" fill="none" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <Mono x={100} y={186} text="untouched" fill={INK} weight={600} d={0.85} />
      <Mono x={100} y={200} text="still yours, still btc" size={9} fill="rgba(26,18,6,0.55)" d={0.9} />

      {/* ecash coin: arrives alongside */}
      <motion.g variants={pop} custom={0.75} style={popStyle}>
        <circle cx={260} cy={130} r={34} fill={INK} stroke={INK} strokeWidth={1.6} />
        <text x={260} y={139} fontFamily={MONO} fontSize={20} fontWeight={700} fill={GOLD} textAnchor="middle">
          eC
        </text>
      </motion.g>
      <Mono x={260} y={186} text="arrives alongside" fill={INK} weight={600} d={0.95} />
      <Mono x={260} y={200} text="same address · new asset" size={9} fill="rgba(26,18,6,0.55)" d={1.0} />
    </Frame>
  )
}

// 03 · this has happened before: 2009 → 2017 bch → 2026 ecash
export function PrecedentDiagram() {
  const forkGlyph = (x: number, stroke: string, sw: number, d: number) => (
    <motion.path
      variants={draw}
      custom={d}
      d={`M${x - 14} 128 L${x} 128 M${x} 128 C ${x + 12} 128, ${x + 12} 104, ${x + 26} 104 M${x} 128 L${x + 26} 128`}
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
    />
  )
  return (
    <Frame vb="0 0 360 200" label="diagram: the 2017 bch fork precedent, repeated in 2026">
      {/* baseline */}
      <motion.path variants={draw} custom={0.1} d="M24 128h150" fill="none" stroke={INK} strokeWidth={1.4} />
      <motion.path variants={draw} custom={0.5} d="M200 128h68" fill="none" stroke={INK} strokeWidth={1.4} />
      <motion.g variants={fade} custom={1.15}>
        <path d="M320 128h22" fill="none" stroke={MUTE} strokeWidth={1.3} strokeDasharray="2 5" />
        <path d="M346 124l7 4l-7 4" fill="none" stroke={MUTE} strokeWidth={1.3} />
      </motion.g>

      {/* 2009 genesis */}
      <motion.g variants={pop} custom={0.15} style={popStyle}>
        <circle cx={30} cy={128} r={5} fill="#fff" stroke={INK} strokeWidth={1.5} />
      </motion.g>
      <Mono x={30} y={152} text="2009" fill={INK} weight={600} d={0.25} />
      <Mono x={30} y={166} text="genesis" size={9} d={0.3} />

      {/* 2017 bch fork */}
      {forkGlyph(174, MUTE, 1.4, 0.45)}
      <Mono x={188} y={92} text="every holder got bch" size={9} d={0.7} />
      <Mono x={180} y={152} text="2017" fill={INK} weight={600} d={0.6} />
      <Mono x={180} y={166} text="bch fork" size={9} d={0.65} />

      {/* 2026 ecash fork */}
      {forkGlyph(268, DEEP, 1.7, 0.85)}
      <motion.g variants={pop} custom={1.0} style={popStyle}>
        <path d="M287 97h14v14h-14z" fill={GOLD} stroke={INK} strokeWidth={1.3} />
      </motion.g>
      <Mono x={290} y={152} text="2026 · ecash" fill={DEEP} weight={700} d={1.0} />
      <Mono x={290} y={166} text="same mechanics" size={9} fill={DEEP} d={1.05} />
    </Frame>
  )
}

// 04 · preview it right now: mini bitwindow on live signet
export function PreviewDiagram() {
  return (
    <Frame vb="0 0 360 200" label="diagram: bitwindow running on live signet today">
      {/* window frame */}
      <motion.g variants={pop} custom={0.1} style={popStyle}>
        <rect x={40} y={22} width={280} height={150} rx={10} fill="#fff" stroke={INK} strokeWidth={1.5} />
        <path d="M40 52h280" stroke={HAIR} strokeWidth={1.2} />
        <circle cx={58} cy={37} r={3.5} fill="none" stroke={MUTE} strokeWidth={1.2} />
        <circle cx={72} cy={37} r={3.5} fill="none" stroke={MUTE} strokeWidth={1.2} />
        <circle cx={86} cy={37} r={3.5} fill="none" stroke={MUTE} strokeWidth={1.2} />
      </motion.g>
      <Mono x={302} y={41} text="bitwindow" anchor="end" size={9} d={0.3} />

      {/* fake ui rows */}
      <motion.g variants={fade} custom={0.45}>
        <rect x={58} y={70} width={110} height={10} rx={3} fill={FADE} />
        <rect x={58} y={90} width={150} height={10} rx={3} fill="rgba(26,18,6,0.07)" />
        <rect x={58} y={110} width={90} height={10} rx={3} fill="rgba(26,18,6,0.07)" />
      </motion.g>
      <motion.g variants={fade} custom={0.55}>
        <rect x={228} y={70} width={74} height={50} rx={5} fill={FADE} stroke={DEEP} strokeWidth={1.1} />
      </motion.g>
      <Mono x={265} y={100} text="signet" size={9} fill={DEEP} weight={600} d={0.65} />

      {/* live status */}
      <motion.circle
        cx={62}
        cy={148}
        r={4}
        fill={DEEP}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0.35, 1, 0.35] }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 0.8, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <Mono x={76} y={152} text="live signet · running today" anchor="start" size={9.5} fill={INK} d={0.8} />
      <Mono x={180} y={192} text="full node · wallet · sidechains" size={9} d={0.95} />
    </Frame>
  )
}

// 05 · replay & coin splitting: one tx hits both rails, the split makes them independent
export function ReplayDiagram() {
  return (
    <Frame vb="0 0 360 216" label="diagram: transaction replay before the one-time coin split">
      {/* rails */}
      <Mono x={20} y={78} text="btc" anchor="start" fill={INK} size={10} weight={600} d={0.1} />
      <Mono x={20} y={158} text="ecash" anchor="start" fill={DEEP} size={10} weight={600} d={0.1} />
      <motion.path variants={draw} custom={0.15} d="M62 74h280" fill="none" stroke={MUTE} strokeWidth={1.3} />
      <motion.path variants={draw} custom={0.15} d="M62 154h280" fill="none" stroke={DEEP} strokeWidth={1.4} />

      {/* before: one tx broadcasts on both */}
      <motion.g variants={pop} custom={0.4} style={popStyle}>
        <path d="M92 106h20v20h-20z" fill="#fff" stroke={INK} strokeWidth={1.4} />
      </motion.g>
      <motion.path variants={draw} custom={0.55} d="M102 104 V 78" fill="none" stroke={MUTE} strokeWidth={1.2} />
      <motion.path variants={draw} custom={0.62} d="M102 128 V 150" fill="none" stroke={DEEP} strokeWidth={1.2} strokeDasharray="3 3" />
      <Mono x={102} y={196} text="one tx · lands on both" size={9} d={0.75} />

      {/* the split gate */}
      <motion.g variants={pop} custom={0.95} style={popStyle}>
        <rect x={196} y={58} width={22} height={112} rx={11} fill={GOLD} stroke={INK} strokeWidth={1.4} />
      </motion.g>
      <motion.text
        variants={fade}
        custom={1.05}
        x={207}
        y={114}
        fontFamily={MONO}
        fontSize={9.5}
        fontWeight={700}
        letterSpacing="0.1em"
        fill={INK}
        textAnchor="middle"
        transform="rotate(-90 207 114)"
      >
        SPLIT
      </motion.text>

      {/* after: independent txs */}
      <motion.g variants={pop} custom={1.2} style={popStyle}>
        <path d="M258 64h20v20h-20z" fill="#fff" stroke={MUTE} strokeWidth={1.3} />
      </motion.g>
      <motion.g variants={pop} custom={1.3} style={popStyle}>
        <path d="M292 144h20v20h-20z" fill={FADE} stroke={DEEP} strokeWidth={1.4} />
      </motion.g>
      <Mono x={286} y={196} text="fully independent" size={9} d={1.45} />
    </Frame>
  )
}
