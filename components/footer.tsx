'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/40 bg-background py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wide text-foreground">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium luxury goods for the discerning individual.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wide text-foreground">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Skincare</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Collections</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wide text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wide text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">© 2025 Luxe. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Built with</span>
            <span className="inline-block px-2 py-1 bg-secondary text-foreground rounded text-xs font-medium">
              Next.js 15
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
