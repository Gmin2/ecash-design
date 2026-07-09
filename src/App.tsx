import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./HomePage"
import { FaqPage } from "./pages/FaqPage"
import { WhatToExpectPage } from "./pages/WhatToExpectPage"
import { SidechainsPage } from "./pages/SidechainsPage"
import { WhyHardforkPage } from "./pages/WhyHardforkPage"
import { BountyPage } from "./pages/BountyPage"
import { DownloadPage } from "./pages/DownloadPage"
import { SocialsPage } from "./pages/SocialsPage"
import { MediaPage } from "./pages/MediaPage"
import { ReadingPage } from "./pages/ReadingPage"
import { EndorsementsPage } from "./pages/EndorsementsPage"
import { BlogPage } from "./pages/BlogPage"
import { SolTokenPage } from "./pages/SolTokenPage"
import { BrandPage } from "./pages/BrandPage"
import { ComingSoon } from "./pages/ComingSoon"
import { ScrollToTop } from "./components/PageShell"
import { useLenis } from "./hooks/useLenis"

function App() {
  useLenis()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/v2" element={<HomePage hero={{ background: "paper", layout: "split" }} />} />
        <Route path="/v3" element={<HomePage hero={{ background: "night", layout: "stacked" }} />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/what-to-expect" element={<WhatToExpectPage />} />
        <Route path="/sidechains" element={<SidechainsPage />} />
        <Route path="/why-hardfork" element={<WhyHardforkPage />} />
        <Route path="/bounty" element={<BountyPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/socials" element={<SocialsPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/endorsements" element={<EndorsementsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/sol-token" element={<SolTokenPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
