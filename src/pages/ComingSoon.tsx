import { Link, useLocation } from "react-router-dom"
import { PageHero, PageShell } from "@/components/PageShell"
import { EdgeRulers } from "@/components/primitives"

export function ComingSoon() {
  const { pathname } = useLocation()
  const name = pathname.replace("/", "").replace(/-/g, " ") || "this page"
  return (
    <PageShell>
      <PageHero label="in progress" title={name} subhead="this page is being rebuilt. check back shortly." />
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <div className="pb-24 pt-4">
          <Link to="/" className="mono text-[13px] text-accent-deep hover:text-ink">
            ← back home
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
