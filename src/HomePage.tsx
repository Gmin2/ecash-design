import { SiteHeader } from "./components/SiteHeader"
import { Hero } from "./components/Hero"
import { StatBand } from "./components/StatBand"
import { PegSection } from "./components/PegCoins"
import { ProblemSolution } from "./components/ProblemSolution"
import { WhatToExpect } from "./components/WhatToExpect"
import { RunANode } from "./components/RunANode"
import { WhyHardfork } from "./components/WhyHardfork"
import { Media } from "./components/Media"
import { Faq } from "./components/Faq"
import { FinalCta } from "./components/FinalCta"
import { Footer } from "./components/Footer"

export function HomePage({
  hero,
}: {
  hero?: { background?: "gold" | "paper" | "night"; layout?: "stacked" | "split" }
} = {}) {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero {...hero} />
        <StatBand />
        <PegSection />
        <ProblemSolution />
        <WhatToExpect />
        <RunANode />
        <WhyHardfork />
        <Media />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
