'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'
import { motion } from 'framer-motion'

export default function Home() {
  const skincareProducts = products.filter(p => p.category === 'Skincare')
  const fashionProducts = products.filter(p => p.category === 'Fashion')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-7xl px-6 text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight font-light text-foreground text-balance mb-6">
            Curated Luxury
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Discover premium skincare and timeless fashion pieces selected for the discerning individual seeking excellence.
          </p>
        </motion.div>
      </section>

      {/* Skincare Section */}
      <section id="skincare" className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl tracking-tight font-light text-foreground mb-4">Skincare</h2>
            <div className="w-12 h-px bg-foreground/20" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {skincareProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fashion Section */}
      <section id="fashion" className="py-20 md:py-28 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl tracking-tight font-light text-foreground mb-4">Fashion</h2>
            <div className="w-12 h-px bg-foreground/20" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {fashionProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <section className="py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground tracking-wide">
              Carefully selected. Beautifully presented. Timeless quality.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
