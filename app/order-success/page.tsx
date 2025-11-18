'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

export default function OrderSuccessPage() {
  const router = useRouter()

  const orderNumber = Math.random().toString(36).substring(2, 11).toUpperCase()

  return (
    <>
      <Header />

      <section className="min-h-screen bg-background flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md text-center space-y-8"
        >
          {/* Checkmark animation */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <motion.div
              className="relative w-24 h-24 bg-foreground rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <Check size={48} className="text-background" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
              Order Confirmed
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
            </p>
          </motion.div>

          {/* Order number */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border border-border rounded p-6 space-y-2 bg-secondary/30"
          >
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-lg font-mono text-foreground">{orderNumber}</p>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-muted-foreground space-y-2"
          >
            <p>A confirmation email has been sent to your inbox.</p>
            <p>Tracking information will be provided once your order ships.</p>
          </motion.div>

          {/* CTA */}
          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full py-4 bg-foreground text-background rounded text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
