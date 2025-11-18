'use client'

import { Product } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block overflow-hidden rounded-lg">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
        </div>
      </Link>

      <motion.div
        className="mt-6 space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
      >
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg tracking-tight text-foreground hover:text-muted-foreground transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="pt-2 text-lg font-light text-foreground">
          {formatPrice(product.price)}
        </p>
      </motion.div>
    </motion.div>
  )
}
