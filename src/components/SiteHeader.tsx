import { useState, type ReactNode } from "react"
import { useScroll, useMotionValueEvent } from "motion/react"
import { IconMenu, IconClose, IconArrowRight } from "./icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { useMedia } from "@/hooks/useMedia"
import { Logo } from "./Logo"

type Item = { name: string; href: string; description?: string; icon?: ReactNode }

// compact outline icons (nucleo style)
const I = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)
const icHelp = I(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.2a2.5 2.5 0 1 1 3 2.3c-.6.2-1 .8-1 1.5v.3" /><circle cx="12" cy="16.6" r=".6" fill="currentColor" stroke="none" /></>)
const icLink = I(<><path d="M9.5 14.5l5-5" /><path d="M8 8.5 6.6 10a3.4 3.4 0 0 0 4.8 4.8l1.4-1.4" /><path d="M16 15.5 17.4 14a3.4 3.4 0 0 0-4.8-4.8L11.2 10.6" /></>)
const icSpark = I(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />)
const icPlay = I(<><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none" /></>)
const icBook = I(<><path d="M6 4a1 1 0 0 1 1-1h11v15H7a1 1 0 0 0-1 1V4z" /><path d="M18 18H7a1 1 0 0 0-1 1" /></>)
const icUsers = I(<><circle cx="9.5" cy="9" r="3" /><path d="M4 19a5.5 5.5 0 0 1 11 0" /><path d="M16 6.5a3 3 0 0 1 0 6" /><path d="M20.5 19a5.5 5.5 0 0 0-3.5-5.1" /></>)
const icBrand = I(<path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3z" />)
const icDoc = I(<><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /></>)

const simpleLinks: Item[] = [
  { name: "countdown", href: "#countdown" },
  { name: "run a node", href: "#run-a-node" },
  { name: "what to expect", href: "#what-to-expect" },
]

const faqLinks: Item[] = [
  { name: "launch faq", href: "#launch-faq", description: "fork day, mining, exchanges, the airdrop", icon: icHelp },
  { name: "drivechain faq", href: "https://drivechain.info", description: "BIP 300/301, sidechains, security", icon: icLink },
]

const resourceLinks: Item[] = [
  { name: "why hardfork", href: "#why", description: "the case for forking bitcoin", icon: icSpark },
  { name: "media", href: "#media", description: "interviews, talks, debates", icon: icPlay },
  { name: "further reading", href: "#reading", description: "drivechain source material", icon: icBook },
  { name: "community", href: "#community", description: "telegram, x, youtube", icon: icUsers },
  { name: "brand", href: "#brand", description: "logos and assets", icon: icBrand },
  { name: "literature", href: "#literature", description: "essays and the eCash thesis", icon: icDoc },
]

const triggerCls = "font-display text-[15px] font-medium tracking-tight text-ink"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isLarge = useMedia("(min-width: 64rem)")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20))

  return (
    <header
      role="banner"
      data-state={open ? "active" : "inactive"}
      {...(scrolled && { "data-scrolled": true })}
    >
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-ink/10 transition-colors duration-300 in-data-scrolled:border-hairline in-data-scrolled:bg-background/85 in-data-scrolled:backdrop-blur",
          !isLarge && "bg-background/85 backdrop-blur",
          open && "h-screen bg-background/95 backdrop-blur",
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="relative flex items-center justify-between py-3">
            <a href="/" aria-label="eCash home" className="relative z-20">
              <Logo tone="ink" />
            </a>

            {isLarge && <DesktopNav />}

            <div className="flex items-center gap-5">
              <a
                href="#run-a-node"
                className={cn(
                  "hidden font-display text-[15px] font-medium text-ink transition-colors hover:text-accent-deep sm:inline-flex sm:items-center sm:gap-1.5",
                  scrolled && "rounded-full bg-accent px-4 py-2 hover:bg-accent-deep hover:text-ink",
                )}
              >
                download bitwindow <IconArrowRight className="size-4" />
              </a>

              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "close menu" : "open menu"}
                className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
              >
                <IconMenu className="m-auto size-5 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <IconClose className="absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            {!isLarge && open && <MobileNav close={() => setOpen(false)} />}
          </div>
        </div>
      </div>
    </header>
  )
}

function DesktopNav() {
  return (
    <NavigationMenu viewport={false} className="absolute inset-0 m-auto size-fit max-lg:hidden">
      <NavigationMenuList className="gap-1">
        {simpleLinks.map((l) => (
          <NavigationMenuItem key={l.name}>
            <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), triggerCls)}>
              <a href={l.href}>{l.name}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <Dropdown label="faq" items={faqLinks} cols={1} width="min-w-sm" />
        <Dropdown label="resources" items={resourceLinks} cols={2} width="min-w-lg" />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function Dropdown({ label, items, cols, width }: { label: string; items: Item[]; cols: 1 | 2; width: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={triggerCls}>{label}</NavigationMenuTrigger>
      <NavigationMenuContent className={cn("p-2", width)}>
        <ul className={cn("grid gap-0.5", cols === 2 && "grid-cols-2")}>
          {items.map((it) => (
            <ListItem key={it.name} {...it} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ListItem({ name, href, description, icon }: Item) {
  const external = href.startsWith("http")
  return (
    <li>
      <NavigationMenuLink asChild className="px-3 py-2.5">
        <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="flex flex-row items-start gap-3">
          {icon && (
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-deep">
              {icon}
            </span>
          )}
          <span className="flex flex-col gap-0.5">
            <span className="font-display text-[14px] font-medium text-ink">
              {name}
              {external && <span className="ml-1 text-ink/40">↗</span>}
            </span>
            {description && <span className="line-clamp-1 text-[12px] text-muted-foreground">{description}</span>}
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

function MobileNav({ close }: { close: () => void }) {
  const groups = [
    { name: "faq", items: faqLinks },
    { name: "resources", items: resourceLinks },
  ]
  return (
    <nav className="mt-4 w-full pb-8">
      {simpleLinks.map((l) => (
        <a key={l.name} href={l.href} onClick={close} className="block border-b border-hairline py-4 font-display text-lg text-ink">
          {l.name}
        </a>
      ))}
      <Accordion type="single" collapsible className="w-full">
        {groups.map((g) => (
          <AccordionItem key={g.name} value={g.name} className="border-hairline">
            <AccordionTrigger className="font-display text-base text-ink">{g.name}</AccordionTrigger>
            <AccordionContent>
              <ul className="pb-2">
                {g.items.map((it) => {
                  const external = it.href.startsWith("http")
                  return (
                    <li key={it.name}>
                      <a href={it.href} onClick={close} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] text-ink/80 hover:bg-foreground/5">
                        {it.icon && <span className="text-accent-deep">{it.icon}</span>}
                        {it.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <a href="#run-a-node" onClick={close} className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-display text-[14px] font-medium text-ink">
        download bitwindow <IconArrowRight className="size-4" />
      </a>
    </nav>
  )
}
