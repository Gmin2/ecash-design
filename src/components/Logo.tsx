type MarkProps = {
  className?: string
  tone?: "ink" | "gold" | "white"
}

// the gold "e" mark. one png, recoloured per context via css filter:
//  ink   -> black silhouette (for gold / light backgrounds)
//  gold  -> original amber (for dark backgrounds)
//  white -> white silhouette (for dark backgrounds)
const filters: Record<NonNullable<MarkProps["tone"]>, string> = {
  ink: "brightness(0)",
  gold: "none",
  white: "brightness(0) invert(1)",
}

export function LogoMark({ className = "", tone = "ink" }: MarkProps) {
  return (
    <img
      src="/logos/ecash-e-gold.png"
      alt=""
      aria-hidden="true"
      className={className}
      style={{ filter: filters[tone] }}
    />
  )
}

export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string
  tone?: MarkProps["tone"]
}) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 object-contain" tone={tone} />
      <span
        className="font-display text-[22px] font-semibold leading-none tracking-tight"
        style={{ color: tone === "white" ? "#fff" : "var(--color-ink)" }}
      >
        eCash
      </span>
    </a>
  )
}
