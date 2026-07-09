import { useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
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

type Item = { name: string; href: string; description?: string; icon?: ReactNode; live?: boolean }

const I = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)
const icPlay = I(<><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none" /></>)
const icBook = I(<><path d="M6 4a1 1 0 0 1 1-1h11v15H7a1 1 0 0 0-1 1V4z" /><path d="M18 18H7a1 1 0 0 0-1 1" /></>)
const icUsers = I(<><circle cx="9.5" cy="9" r="3" /><path d="M4 19a5.5 5.5 0 0 1 11 0" /><path d="M16 6.5a3 3 0 0 1 0 6" /><path d="M20.5 19a5.5 5.5 0 0 0-3.5-5.1" /></>)
const icBrand = I(<path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3z" />)
const icDoc = I(<><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /></>)
const icQuote = I(<><path d="M5 6h6v6H7a2 2 0 0 1-2-2V6z" /><path d="M9 12c0 3-1.5 4.5-4 5" /><path d="M13 6h6v6h-4a2 2 0 0 1-2-2V6z" /><path d="M17 12c0 3-1.5 4.5-4 5" /></>)
const icCoin = I(<><ellipse cx="12" cy="7.5" rx="7.5" ry="3.5" /><path d="M4.5 7.5v9c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5v-9" /><path d="M4.5 12c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5" /></>)

const simpleLinks: Item[] = [
  { name: "why hardfork", href: "/why-hardfork" },
  { name: "what to expect", href: "/what-to-expect" },
  { name: "sidechains", href: "/sidechains" },
  { name: "faq", href: "/faq" },
  { name: "bounty", href: "/bounty", live: true },
]

const resourceLinks: Item[] = [
  { name: "media", href: "/media", description: "interviews, talks, debates", icon: icPlay },
  { name: "reading", href: "/reading", description: "drivechain source material", icon: icBook },
  { name: "endorsements", href: "/endorsements", description: "what people are saying", icon: icQuote },
  { name: "blog", href: "/blog", description: "essays and the eCash thesis", icon: icDoc },
  { name: "socials", href: "/socials", description: "telegram, x, youtube", icon: icUsers },
  { name: "sol token", href: "/sol-token", description: "sol-ecash redemption", icon: icCoin },
  { name: "brand", href: "/brand", description: "logos and assets", icon: icBrand },
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
            <Link to="/" aria-label="eCash home" className="relative z-20">
              <Logo tone="ink" />
            </Link>

            {isLarge && <DesktopNav />}

            <div className="flex items-center gap-5">
              <Link
                to="/download"
                className={cn(
                  "hidden font-display text-[15px] font-medium text-ink transition-colors hover:text-accent-deep sm:inline-flex sm:items-center sm:gap-1.5",
                  scrolled && "rounded-full bg-accent px-4 py-2 hover:bg-accent-deep hover:text-ink",
                )}
              >
                download bitwindow <IconArrowRight className="size-4" />
              </Link>

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

function LiveDot() {
  return (
    <span className="relative ml-1.5 flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-deep/60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-deep" />
    </span>
  )
}

function DesktopNav() {
  return (
    <NavigationMenu viewport={false} className="absolute inset-0 m-auto size-fit max-lg:hidden">
      <NavigationMenuList className="gap-0.5">
        {simpleLinks.map((l) => (
          <NavigationMenuItem key={l.name}>
            <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), triggerCls)}>
              <Link to={l.href} className="flex-row items-center">
                {l.name}
                {l.live && <LiveDot />}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerCls}>resources</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-lg p-2">
            <ul className="grid grid-cols-2 gap-0.5">
              {resourceLinks.map((it) => (
                <ListItem key={it.name} {...it} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({ name, href, description, icon }: Item) {
  return (
    <li>
      <NavigationMenuLink asChild className="px-3 py-2.5">
        <Link to={href} className="flex flex-row items-start gap-3">
          {icon && (
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-deep">
              {icon}
            </span>
          )}
          <span className="flex flex-col gap-0.5">
            <span className="font-display text-[14px] font-medium text-ink">{name}</span>
            {description && <span className="line-clamp-1 text-[12px] text-muted-foreground">{description}</span>}
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function MobileNav({ close }: { close: () => void }) {
  return (
    <nav className="mt-4 w-full pb-8">
      {simpleLinks.map((l) => (
        <Link
          key={l.name}
          to={l.href}
          onClick={close}
          className="flex items-center border-b border-hairline py-4 font-display text-lg text-ink"
        >
          {l.name}
          {l.live && <LiveDot />}
        </Link>
      ))}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="resources" className="border-hairline">
          <AccordionTrigger className="font-display text-base text-ink">resources</AccordionTrigger>
          <AccordionContent>
            <ul className="pb-2">
              {resourceLinks.map((it) => (
                <li key={it.name}>
                  <Link
                    to={it.href}
                    onClick={close}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] text-ink/80 hover:bg-foreground/5"
                  >
                    {it.icon && <span className="text-accent-deep">{it.icon}</span>}
                    {it.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link
        to="/download"
        onClick={close}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-display text-[14px] font-medium text-ink"
      >
        download bitwindow <IconArrowRight className="size-4" />
      </Link>
    </nav>
  )
}
