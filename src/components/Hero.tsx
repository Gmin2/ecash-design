import { LogoMark } from "./Logo"
import { Countdown } from "./Countdown"
import { Button, EdgeRulers } from "./primitives"

function Barcode({ dark }: { dark: boolean }) {
  const bars = "13214123412132141231421321341213".split("")
  return (
    <div className="flex h-9 items-stretch gap-[2px]" aria-hidden="true">
      {bars.map((w, i) => (
        <span
          key={i}
          className={dark ? "bg-paper" : "bg-ink"}
          style={{ width: `${Number(w)}px`, opacity: i % 4 === 0 ? 0.5 : 1 }}
        />
      ))}
    </div>
  )
}

function Badge({ dark }: { dark: boolean }) {
  return (
    <div className={`inline-flex items-center gap-5 border px-5 py-3 ${dark ? "border-paper/50 text-paper" : "border-ink text-ink"}`}>
      <span className="flex items-center gap-2">
        <LogoMark className="h-7 w-7 object-contain" tone={dark ? "gold" : "ink"} />
        <span className="font-display text-3xl font-medium leading-none tracking-tight">
          eCash
        </span>
        <span className={`mono self-end pb-1 text-[10px] tracking-[0.15em] ${dark ? "text-paper/60" : "text-ink/70"}`}>
          a fork of BTC
        </span>
      </span>
      <span className={`hidden h-9 w-px sm:block ${dark ? "bg-paper/30" : "bg-ink/30"}`} />
      <span className="hidden sm:block">
        <Barcode dark={dark} />
      </span>
    </div>
  )
}

type HeroVariant = {
  background?: "gold" | "paper" | "night"
  layout?: "stacked" | "split"
}

export function Hero({ background: bg = "gold", layout: lay = "stacked" }: HeroVariant = {}) {
  const dark = bg === "night"
  const paper = bg === "paper"
  const sectionBg = bg === "gold" ? "bg-accent" : bg === "night" ? "bg-night" : "bg-bg"
  const inkCls = dark ? "text-paper" : "text-ink"
  const softCls = dark ? "text-paper/60" : "text-ink"
  const bracketCls = dark ? "text-accent" : paper ? "text-accent-deep" : "text-ink/80"

  const headline = (
    <h1
      className={`font-display font-medium lowercase leading-[1.0] tracking-[-0.03em] ${inkCls}`}
      style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
    >
      <span className={bracketCls}>[ </span>
      a new hard fork of bitcoin
      <span className={bracketCls}> ]</span>
    </h1>
  )

  const promise = (
    <p className={`mt-6 max-w-2xl font-display text-[clamp(18px,2.2vw,26px)] leading-[1.35] tracking-[-0.01em] ${inkCls}`}>
      before: 1 BTC. after fork: 1 BTC + 1 eCash. your BTC stays yours.
    </p>
  )

  const monoCopy = (
    <div className={`mono max-w-md space-y-5 text-[13px] uppercase leading-[1.7] tracking-[0.04em] ${softCls}`}>
      <p>bitcoin can still improve. drivechains are ready. eCash ships them.</p>
      <p>
        every BTC address gets eCash 1:1 at block ~964,000. no claim, no form.
        run a node, you have it.
      </p>
    </div>
  )

  const ctas = (
    <div className="flex flex-wrap gap-3">
      <Button href="#run-a-node" variant={dark ? "pill" : "solid"}>
        download bitwindow
      </Button>
      <Button
        href="#what-to-expect"
        variant="outline"
        className={dark ? "border-paper/40 text-paper hover:bg-paper hover:text-night" : ""}
      >
        what to expect
      </Button>
    </div>
  )

  return (
    <section className={`relative ${sectionBg} pt-16 ${paper ? "border-b border-hairline" : ""}`}>
      <EdgeRulers tone={dark ? "light" : "dark"} />

      {lay === "stacked" ? (
        <div className="mx-auto max-w-[1126px] px-6 pb-12 pt-12">
          <Countdown />
          <div className="mt-12">
            <Badge dark={dark} />
          </div>
          <div className="mt-7">{headline}</div>
          {promise}
          <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
            {monoCopy}
            <div className="flex md:justify-end">{ctas}</div>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1126px] items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="mb-8">
              <Badge dark={dark} />
            </div>
            {headline}
            {promise}
            <div className="mt-8">{monoCopy}</div>
            <div className="mt-10">{ctas}</div>
          </div>
          <Countdown />
        </div>
      )}
    </section>
  )
}
