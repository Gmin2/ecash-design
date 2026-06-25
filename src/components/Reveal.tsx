import { motion } from "motion/react"
import type { ReactNode } from "react"

// fade + rise on scroll-into-view (pattern lifted from stacks.co)
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.44, 0, 0.56, 1] }}
    >
      {children}
    </motion.div>
  )
}
