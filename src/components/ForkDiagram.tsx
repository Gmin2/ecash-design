import { motion } from "motion/react"

// the hard-fork diagram: one shared history splitting into btc (unchanged)
// and eCash (drivechains + sidechains), 1:1 at the fork block.
// geometry verified in tmp/claude/fork-diagram before porting here.

const W = 950
const H = 340
const INK = "#1a1206"
const GOLD = "#e8a84a"
const DEEP = "#cf8a2e"
const FADE = "#faf1dd"
const MUTE = "rgba(26,18,6,0.45)"
const HAIR = "rgba(26,18,6,0.18)"
const MONO = "'Matter Mono', ui-monospace, monospace"

const midY = 150
const B = 30
const GAP = 62
const forkX = 435
const startX = forkX - 4 * GAP
const btcY = 84
const ecY = 216
const branchStart = forkX + B / 2 + 3
const btcStart = forkX + 128 + B / 2
const ecStart = btcStart
const btcEnd = btcStart + 3 * GAP + B / 2
const sides = ["thunder", "zside", "bitnames"]

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: d, duration: 0.55, ease: "easeInOut" as const },
      opacity: { delay: d, duration: 0.01 },
    },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 6 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.45 } }),
}

const pop = {
  hidden: { opacity: 0, scale: 0.5 },
  show: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: d, type: "spring" as const, stiffness: 320, damping: 20 },
  }),
}

function Block({
  x,
  y,
  size,
  fill = "#fff",
  stroke = INK,
  sw = 1.4,
  mark = HAIR,
  plain = false,
  d = 0,
}: {
  x: number
  y: number
  size: number
  fill?: string
  stroke?: string
  sw?: number
  mark?: string
  plain?: boolean
  d?: number
}) {
  const h = size / 2
  return (
    <motion.g variants={pop} custom={d} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      <path d={`M${x - h} ${y - h}h${size}v${size}h${-size}z`} fill={fill} stroke={stroke} strokeWidth={sw} />
      {!plain && <path d={`M${x - h + 5} ${y + h - 5}h${size * 0.34}`} fill="none" stroke={mark} strokeWidth={1.2} />}
    </motion.g>
  )
}

function Label({
  x,
  y,
  text,
  size = 11,
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
      letterSpacing="0.08em"
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight}
    >
      {text.toUpperCase()}
    </motion.text>
  )
}

