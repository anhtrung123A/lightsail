'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = async () => {
    if (step === 'shipping') {
      if (!formData.email || !formData.firstName || !formData.address || !formData.city) {
        alert('Please fill in all shipping fields')
        return
      }
      setStep('payment')
    } else if (step === 'payment') {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVC) {
        alert('Please fill in all payment fields')
        return
      }
      setStep('review')
    } else if (step === 'review') {
      setIsProcessing(true)
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      clearCart()
      router.push('/order-success')
    }
  }

  const shippingCost = total > 500 ? 0 : 15
  const finalTotal = total + shippingCost

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Your cart is empty</p>
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-foreground text-background rounded text-sm font-medium"
            >
              Return to Shop
            </motion.button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <section className="min-h-screen bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center gap-2">
              <motion.div
                className={`h-2 w-24 rounded transition-colors ${step === 'shipping' ? 'bg-foreground' : 'bg-foreground/30'}`}
              />
              <motion.div
                className={`h-2 w-24 rounded transition-colors ${step === 'payment' ? 'bg-foreground' : 'bg-foreground/30'}`}
              />
              <motion.div
                className={`h-2 w-24 rounded transition-colors ${step === 'review' ? 'bg-foreground' : 'bg-foreground/30'}`}
              />
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span className={step === 'shipping' ? 'text-foreground font-medium' : ''}>Shipping</span>
              <span className={step === 'payment' ? 'text-foreground font-medium' : ''}>Payment</span>
              <span className={step === 'review' ? 'text-foreground font-medium' : ''}>Review</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-light tracking-tight mb-8">
                {step === 'shipping' ? 'Shipping Address' : step === 'payment' ? 'Payment Method' : 'Order Review'}
              </h2>

              {step === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      placeholder="hello@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">Expiry</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">CVC</label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-foreground transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    This is a demo. Use any valid card format to proceed.
                  </p>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-8">
                  <div className="border border-border rounded p-6">
                    <h3 className="text-sm font-light text-foreground mb-4">Shipping Address</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                  </div>

                  <div className="border border-border rounded p-6">
                    <h3 className="text-sm font-light text-foreground mb-4">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">
                      Card ending in {formData.cardNumber.slice(-4)}
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-border/40 pt-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-light">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-light">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg border-t border-border/40 pt-3">
                      <span className="font-light">Total</span>
                      <span className="font-light">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 flex gap-4">
                {step !== 'shipping' && (
                  <motion.button
                    onClick={() => {
                      if (step === 'payment') setStep('shipping')
                      else if (step === 'review') setStep('payment')
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 border border-border rounded text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Back
                  </motion.button>
                )}

                <motion.button
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-foreground text-background rounded text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-4 w-4 border-2 border-background border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      {step === 'review' ? 'Place Order' : 'Continue'}
                      <ChevronRight size={18} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="sticky top-24 border border-border rounded-lg p-6 space-y-6 bg-secondary/30">
                <h3 className="text-lg font-light tracking-tight">Order Summary</h3>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {items.map(item => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex gap-3 pb-4 border-b border-border/40 last:border-0 last:pb-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-background">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-light text-foreground mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border/40 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-light">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-light">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg border-t border-border/40 pt-3">
                    <span className="font-light">Total</span>
                    <span className="font-light">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
