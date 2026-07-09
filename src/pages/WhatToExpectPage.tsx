import type { ComponentType } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { Reveal } from "@/components/Reveal"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers, PlusDecorator } from "@/components/primitives"
import { IconArrowRight } from "@/components/icons"
import {
  SnapshotDiagram,
  SafeDiagram,
  PrecedentDiagram,
  PreviewDiagram,
  ReplayDiagram,
} from "@/components/ExpectDiagrams"

type Step = {
  n: number
  title: string
  body: string
  highlight?: boolean
  cta?: { label: string; href: string }
  note?: string
  Diagram: ComponentType
}

const steps: Step[] = [
  {
    n: 1,
    title: "the snapshot",
    body: "at block ~964,000, the bitcoin blockchain is read. every address holding BTC at that moment is credited an equal amount of eCash, automatically, with no action required from you.",
    Diagram: SnapshotDiagram,
  },
  {
    n: 2,
    title: "your BTC is completely safe",
    body: "nothing happens to your existing bitcoin. the fork does not move, modify, or touch your BTC in any way. eCash arrives alongside it as a separate asset, delivered to the same address. you can ignore it, sell it, or hold it.",
    highlight: true,
    Diagram: SafeDiagram,
  },
  {
    n: 3,
    title: "this has happened before",
    body: "bitcoin cash forked from bitcoin in august 2017. every BTC holder received BCH at no cost. BCH briefly hit 15% of bitcoin's market cap and still trades above $500 today. our fork follows the same mechanics: same UTXO set, same addresses, same balances.",
    Diagram: PrecedentDiagram,
  },
  {
    n: 4,
    title: "you can preview it right now",
    body: "the layertwolabs team has working software available today: a full node, wallet, and live signet. you can run the network, explore sidechains, and test transactions before launch day.",
    cta: { label: "download the test software", href: "https://layertwolabs.com/download" },
    highlight: true,
    Diagram: PreviewDiagram,
  },
  {
    n: 5,
    title: "transaction replay & coin splitting",
    body: "in the period just after the fork, a BTC transaction may also broadcast on the eCash network. this is called transaction replay. it is a known side effect of hard forks, and the solution is straightforward.",
    note: "coin splitting is a one-time step performed using the official wallet shortly after the fork. the software handles the separation automatically, no technical knowledge required. once split, your BTC and eCash operate fully independently.",
    Diagram: ReplayDiagram,
  },
]

function StepRow({ step, last }: { step: Step; last: boolean }) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-5 md:grid-cols-[52px_1fr] md:gap-8">
      {/* node + connector */}
      <div className="relative flex justify-center">
        {!last && <span className="absolute bottom-[-56px] top-12 w-px bg-ink/15" aria-hidden="true" />}
        <span
          className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${
            step.highlight
              ? "bg-accent shadow-[0_0_0_6px_rgba(232,168,74,0.18)]"
              : "bg-white ring-1 ring-ink/20"
          }`}
        >
          <span className={`mono text-[13px] tabular-nums ${step.highlight ? "text-ink" : "text-ink/60"}`}>
            {String(step.n).padStart(2, "0")}
          </span>
        </span>
      </div>

      {/* content */}
      <div className="pb-14">
        <div
          className={
            step.highlight
              ? "relative -mt-1 border border-accent/50 bg-accent-fade px-6 py-6 md:px-8"
              : undefined
          }
        >
          {step.highlight && (
            <>
              <PlusDecorator className="left-1/2 top-[3px] -translate-x-1/2" />
              <PlusDecorator className="bottom-[3px] left-1/2 -translate-x-1/2" />
            </>
          )}
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
            <div>
              <h3
                className={`font-display font-medium lowercase tracking-[-0.01em] text-ink ${
                  step.highlight ? "text-[clamp(20px,2.4vw,27px)]" : "pt-2 text-[clamp(19px,2.2vw,25px)]"
                }`}
              >
                {step.title}
              </h3>
              <p className={`mt-3 text-[15px] leading-[1.65] ${step.highlight ? "text-ink/75" : "text-ink/65"}`}>
                {step.body}
              </p>
              {step.cta && (
                <a
                  href={step.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.06em] text-accent transition-colors hover:bg-ink-pure"
                >
                  {step.cta.label}
                  <IconArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
              {step.note && (
                <p className="mt-5 border-l-2 border-accent bg-accent/10 px-5 py-4 text-[14px] leading-[1.6] text-ink/70">
                  {step.note}
                </p>
              )}
            </div>
            <div className="max-lg:max-w-[380px]">
              <step.Diagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhatToExpectPage() {
  return (
    <PageShell>
      <PageHero
        label="what to expect"
        title="before, during, and after"
        subhead="what actually happens around the fork on august 21, 2026, in plain terms."
        pad="px-2 sm:px-8 lg:px-14"
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <div className="px-2 sm:px-8 lg:px-14">
          <div className="py-10 md:py-14">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <StepRow step={s} last={i === steps.length - 1} />
              </Reveal>
            ))}
          </div>

          <div className="pb-16 md:pb-24">
            <NextLinks
              links={[
                { name: "faq", href: "/faq", note: "common questions, answered" },
                { name: "why hardfork", href: "/why-hardfork", note: "the case for forking bitcoin" },
                { name: "download", href: "/download", note: "bitwindow + the eCash wallet" },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
