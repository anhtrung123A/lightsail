'use client'

import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [isCheckout, setIsCheckout] = useState(false)

  const handleCheckout = () => {
    setIsCheckout(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Handle bar */}
            <div className="sticky top-0 bg-background rounded-t-2xl p-6 border-b border-border/40 flex items-center justify-between">
              <h2 className="text-lg font-light tracking-tight">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-center space-y-4">
                <p className="text-muted-foreground">Your cart is empty</p>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-foreground text-background rounded text-sm font-medium"
                >
                  Continue Shopping
                </motion.button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="p-6 space-y-6">
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 pb-6 border-b border-border/40 last:border-0 last:pb-0"
                    >
                      {/* Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-secondary">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                          {item.color && <p className="text-xs text-muted-foreground">{item.color}</p>}
                          {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                        </div>
                        <p className="text-sm font-light text-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col justify-between items-end">
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Trash2 size={16} />
                        </motion.button>

                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded">
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                            whileTap={{ scale: 0.8 }}
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                            whileTap={{ scale: 0.8 }}
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="sticky bottom-0 bg-background border-t border-border/40 p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-light">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-light">{total > 500 ? 'Free' : formatPrice(15)}</span>
                    </div>
                    <div className="border-t border-border/40 pt-2 flex justify-between items-center">
                      <span className="font-light">Total</span>
                      <span className="text-lg font-light">
                        {formatPrice(total > 500 ? total : total + 15)}
                      </span>
                    </div>
                  </div>

                  {!isCheckout ? (
                    <motion.button
                      onClick={handleCheckout}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-foreground text-background rounded text-sm font-medium tracking-wide"
                    >
                      Proceed to Checkout
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <Link href="/checkout">
                        <motion.button
                          onClick={onClose}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-foreground text-background rounded text-sm font-medium tracking-wide"
                        >
                          Go to Checkout
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}

                  <motion.button
                    onClick={onClose}
                    className="w-full py-3 border border-border rounded text-sm text-foreground hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