export function ForkDiagram({ className = "" }: { className?: string }) {
  return (
    // scrolls sideways on phones so the labels stay legible
    <div className={`overflow-x-auto ${className}`}>
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full min-w-[720px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      aria-label="diagram: bitcoin hard forks into btc and eCash at block 964,000"
    >
      {/* shared history */}
      {Array.from({ length: 4 }, (_, i) => {
        const x = startX + i * GAP
        return (
          <g key={i}>
            <Block x={x} y={midY} size={B} d={i * 0.06} />
            <motion.path
              variants={draw}
              custom={i * 0.06 + 0.05}
              d={`M${x + B / 2} ${midY}h${GAP - B}`}
              fill="none"
              stroke={INK}
              strokeWidth={1.4}
            />
          </g>
        )
      })}
      <Label x={startX - 30} y={midY + 4} text="bitcoin" anchor="end" fill={INK} size={12} weight={600} d={0.1} />
      <Label x={startX - 30} y={midY + 22} text="one shared history" anchor="end" size={10} d={0.16} />

      {/* fork block + callout */}
      <Block x={forkX} y={midY} size={B + 6} fill={GOLD} sw={1.6} mark="rgba(26,18,6,0.35)" d={0.4} />
      <motion.path
        variants={draw}
        custom={0.55}
        d={`M${forkX} ${midY - B / 2 - 8}v-16`}
        fill="none"
        stroke={DEEP}
        strokeWidth={1.2}
      />
      <Label x={forkX} y={midY - B / 2 - 34} text="block ~964,000" fill={INK} size={12} weight={600} d={0.62} />
      <Label x={forkX} y={midY - B / 2 - 52} text="aug 21 2026 · 15:00 utc" size={10.5} d={0.68} />

      {/* split curves */}
      <motion.path
        variants={draw}
        custom={0.75}
        d={`M${branchStart} ${midY - 6} C ${forkX + 70} ${midY - 8}, ${forkX + 70} ${btcY}, ${forkX + 128} ${btcY}`}
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
      />
      <motion.path
        variants={draw}
        custom={0.75}
        d={`M${branchStart} ${midY + 6} C ${forkX + 70} ${midY + 8}, ${forkX + 70} ${ecY}, ${forkX + 128} ${ecY}`}
        fill="none"
        stroke={DEEP}
        strokeWidth={1.6}
      />

      {/* btc branch */}
      {Array.from({ length: 4 }, (_, i) => {
        const x = btcStart + i * GAP
        return (
          <g key={i}>
            <Block x={x} y={btcY} size={B} stroke={MUTE} d={1.05 + i * 0.07} />
            {i < 3 && (
              <motion.path
                variants={draw}
                custom={1.1 + i * 0.07}
                d={`M${x + B / 2} ${btcY}h${GAP - B}`}
                fill="none"
                stroke={MUTE}
                strokeWidth={1.3}
              />
            )}
          </g>
        )
      })}
      <motion.g variants={fade} custom={1.4}>
        <path d={`M${btcEnd} ${btcY}h40`} fill="none" stroke={MUTE} strokeWidth={1.3} strokeDasharray="2 5" />
        <path d={`M${btcEnd + 46} ${btcY - 4}l8 4l-8 4`} fill="none" stroke={MUTE} strokeWidth={1.3} />
      </motion.g>
      <Label x={btcStart + 1.5 * GAP} y={btcY - 34} text="btc · continues unchanged" size={10.5} d={1.3} />
      <Label
        x={btcStart + 1.5 * GAP}
        y={btcY - 20}
        text="your keys still work here"
        size={9.5}
        fill="rgba(26,18,6,0.35)"
        d={1.38}
      />

      {/* eCash branch */}
      {Array.from({ length: 4 }, (_, i) => {
        const x = ecStart + i * GAP
        return (
          <g key={i}>
            <Block
              x={x}
              y={ecY}
              size={B}
              fill={i === 0 ? GOLD : FADE}
              stroke={DEEP}
              sw={1.5}
              mark="rgba(207,138,46,0.5)"
              d={1.05 + i * 0.07}
            />
            {i < 3 && (
              <motion.path
                variants={draw}
                custom={1.1 + i * 0.07}
                d={`M${x + B / 2} ${ecY}h${GAP - B}`}
                fill="none"
                stroke={DEEP}
                strokeWidth={1.5}
              />
            )}
          </g>
        )
      })}
      <motion.g variants={fade} custom={1.4}>
        <path d={`M${btcEnd} ${ecY}h40`} fill="none" stroke={DEEP} strokeWidth={1.5} strokeDasharray="2 5" />
        <path d={`M${btcEnd + 46} ${ecY - 4}l8 4l-8 4`} fill="none" stroke={DEEP} strokeWidth={1.5} />
      </motion.g>
      <Label
        x={ecStart + 1.5 * GAP}
        y={ecY - 27}
        text="ecash · drivechains active"
        fill={DEEP}
        size={10.5}
        weight={600}
        d={1.3}
      />

      {/* 1:1 mapping */}
      <motion.path
        variants={fade}
        custom={1.5}
        d={`M${btcStart} ${btcY + B / 2 + 6}V${ecY - B / 2 - 6}`}
        fill="none"
        stroke={HAIR}
        strokeWidth={1.2}
        strokeDasharray="3 4"
      />
      <motion.g variants={pop} custom={1.6} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <rect x={btcStart - 15} y={midY - 10} width={30} height={20} rx={10} fill={FADE} stroke={DEEP} strokeWidth={1.1} />
        <text
          x={btcStart}
          y={midY + 4}
          fontFamily={MONO}
          fontSize={10.5}
          letterSpacing="0.08em"
          fill={INK}
          textAnchor="middle"
          fontWeight={700}
        >
          1:1
        </text>
      </motion.g>

      {/* sidechains */}
      {sides.map((s, i) => {
        const x = ecStart + (i + 1) * GAP
        const y = ecY + 52
        return (
          <g key={s}>
            <motion.path
              variants={fade}
              custom={1.65 + i * 0.1}
              d={`M${x} ${ecY + B / 2 + 2}v${y - ecY - B / 2 - 12}`}
              fill="none"
              stroke={DEEP}
              strokeWidth={1.1}
              strokeDasharray="3 4"
            />
            <Block x={x} y={y + 8} size={18} stroke={DEEP} sw={1.2} plain d={1.7 + i * 0.1} />
            <Label x={x} y={y + 34} text={s} size={9} d={1.75 + i * 0.1} />
          </g>
        )
      })}
      <Label
        x={ecStart + 2 * GAP}
        y={ecY + 104}
        text="sidechains · bmm pegged"
        size={9.5}
        fill="rgba(207,138,46,0.8)"
        d={2.05}
      />
    </motion.svg>
    </div>
  )
}
