import { LogoMark } from "./Logo"
import { Countdown } from "./Countdown"
import { Button, EdgeRulers } from "./primitives"

function Barcode() {
  const bars = "13214123412132141231421321341213".split("")
  return (
    <div className="flex h-9 items-stretch gap-[2px]" aria-hidden="true">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-ink"
          style={{ width: `${Number(w)}px`, opacity: i % 4 === 0 ? 0.5 : 1 }}
        />
      ))}
    </div>
  )
}

function Badge() {
  return (
    <div className="inline-flex items-center gap-5 border border-ink px-5 py-3">
      <span className="flex items-center gap-2">
        <LogoMark className="h-7 w-7 object-contain" tone="ink" />
        <span className="font-display text-3xl font-medium leading-none tracking-tight">
          eCash
        </span>
        <span className="mono self-end pb-1 text-[10px] tracking-[0.15em] text-ink/70">
          a fork of BTC
        </span>
      </span>
      <span className="hidden h-9 w-px bg-ink/30 sm:block" />
      <span className="hidden sm:block">
        <Barcode />
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative bg-accent pt-16">
      <EdgeRulers tone="dark" />
      <div className="mx-auto max-w-[1126px] px-6 pb-12 pt-12">
        <Countdown />

        <div className="mt-12">
          <Badge />
        </div>

        <h1 className="mt-7 font-display text-[clamp(36px,6vw,80px)] font-medium lowercase leading-[1.0] tracking-[-0.03em]">
          <span className="text-ink/80">[</span> a new hard fork of bitcoin{" "}
          <span className="text-ink/80">]</span>
        </h1>

        {/* the one-line promise, plain */}
        <p className="mt-6 max-w-2xl font-display text-[clamp(18px,2.2vw,26px)] leading-[1.35] tracking-[-0.01em] text-ink">
          before: 1 BTC. after fork: 1 BTC + 1 eCash. your BTC stays yours.
        </p>

        <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
          <div className="mono max-w-md space-y-5 text-[13px] uppercase leading-[1.7] tracking-[0.04em] text-ink">
            <p>bitcoin can still improve. drivechains are ready. eCash ships them.</p>
            <p>
              every BTC address gets eCash 1:1 at block ~964,000. no claim, no form.
              run a node, you have it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href="#run-a-node" variant="solid">
              download bitwindow
            </Button>
            <Button href="#what-to-expect" variant="outline">
              what to expect
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
