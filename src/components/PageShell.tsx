import { useEffect, type ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { SiteHeader } from "./SiteHeader"
import { Footer } from "./Footer"
import { Reveal } from "./Reveal"
import { BracketHeading, EdgeRulers, SectionLabel } from "./primitives"

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}

// standard page opener: section label + bracketed title + optional subhead
export function PageHero({
  label,
  title,
  subhead,
  pad = "",
  center = false,
}: {
  label: string
  title: string
  subhead?: string
  pad?: string
  center?: boolean
}) {
  return (
    <div className="relative mx-auto max-w-[1126px] px-6">
      <EdgeRulers tone="dark" />
      <div className={pad}>
        <SectionLabel>{label}</SectionLabel>
        <div className={`pb-4 pt-12 md:pt-16 ${center ? "text-center" : ""}`}>
          <Reveal>
            <BracketHeading className="lowercase text-[clamp(32px,5vw,64px)]">
              &nbsp;{title}&nbsp;
            </BracketHeading>
          </Reveal>
          {subhead && (
            <Reveal delay={0.08} className={center ? "flex justify-center" : ""}>
              <p
                className={`mt-6 max-w-2xl font-display text-[clamp(16px,1.9vw,21px)] leading-[1.45] text-ink/70 ${
                  center ? "text-center text-balance" : ""
                }`}
              >
                {subhead}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  )
}
