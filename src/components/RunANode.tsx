import { Reveal } from "./Reveal"
import { IconArrowRight, IconDownload } from "./icons"
import { BracketHeading, EdgeRulers, FramedBand, SectionLabel } from "./primitives"

const platforms = [
  { name: "macOS", note: "apple silicon + intel" },
  { name: "Windows", note: "10 and 11" },
  { name: "Linux", note: "appimage + deb" },
]

export function RunANode() {
  return (
    <section id="run-a-node" className="scroll-mt-20 bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        <SectionLabel>run a node</SectionLabel>
        <div className="py-12 md:py-16">
          <FramedBand className="px-6 py-14 md:px-12 md:py-16">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <Reveal>
                <div>
                  <BracketHeading className="lowercase text-[clamp(28px,4.2vw,52px)]">
                    &nbsp;download bitwindow&nbsp;
                  </BracketHeading>
                  <p className="mt-6 max-w-md font-display text-[clamp(16px,1.9vw,20px)] leading-[1.45] text-ink/75">
                    run the eCash activation client before block ~964,000. it
                    syncs the node, checks for updates, and installs in one click.
                    no account, no form.
                  </p>
                  <p className="mono mt-6 text-[12px] uppercase tracking-[0.1em] text-ink/45">
                    run a node, you have eCash 1:1
                  </p>
                </div>
              </Reveal>

              <div className="flex flex-col gap-3">
                {platforms.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.08}>
                    <a
                      href="#"
                      className="group flex items-center gap-4 border border-ink/15 bg-white px-5 py-4 transition-colors hover:border-ink/40"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-accent text-ink">
                        <IconDownload className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-display text-[17px] font-medium text-ink">
                          {p.name}
                        </span>
                        <span className="mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
                          {p.note}
                        </span>
                      </span>
                      <IconArrowRight className="ml-auto h-4 w-4 text-ink/40 transition-colors group-hover:text-accent-deep" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </FramedBand>
        </div>
      </div>
    </section>
  )
}
