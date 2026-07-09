import { useEffect, useState, type ReactNode } from "react"
import { PageHero, PageShell } from "@/components/PageShell"
import { NextLinks } from "@/components/NextLinks"
import { EdgeRulers } from "@/components/primitives"
import { TocRail } from "@/components/TocRail"
import { ForkDiagram } from "@/components/ForkDiagram"

const toc = [
  { id: "altcoin", num: "01", label: "an altcoin?" },
  { id: "perfect", num: "02", label: "isn't bitcoin perfect?" },
  { id: "dont-like", num: "03", label: "“i don't like this”" },
  { id: "defeat", num: "04", label: "can you defeat BTC?" },
  { id: "changes", num: "05", label: "the technical changes" },
  { id: "satoshi", num: "06", label: "satoshi's coins" },
  { id: "bch", num: "07", label: "the BCH precedent" },
  { id: "dethrone", num: "08", label: "how to dethrone BTC" },
  { id: "copied", num: "09", label: "what if BTC copies it?" },
  { id: "spring", num: "10", label: "coiling the spring" },
  { id: "number-one", num: "11", label: "always #1?" },
  { id: "ethereum", num: "11b", label: "ethereum & the altcoins" },
  { id: "stop", num: "12", label: "what would stop this?" },
  { id: "tech", num: "13", label: "bitvm / rollups / new tech" },
  { id: "moment", num: "14", label: "“the moment has passed”" },
]

function P({ children }: { children: ReactNode }) {
  return <p className="max-w-[62ch] text-[16px] leading-[1.75] text-ink/75">{children}</p>
}

function Ol({ children }: { children: ReactNode }) {
  return (
    <ol className="max-w-[62ch] list-decimal space-y-2.5 pl-5 text-[16px] leading-[1.7] text-ink/75 marker:font-medium marker:text-accent-deep">
      {children}
    </ol>
  )
}

function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="max-w-[62ch] list-disc space-y-2.5 pl-5 text-[16px] leading-[1.7] text-ink/75 marker:text-accent-deep">
      {children}
    </ul>
  )
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-2 list-[circle] space-y-1.5 pl-5 text-[15px] text-ink/65 marker:text-ink/30">
      {children}
    </ul>
  )
}

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string
  num: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} data-msec className="scroll-mt-28 border-t border-hairline py-12 first:border-t-0 first:pt-4 md:py-14">
      <div className="flex items-baseline gap-4">
        <span className="mono shrink-0 text-[13px] tabular-nums text-accent-deep">{num}</span>
        <h2 className="text-balance font-display text-[clamp(20px,2.4vw,26px)] font-medium leading-snug tracking-[-0.01em] text-ink">
          {title}
        </h2>
      </div>
      <div className="mt-6 space-y-4 md:pl-9">{children}</div>
    </section>
  )
}

const versus = [
  { metric: "age", ln: "10+ years", dc: "10+ years" },
  {
    metric: "how many devs?",
    ln: "50+ full time, 100+ hobbyists, 5+ generational-talent geniuses, 5+ big SF co-founders",
    dc: "2 people, working casually in their spare time; eventually maybe 10–12 more",
  },
  { metric: "money invested", ln: "much more than $100 million", dc: "less than $4 million" },
  {
    metric: "attention / praise / media",
    ln: "enormous, fawning support — a full-blown 10+ year propaganda campaign",
    dc: "minimal amount",
  },
  {
    metric: "demo working for 8 billion users?",
    ln: "no — not possible with Lightning",
    dc: "yes — and we already have",
  },
  { metric: "ultimately going to work?", ln: "no, it will not", dc: "yes, it might" },
]

