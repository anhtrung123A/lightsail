'use client'

import Link from 'next/link'
import { useCart } from '@/store/cart'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { CartDrawer } from './cart-drawer'

export function Header() {
  const { items } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl tracking-tighter font-light text-foreground hover:text-muted-foreground transition-colors"
            >
              Luxe
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/#skincare" className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Skincare
              </Link>
              <Link href="/#fashion" className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Fashion
              </Link>
              <Link href="/" className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                About
              </Link>
            </nav>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-muted-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 h-5 w-5 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
