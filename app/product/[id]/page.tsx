'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { motion } from 'framer-motion'
import { ChevronLeft, Plus, Minus } from 'lucide-react'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = products.find(p => p.id === productId)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0])
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  
  const { addItem } = useCart()

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
      size: selectedSize,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <>
      <Header />

      <section className="min-h-screen bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} />
            Back
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Main image */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <motion.img
                  key={currentImageIndex}
                  src={product.images?.[currentImageIndex] || product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative h-20 w-20 rounded overflow-hidden border-2 transition-colors ${
                        currentImageIndex === idx ? 'border-foreground' : 'border-border'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div className="space-y-8">
                {/* Title and Meta */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground tracking-wide">{product.category}</p>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-light text-foreground pt-2">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-4">
                    <label className="text-sm font-light tracking-wide text-foreground">
                      Color: {selectedColor}
                    </label>
                    <div className="flex gap-3">
                      {product.colors.map(color => (
                        <motion.button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-5 py-2 text-sm border transition-all rounded ${
                            selectedColor === color
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground text-foreground'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {color}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-4">
                    <label className="text-sm font-light tracking-wide text-foreground">
                      Size: {selectedSize}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.sizes.map(size => (
                        <motion.button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-3 text-sm border rounded transition-all ${
                            selectedSize === size
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground text-foreground'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-4">
                  <label className="text-sm font-light tracking-wide text-foreground">Quantity</label>
                  <div className="flex items-center border border-border rounded w-fit">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-secondary transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus size={18} />
                    </motion.button>
                    <div className="px-6 py-2 text-center min-w-[60px]">{quantity}</div>
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 pt-8"
              >
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-foreground text-background rounded text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </motion.button>

                {isAdded && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-muted-foreground"
                  >
                    Added to cart
                  </motion.p>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  Free shipping on orders over $500
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 md:py-28 bg-secondary/30 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
              More from {product.category}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/product/${related.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-4">
                    <img
                      src={related.image || "/placeholder.svg"}
                      alt={related.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm tracking-tight text-foreground group-hover:text-muted-foreground transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(related.price)}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