export function WhyHardforkPage() {
  const [active, setActive] = useState("altcoin")

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-15% 0px -75% 0px" },
    )
    document.querySelectorAll("[data-msec]").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <PageShell>
      <PageHero
        label="why hardfork"
        title="a new hard fork of bitcoin"
        subhead="why are we doing this project?"
        pad="px-2 sm:px-8 lg:px-14"
      />

      <div className="relative mx-auto max-w-[1126px] px-6">
        <EdgeRulers tone="dark" />

        <div className="px-2 sm:px-8 lg:px-14">
        {/* pull quote + intro */}
        <div className="max-w-[68ch] pb-6 pt-4">
          <p className="mono border-l-2 border-accent pl-4 text-[13px] uppercase tracking-[0.1em] text-ink/55">
            iron sharpens iron — proverbs 27:17
          </p>
          <div className="mt-10 space-y-5">
            <p className="text-balance font-display text-[clamp(19px,2.3vw,25px)] font-medium leading-[1.4] text-ink">
              The time has come for the Bitcoin Community to revisit the "hard fork".
            </p>
            <P>
              The upside is enormous: global scalability, privacy, competition, rapid
              improvement and adoption. In fact, it may be a matter of life or death, for
              Bitcoin.
            </P>
            <P>The downside is small: some drama, plus every Bitcoiner gets some free money.</P>
          </div>
        </div>

        {/* the fork, drawn */}
        <div className="border-y border-hairline py-8 md:py-10">
          <ForkDiagram className="mx-auto max-w-[950px]" />
        </div>

        <div className="grid gap-12 py-10 lg:grid-cols-[230px_1fr] lg:gap-16">
          {/* sticky index */}
          <aside className="max-lg:hidden">
            <TocRail title="the objections" items={toc} activeId={active} />
          </aside>

          {/* the manifesto, verbatim */}
          <div className="min-w-0 max-w-[700px]">
            <Section id="altcoin" num="01" title="An Altcoin? You are leaving Bitcoin?!">
              <P>I would prefer not to.</P>
              <P>
                But it's not up to me. Other people are damaging the Bitcoin project. Core
                developers have become timid, self-interested, lazy, and corrupt. Miners
                have abdicated their duty, to maximize their revenues (and the utility of
                the coin). Bitcoin culture has many entrenched errors, and is probably
                unfixable at this point.
              </P>
            </Section>

            <Section id="perfect" num="02" title="Errors? Isn't Bitcoin perfect? Nothing can stop Bitcoin!">
              <P>I hope Bitcoin succeeds. I plan to hold my BTC — and so should you.</P>
              <P>
                If Bitcoin is unstoppable, then eCash is nothing to worry about. Just stop
                reading now.
              </P>
              <P>
                Alternatively, though — if I am correct [that Bitcoin is not perfect], then
                it would be wise to prepare. What's our backup plan? It is eCash.
              </P>
              <P>
                Even if Bitcoin is perfect now — will it remain perfect? New ideas are
                invented all the time! (After all, there was a time before you had ever
                heard of Bitcoin.) And there's no limit to how large a mistake the Bitcoin
                Community might someday make.
              </P>
              <P>
                Ironically, the "Bitcoin is perfect" belief is likely to be what finally
                kills Bitcoin. Success often leads to complacency, and failure. The Titanic
                was hailed as "unsinkable" — it sank on its first voyage. The book
                "Innovator's Dilemma" details the history of bankruptcies in tech — it is
                usually easier to start a new company, vs fix an old one.
              </P>
            </Section>

            <Section id="dont-like" num="03" title="I don't like what you are doing, becau–">
              <P>Let me stop you right there.</P>
              <P>
                You are getting free eCash... so sell it! Use it to get more BTC. Do that,
                instead of complaining.
              </P>
              <P>You can think of this project as "free number-go-up" on your BTC. You're welcome!</P>
            </Section>

            <Section id="defeat" num="04" title="You really think a new coin can defeat Bitcoin?">
              <P>Yes. It is at least 5% likely.</P>
              <P>
                Even at such a "low" chance of success, eCash is still worth trying. The
                Bitcoin project is too important, to let today's idiots screw it up.
              </P>
              <P>
                We need competition — a red team / blue team style competition. That is
                what is healthy for BTC.
              </P>
            </Section>

            <Section
              id="changes"
              num="05"
              title="Why is a hard fork necessary? Please describe each technical change you are making."
            >
              <P>The hard fork is NOT needed for any technical reason.</P>
              <P>
                It is not the BTC code that is broken — it is the BTC community. We need to
                bet against that community. So — we need a new coin.
              </P>
              <P>Our L1 is a clone of Bitcoin Core, with these changes:</P>
              <Ol>
                <li>
                  Difficulty Reset – A one-time "special difficulty adjustment", down to the
                  minimum difficulty, on the fork date.
                </li>
                <li>
                  Satoshi Half-Airdrop – We give half of Satoshi's "patoshi" coins (about
                  550k of 1.1M) – to our investors and supporters.
                </li>
                <li>
                  Txn Replay Control – We allow our txns to have an optional "extra byte" –
                  this intentionally mangles the TxID, allowing users to opt in/out of
                  "transaction replay".
                </li>
                <li>
                  The Name – Superficial changes (the name, the "network magic", seed node
                  IPs, etc).
                </li>
              </Ol>
              <P>
                Furthermore, we plan to immediately adopt two soft forks (that BTC is
                unwilling to adopt):
              </P>
              <Ol>
                <li>Reduce blocksize by 10x – i.e., from 4 MB to 400 kb.</li>
                <li>Activate BIPs 300/301.</li>
              </Ol>
              <P>Both of these can be done via "CUSF" (i.e., without changing any lines of code).</P>
              <P>
                We will intentionally keep our L1 codebase identical to Bitcoin Core for as
                long as possible — ideally forever. By doing so, we automatically gain
                access to CVE fixes, and new Core features (without doing any work). We do
                not want to compete with Core, on L1.
              </P>
            </Section>

            <Section
              id="satoshi"
              num="06"
              title="Aha! You are taking Satoshi's coins! That is why you are doing this! Thief!!"
            >
              <P>Well, again:</P>
              <Ul>
                <li>We'd prefer not to do this, at all.</li>
                <li>
                  If BTC activates BIPs 300/301, we will abandon this project (unless the
                  eCash marketcap is higher than BTC, at that time).
                </li>
              </Ul>
              <P>And, the facts are:</P>
              <Ul>
                <li>
                  We are "stealing" zero of Satoshi's BTC. (We do not have the power to take
                  BTC.)
                </li>
                <li>In fact, we are giving Satoshi free eCash.</li>
                <li>
                  Admittedly, in a hypothetical future scenario where eCash replaces BTC,
                  then Satoshi would have fewer coins — but, in that world, the eCash
                  marketcap almost certainly exceeds today's BTC marketcap, by more than 2x.
                  So, the value of Satoshi's holdings will have gone up (from where it is
                  today), due to our actions.
                </li>
                <li>
                  In fact, in that scenario, it could be argued that we rescued Satoshi's
                  net worth, from $0.
                </li>
                <li>
                  Our project contains a zk-snark privacy L2 – this might be the only safe
                  way for Satoshi to access his coins.
                </li>
              </Ul>
              <P>On top of that:</P>
              <Ul>
                <li>
                  Innovators are certainly entitled to make some return on their risk (at
                  the expense of their haters).
                </li>
                <li>
                  It is immoral for Bip300-supporters and Bip300-haters to be treated
                  equally, in this case.
                </li>
              </Ul>
              <P>And:</P>
              <Ul>
                <li>
                  We intentionally want to split the community, and drive away the
                  overly-conservative faction. (Those are the "bad guys" who are killing
                  BTC.)
                </li>
                <li>
                  We want new people: open-minded, entrepreneurial, risk-taking,
                  contrarians. We want to shake things up, and prioritize the new over the
                  old.
                </li>
              </Ul>
              <P>Finally:</P>
              <Ul>
                <li>
                  Lack of competition is killing the BTC project. It is an existential risk,
                  that warrants bold action.
                </li>
                <li>If you don't like it — then sell. (See answer #3.)</li>
              </Ul>
            </Section>

            <Section
              id="bch"
              num="07"
              title="Doesn't the failure of Bitcoin Cash (BCH) prove that hard forks always fail?"
            >
              <P>
                Bitcoin Cash launched at a sky-high price (of 15% BTC). It "flippened"
                Ethereum for one day, temporarily becoming the #1 Altcoin.
              </P>
              <P>
                If our fork repeated that 15% performance, it would launch at $15,000/coin
                and linger in that area for about 6 months.
              </P>
              <P>
                BCH had many strengths: the support of large investors (such as Roger Ver),
                key resources (such as the "bitcoin.com" domain), and a pre-assembled
                community of largeblockers.
              </P>
              <P>
                But those are easy to recreate. We have our own ".com", we have our own
                large investors, and — thanks to the hard fork — we replicate the #1 crypto
                community in the world (the Bitcoin community). The crypto community has
                already blazed the trail – everything from community management, to forum
                software, to regulatory clarity.
              </P>
              <P>
                More importantly, Bitcoin Cash suffered from a long list of fundamental
                problems. Each of these was debilitating — and each is also easily avoided.
                We will avoid all these problems.
              </P>
              <P>
                What if we share the exact fate of BCH? Today, BCH is worth over ten
                billion dollars (over $500/coin). Not bad... for a "failure"!
              </P>
            </Section>

            <Section id="dethrone" num="08" title="How do you plan to dethrone BTC?">
              <P>It will be difficult. Here are the general principles:</P>
              <Ol>
                <li>
                  Do not compete with BTC where it is strong.
                  <Sub>
                    <li>Keep L1 identical.</li>
                    <li>Keep the fixed supply, 21 million, proof of work, etc.</li>
                    <li>Let BTC do the "leg work" of educating the masses.</li>
                    <li>Keep all wallet software, block-explorers, etc identical.</li>
                    <li>
                      This lowers switching costs, maintenance costs, and eliminates the
                      need for cumbersome explanations.
                    </li>
                  </Sub>
                </li>
                <li>
                  Use tech to guarantee liquidity.
                  <Sub>
                    <li>Use cryptographic swaps to trade eCash for BTC.</li>
                    <li>
                      BTC is now an on-ramp for eCash! Therefore, any BTC liquidity also
                      becomes eCash liquidity.
                    </li>
                    <li>
                      Exchanges (in practice) must list eCash. (No need to pay exorbitant
                      listing fees.)
                    </li>
                    <li>
                      This also flips the "all privacy coins will be de-listed" narrative –
                      since you can't delist eCash (a coin with a private L2) without
                      de-listing BTC.
                    </li>
                  </Sub>
                </li>
                <li>
                  Focus on what BTC can't do:
                  <Sub>
                    <li>
                      Tech innovation / tech competition — currently roadblocked by Core /
                      prestige economy.
                    </li>
                    <li>Privacy — currently roadblocked by Saylor / corporate interests.</li>
                    <li>
                      Mining Revenue — currently roadblocked by non-mined L2s; superstitions
                      about mining.
                    </li>
                    <li>Fun — currently roadblocked by Bitcoin twitter.</li>
                    <li>
                      Specific use-cases (BitNames, BitAssets, Coin-Swaps, Prediction
                      Markets) — currently roadblocked by maxi culture.
                    </li>
                  </Sub>
                </li>
                <li>
                  Focus on users.
                  <Sub>
                    <li>Define users as: those who pay transaction fees to miners.</li>
                    <li>
                      In contrast, non-users are: developers, miners, investors, and media
                      personalities.
                    </li>
                    <li>
                      In the long run, users win. Non-users are parasites who must be kept
                      at bay (when necessary).
                    </li>
                  </Sub>
                </li>
                <li>
                  Sabotage BTC, by promoting "degrowth" policies such as...
                  <Sub>
                    <li>
                      Complacency narratives: ossification, "Bitcoin has already won",
                      "Don't break bitcoin".
                    </li>
                    <li>Failed L2 concepts, such as Lightning.</li>
                    <li>Distractions, such as Covenants.</li>
                    <li>
                      Anti-node, anti-sovereignty concepts, such as: "federated" sidechains,
                      Fedi, Liquid, etc.
                    </li>
                    <li>
                      Wishful thinking, and other "braindead" advocacy. Stock-to-flow.
                      "Carnivore-style" maximalism, and other cult-like "lifestyle"
                      nonsense.
                    </li>
                    <li>
                      Toxicity, and pointless misanthropy. "We never wanted these users,
                      anyway." "You'll come crawling back to Bitcoin, you'll see!"
                    </li>
                  </Sub>
                </li>
                <li>
                  Grow the new community.
                  <Sub>
                    <li>We can only succeed if we "recruit" people.</li>
                    <li>
                      We need our own "Andreas Antonopoulos", Roger Ver, Hal Finney, etc.
                      (We also need our own BitPay, Blockstream, Microstrategy, etc.)
                    </li>
                    <li>
                      We also need new disputes. For example, a new "Mike Hearn vs Greg
                      Maxwell". But this time around, they will settle their dispute NOT
                      with a new Altcoin, but with a new L2 on the same eCash network.
                    </li>
                    <li>
                      Prioritize growth. Elevate those who promote user-adoption, and shame
                      those who hold adoption back.
                    </li>
                  </Sub>
                </li>
              </Ol>
              <P>
                A lot of it will happen automatically. Bitcoin has many serious errors,
                which its community is failing to address. When the new coin launches,
                millions of stakeholders will be invited to form an opinion. Among the
                opinionated, coins will be bought and sold — and the new owners will argue
                their case (on Twitter and elsewhere). A bright light will shine upon these
                errors.
              </P>
              <P>
                It is these errors which create our investment opportunity. (Not the
                brilliance of Bip300.) If Bitcoin were perfect, then no "plan for surpassing
                BTC" could possibly succeed. But if instead, BTC is permanently
                disadvantaged due to unfixable cultural errors, and if there is a way of
                getting everyone to notice this, then there will (eventually) be a stampede
                to abandon BTC for the nearest viable alternative.
              </P>
            </Section>

            <Section id="copied" num="09" title="If eCash succeeds, won't BTC copy it? Then what?">
              <P>Indeed – this is a big risk!</P>
              <P>We could be right about everything — and eCash might still go to zero.</P>
              <P>
                Because: the more success we have, the more attention we will get. If we
                are too persuasive too early on, then the BTC community may activate Bip300
                after all. BTC will then crush eCash with its superior network effects. And
                we will lose.
              </P>
              <P>So, it's a Catch-22: "lose if you fail; lose if you succeed".</P>
              <P>
                Actually, it is even worse than that! Since winning is impossible... why
                would anyone invest? They would not. So our project will have no effect on
                the world (even if we were right about everything).
              </P>
              <P>This is a tricky problem to solve... but there are solutions:</P>
              <Ol>
                <li>
                  BTC is more rotten than people realize – and much of this rot is cultural
                  (which is not easy to change).
                  <Sub>
                    <li>
                      In particular, there is a whole "ossification" coalition of Bitcoin,
                      and an "anti-drivechain" coalition. Both are moderately influential.
                      Both will have their reputations damaged, if they have to walk back
                      their anti-drivechain comments. So they will fight tooth-and-nail to
                      keep drivechain away from BTC.
                    </li>
                    <li>
                      Bitcoin has (in large part) ossified already. Where is the next soft
                      fork? (Nowhere in sight.)
                    </li>
                  </Sub>
                </li>
                <li>
                  Different people learn at different rates.
                  <Sub>
                    <li>
                      So, when a person learns [that eCash is better than BTC], they will be
                      faced with a choice: [1] jump ship immediately (and be the first into
                      a new, winning trade); or [2] wait patiently and try to convince
                      others. But, on any single day, only a tiny minority of people will be
                      in the [2] category.
                    </li>
                    <li>
                      And they have to contend not only with [1] the difficulty of
                      persuading others, but also [2] the risk that those others will
                      themselves jump ship (instead of persuade).
                    </li>
                    <li>
                      Everyone who jumps ship will then have an incentive to delay
                      drivechain's adoption on BTC – or even to spread misinformation about
                      drivechain.
                    </li>
                  </Sub>
                </li>
                <li>
                  BTC and eCash share a mining algorithm (Sha256d). Thus, in the short run,
                  a sudden increase in the blockreward of one coin will starve its rival of
                  hashrate.
                  <Sub>
                    <li>
                      So, in the early days (while the eCash marketcap is small), "most
                      people" will be skeptical that eCash is better. The risk [of BTC
                      copying eCash] will be low.
                    </li>
                    <li>
                      But afterwards (as the eCash marketcap rises), mining the BTC
                      blockchain might no longer be possible. So it may be too late [for BTC
                      to copy eCash].
                    </li>
                    <li>
                      Even if the eCash marketcap is flat – if eCash total transaction fees
                      rise exponentially, this would also starve BTC of hashrate.
                    </li>
                  </Sub>
                </li>
              </Ol>
              <P>So, the strategies are:</P>
              <Ol>
                <li>
                  Brain drain the smart, creative people out of BTC. Abandon BTC to the
                  crazies, and let them destroy it.
                </li>
                <li>Pursue a goal of maximizing the long run total transaction fees paid, per block.</li>
                <li>
                  "Flip" BTC, via two phases: "Coiling the spring" (low marketcap phase,
                  prepare/strategize with early adopters) and "Unleashing the spring"
                  (marketcap surges upward, attempting to take the #1 spot).
                </li>
              </Ol>
              <P>
                It will not be easy. But it is possible. So, investors should be willing to
                join us – at some price. This resolves the Catch-22.
              </P>
            </Section>

            <Section id="spring" num="10" title="Can you elaborate on &#8220;coiling the spring&#8221;?">
              <P>When network effects are strong, how can you dethrone a larger rival? In two phases:</P>
              <Ol>
                <li>
                  "Coiling the spring" – In this phase, we purposefully de-emphasize
                  marketing, hype, and politics – to the point of self-sabotage. We gather
                  evidence, and "stress test" our ideas by trying to falsify them. We are
                  pure truth-seeking; zero teamwork and growth. Pure scout; zero soldier.
                  Pure mistake-theorizing; zero conflict-mentality. We avoid politics – and,
                  in fact, we allow the sociopaths and parasites to have breathing room, to
                  hopefully trick them into coming "out in the open" – so that we may
                  identify them, and study them, before they become suspicious of us.
                </li>
                <li>
                  "Unleashing the spring" – In this phase, we restore politics [and hype and
                  marketing] to their rightful places. Since our idea has been improving
                  objectively throughout phase 1, it is (hopefully) now much better. Thus it
                  creates an opportunity for new influencers, promoters, and
                  politician-types to "team up" with the newer, better idea. They have two
                  advantages: [1] they can emulate their BTC-predecessors; and [2] they have
                  a better fundamental idea to work with.
                </li>
              </Ol>
              <P>Ideally, by Phase 2, we have paved the way for FAST "viral" growth.</P>
              <P>
                That is the only way a new coin can defeat Bitcoin. Early on, it must
                attract supporters who expect future fast growth; later, the fast growth
                must be fast enough to topple the #1 project before it can react.
              </P>
            </Section>

            <Section id="number-one" num="11" title="Bitcoin is #1. Always has been – always will be. You can't win!">
              <P>Bitcoin has been #1 – mostly because of low-quality competitors.</P>
              <P>Most Altcoins are pure junk.</P>
              <P>
                Many have huge premines. Some have 100% premines: Ripple, Stellar, NXT,
                Tron, and SHIB. Others used their genesis block to "distribute to ICO
                investors" – which is [basically] equivalent to a "100% premine, that is all
                sold instantly". These include: ADA, EOS, Aptos, and AVAX. Solana had a 50%
                pre-mine.
              </P>
              <P>
                High pre-mines are bad, because they limit growth – this kills the project.
                It caps growth in three ways: [1] it leaves too many people out of the
                initial coalition, [2] it gives too many coins (as a % of total coins) to
                the people in the coalition (which is off-putting to those of us who must
                join later), and [3] it invites users to make their own new high-premine
                coins (favoring themselves, this time). All of this motivates newcomers to
                join a coin (or create one), instead of join with the existing coin.
              </P>
              <P>
                A premine is also terrible, because none of the Altcoins are ever quite
                finished (nor is Bitcoin). This introduces chaos to the project, as the
                original founders quit, retire, or are forced out — or various "committees"
                and foundations appear, to "guide development". The project drags on, due to
                the realities of software development, until morale collapses and the
                project is abandoned.
              </P>
              <P>
                In contrast, Bitcoin took a more reasonable path: 0% premine at genesis,
                87.5% of the coins released continuously over 12 years. This punishes
                latecomers appropriately, but not so much that they leave the coalition.
                The Bitcoin UTXO set (unlike its Altcoin counterparts) has "moral glue"
                holding it together – those who bought Bitcoin partly embrace a shared
                vision. (In Bitcoin's case: a world without the banks.) It is a team
                effort.
              </P>
              <P>
                A "hard fork" preserves this UTXO set. This automatically puts it in a
                different category.
              </P>
              <P>BCH we have already discussed (in question 7).</P>
              <P>
                BSV is a fork of BCH (not BTC), and its litigious and ridiculous founder
                has speedily driven away all reasonable people. The other forks
                ("BitcoinGold", "BitcoinDiamond", etc.) are frivolities. They were not
                legitimate competitors to BTC. They did not aspire to be the #1 coin. They
                were created because people wanted free money, and because it was easy to
                recompile the software with a new name. In fact, many of them were (I
                assume) created to de-legitimize BCH (with the goal of muddying the waters
                in that debate). Therefore, out of all the hard forks, only BCH presented a
                serious vision. The others are knockoff cash-grabs.
              </P>
            </Section>

            <Section id="ethereum" num="11b" title="Ethereum and the other Altcoins">
              <P>
                We now turn to Ethereum – the #2 coin. It has differentiated itself [from
                Bitcoin] in many ways: proof of stake; frequent hard forks (i.e.,
                "mandatory upgrades"); account model (vs UTXO); aggressive culture (vs
                conservative); fast block times; uncle blocks rewarded; higher node costs
                (and less discipline in capping node costs); Turing-complete EVM scripting.
                All of those changes... are bad. Ethereum exists because developers love to
                create stuff and have fun (which is understandable) – but drivechain is
                better for that. Drivechain has no gas fees. Each L2 has its own chain, and
                does not share a chain (nor a fee-rate) with any other chain/contract.
              </P>
              <P>
                So, in general: there has been a depressing lack of seriousness among the
                Altcoins. A handful – Ethereum, Monero, Namecoin, zCash – have an actual
                vision for the world. The rest are just get-rich-quick schemes, or hobbyist
                projects.
              </P>
              <P>
                The low quality of today's Altcoins has – lamentably – contributed to
                Bitcoin's complacency. With no competitors to keep it honest, Bitcoin has
                mostly wasted the last 10 years.
              </P>
            </Section>

            <Section id="stop" num="12" title="What would convince you NOT to go through with this hard fork?">
              <P>
                Well – one thing could be for 51% BTC hashrate to activate Bip300 (on BTC).
                That might render eCash useless.
              </P>
              <P>
                Bip300 is an opt-in, reversible, soft fork. With the CUSF client, miners
                can start/stop it at any time. Plus, Bip300 (hopefully) gets them more
                money – much more money.
              </P>
              <P>
                The bigger problem is the community. Without a community of genuinely
                interested users, the mere activation of Bip300 will do very little.
              </P>
            </Section>

            <Section
              id="tech"
              num="13"
              title="What do you think of BitVM / zk-Rollups / new technology? How do you feel about your competition?"
            >
              <P>This is already answered in the FAQ.</P>
              <P>
                But — more importantly — Bitcoin does NOT have any tech problems. It does
                NOT have any technical limitations. The existing software stack is already
                sufficient to achieve unlimited scale, privacy, programmability,
                interoperability, extensibility, ossification, etc.
              </P>
              <P>
                But, what Bitcoin DOES have is cultural problems — also known as the
                derangements. That is why we need a new project. It has nothing to do with
                technology.
              </P>
            </Section>

            <Section
              id="moment"
              num="14"
              title="The drivechain idea is over 10 years old. If it were good, someone would have used it by now. Hasn't the moment passed?"
            >
              <P>
                The Drivechain-inventor was the first proponent of blockchain prediction
                markets, back in 2012. PolyMarket finally went mainstream in 2024 — over 10
                years later.
              </P>
              <P>
                The drivechain idea has many supporters — including most of the crème de la
                crème of the Bitcoin world.
              </P>
              <P>By comparison, the Lightning Network is also 10+ years old.</P>

              <div className="max-w-2xl overflow-x-auto border border-hairline">
                <table className="w-full text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-hairline">
                      <th className="mono px-4 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-ink/45" />
                      <th className="mono px-4 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-ink/45">
                        lightning
                      </th>
                      <th className="mono bg-accent/10 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-accent-deep">
                        drivechain
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {versus.map((r) => (
                      <tr key={r.metric}>
                        <td className="mono px-4 py-3 align-top text-[11.5px] uppercase tracking-[0.06em] text-ink/45">
                          {r.metric}
                        </td>
                        <td className="px-4 py-3 align-top leading-snug text-ink/65">{r.ln}</td>
                        <td className="bg-accent/10 px-4 py-3 align-top leading-snug text-ink/85">{r.dc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <P>
                In Oct 2025, the Drivechain-inventor debated a room full of LN devs at
                TabConf (the #1 Bitcoin developer conference). Tadge Dryja (the inventor of
                LN) joined him on stage in the final 10 minutes — and ultimately accepted
                all of Paul's critiques.
              </P>
              <P>
                Yet, people continue "trying" the Lightning Network. This is not because LN
                is a good idea. It is because they are too embarrassed to admit their past
                mistake(s). They pass over good ideas (such as Drivechain) for the same
                reason.
              </P>
              <P>
                In fact, most critics of Drivechain admit that they have never actually
                read the BIP text (which is only a few pages long). So: Bitcoin is not a
                meritocracy. It is a bureaucracy. The problems with Bitcoin are not
                technical — they are cultural.
              </P>
            </Section>
          </div>
        </div>

        <div className="pb-16 md:pb-24">
          <NextLinks
            links={[
              { name: "faq", href: "/faq", note: "see the faq for specifics" },
              { name: "reading", href: "/reading", note: "read the source material" },
              { name: "what to expect", href: "/what-to-expect", note: "what happens on fork day" },
            ]}
          />
        </div>
        </div>
      </div>
    </PageShell>
  )
}
