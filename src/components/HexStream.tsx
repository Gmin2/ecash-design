import { useEffect, useRef, useState } from "react"

const CHARS = "0123456789ABCDEF"

function randLine(len: number) {
  let s = ""
  for (let i = 0; i < len; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)]
  return s
}

// animated hex stream, fills its positioned parent. used as a texture layer.
export function HexStream({
  rows = 14,
  cols = 110,
  className = "",
  style,
}: {
  rows?: number
  cols?: number
  className?: string
  style?: React.CSSProperties
}) {
  const [lines, setLines] = useState<string[]>([])
  const visible = useRef(true)

  useEffect(() => {
    setLines(Array.from({ length: rows }, () => randLine(cols)))
    const id = setInterval(() => {
      if (!visible.current) return
      setLines((prev) =>
        prev.map((line) => {
          const arr = line.split("")
          for (let k = 0; k < 6; k++) {
            const i = Math.floor(Math.random() * arr.length)
            arr[i] = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          return arr.join("")
        }),
      )
    }, 95)
    const onVis = () => (visible.current = !document.hidden)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      clearInterval(id)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [rows, cols])

  return (
    <pre
      className={`mono pointer-events-none absolute inset-0 overflow-hidden whitespace-pre px-3 py-2 leading-[1.4] select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {lines.join("\n")}
    </pre>
  )
}
