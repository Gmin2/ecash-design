import type { ReactNode } from "react"

// thin vertical tick-mark rulers down both gutters of the content column
export function EdgeRulers({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "rgba(9,9,22,0.35)" : "rgba(255,255,255,0.55)"
  const strip = {
    backgroundImage: `repeating-linear-gradient(to bottom, ${color} 0 1px, transparent 1px 6px)`,
  }
  return (
    <>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[10px]"
        style={strip}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[10px]"
        style={strip}
        aria-hidden="true"
      />
    </>
  )
}

// hairline divider with a centered mono label sitting on the line
export function SectionLabel({
  children,
  highlight,
}: {
  children: ReactNode
  highlight?: boolean
}) {
  return (
    <div className="relative flex items-center justify-center py-5">
      <span className="absolute inset-x-0 top-1/2 h-px bg-hairline" />
      <span
        className={`relative mono text-[12px] uppercase tracking-[0.12em] px-3 ${
          highlight ? "bg-accent text-ink" : "bg-bg text-ink"
        }`}
      >
        {children}
      </span>
    </div>
  )
}

// big display heading framed by oversized brackets
export function BracketHeading({
  children,
  className = "",
  bracket = "square",
}: {
  children: ReactNode
  className?: string
  bracket?: "square" | "curly"
}) {
  const open = bracket === "square" ? "[" : "{"
  const close = bracket === "square" ? "]" : "}"
  return (
    <h2 className={`font-display font-medium leading-[0.98] ${className}`}>
      <span className="text-accent">{open}</span>
      {children}
      <span className="text-accent">{close}</span>
    </h2>
  )
}

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: "solid" | "outline" | "pill"
  className?: string
}

export function Button({
  children,
  href = "#",
  variant = "solid",
  className = "",
}: ButtonProps) {
  const base =
    "mono inline-flex items-center justify-center gap-2 text-[13px] uppercase tracking-[0.08em] transition-colors duration-150"
  const styles = {
    solid: "bg-ink-pure text-accent px-7 py-4 hover:bg-ink",
    outline:
      "border border-ink-pure text-ink px-7 py-4 hover:bg-ink-pure hover:text-accent",
    pill: "rounded-full bg-accent text-ink px-5 py-2.5 hover:bg-accent-deep",
  }
  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  )
}

// subtly-bordered band with a dotted "scratch" texture concentrated in the centre
// and a faint vertical divider (the safenet transition-band treatment)
export function FramedBand({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const centerMask =
    "radial-gradient(ellipse 52% 88% at 50% 50%, #000 0%, rgba(0,0,0,0.45) 46%, transparent 80%)"
  return (
    <div className={`relative overflow-hidden border border-hairline ${className}`}>
      <span
        aria-hidden="true"
        className="tex-dots pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ WebkitMaskImage: centerMask, maskImage: centerMask }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/35 to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  )
}

// thin drawn "+" mark for framing card corners (adapted from tailark PlusDecorator)
export function PlusDecorator({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 size-3.5 before:absolute before:inset-0 before:m-auto before:h-px before:bg-ink/40 after:absolute after:inset-0 after:m-auto after:w-px after:bg-ink/40 ${className}`}
    />
  )
}

// small black chip with a mono label, used as floating callouts + tags
export function CalloutChip({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`mono inline-flex items-center bg-white text-ink text-[12px] uppercase tracking-[0.06em] px-2.5 py-1 ${className}`}
    >
      {children}
    </span>
  )
}
