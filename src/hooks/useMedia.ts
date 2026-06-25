import { useEffect, useState } from "react"

export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(true)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = () => setMatches(mql.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [query])

  return matches
}
