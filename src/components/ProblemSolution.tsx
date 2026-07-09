import { motion } from "motion/react"
import { ProblemIllustration } from "./ProblemIllustration"
import { SolutionStack } from "./SolutionStack"
import { BracketHeading, EdgeRulers, FramedBand, SectionLabel } from "./primitives"

const blurIn = {
  initial: { opacity: 0, filter: "blur(8px)", y: 22 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
}

export function ProblemSolution() {
  return (
    <section className="bg-bg">
      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />
        {/* problem */}
        <SectionLabel>problem</SectionLabel>
        <div className="py-14 md:py-20">
          <motion.h2
            {...blurIn}
            className="max-w-4xl font-display text-[clamp(30px,4.6vw,58px)] font-medium lowercase leading-[1.06] tracking-[-0.02em]"
          >
            bitcoin has ossified. where is the next soft fork? nowhere in sight.
          </motion.h2>

          <div className="mt-12">
            <ProblemIllustration />
          </div>
        </div>

        {/* solution */}
        <SectionLabel highlight>solution</SectionLabel>
        <div id="solution" className="scroll-mt-20 py-12 md:py-16">
          <FramedBand className="px-6 py-14 md:px-12 md:py-16">
            <motion.div {...blurIn}>
              <BracketHeading className="lowercase text-[clamp(30px,4.6vw,58px)]">
                &nbsp;drivechains are ready&nbsp;
              </BracketHeading>
            </motion.div>
            <motion.p
              {...blurIn}
              transition={{ ...blurIn.transition, delay: 0.1 }}
              className="mt-6 max-w-2xl font-display text-[clamp(17px,2vw,22px)] leading-[1.4] text-ink/80"
            >
              eCash is a hard fork that activates BIP 300/301: sidechains for
              everything BTC cant do, without changing BTC itself.
            </motion.p>

            <div className="mt-12">
              <SolutionStack />
            </div>
          </FramedBand>
        </div>
      </div>
    </section>
  )
}
