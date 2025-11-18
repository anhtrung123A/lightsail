export interface Product {
  id: string
  name: string
  price: number
  image: string
  images: string[]
  description: string
  category: string
  sizes?: string[]
  colors?: string[]
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Essence Cream',
    price: 185,
    image: '/luxury-silk-cream-skincare.jpg',
    images: [
      '/luxury-silk-cream-skincare.jpg',
      '/skincare-cream.png',
      '/premium-beauty-cream.jpg',
    ],
    description: 'A luxurious silk-infused facial cream with advanced peptide technology. Delivers intense hydration and visible anti-aging benefits.',
    category: 'Skincare',
    colors: ['Ivory', 'Pearl'],
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 425,
    image: '/luxury-cashmere-sweater.png',
    images: [
      '/luxury-cashmere-sweater.png',
      '/elegant-knit-sweater.jpg',
      '/premium-cashmere-knit.jpg',
    ],
    description: 'Premium 100% cashmere sweater, hand-finished in Italy. Timeless elegance meets modern comfort.',
    category: 'Fashion',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Charcoal', 'Sage'],
  },
  {
    id: '3',
    name: 'Luminous Eye Serum',
    price: 145,
    image: '/luxury-eye-serum.jpg',
    images: [
      '/luxury-eye-serum.jpg',
      '/anti-aging-eye-treatment.jpg',
      '/premium-eye-care.jpg',
    ],
    description: 'Potent eye serum with retinol alternatives and caffeine extract. Reduces fine lines and brightens dark circles.',
    category: 'Skincare',
    colors: ['Translucent'],
  },
  {
    id: '4',
    name: 'Minimal White Tee',
    price: 95,
    image: '/luxury-minimal-white-t-shirt.jpg',
    images: [
      '/luxury-minimal-white-t-shirt.jpg',
      '/premium-white-tee.jpg',
      '/high-quality-cotton-shirt.jpg',
    ],
    description: 'Essential luxury basic. Premium cotton jersey with perfect proportions and invisible seaming.',
    category: 'Fashion',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Beige'],
  },
  {
    id: '5',
    name: 'Hydrating Face Mask',
    price: 120,
    image: '/luxury-hydrating-face-mask.jpg',
    images: [
      '/luxury-hydrating-face-mask.jpg',
      '/premium-skincare-mask.jpg',
      '/spa-treatment-mask.jpg',
    ],
    description: 'Biocellulose mask infused with hyaluronic acid and botanical extracts. Intense hydration in minutes.',
    category: 'Skincare',
  },
  {
    id: '6',
    name: 'Tailored Blazer',
    price: 565,
    image: '/luxury-tailored-blazer.jpg',
    images: [
      '/luxury-tailored-blazer.jpg',
      '/designer-wool-blazer.jpg',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Hand-tailored wool blazer with silk lining. The perfect investment piece for any wardrobe.',
    category: 'Fashion',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Navy', 'Camel'],
  },
  {
    id: '7',
    name: 'Radiant Glow Oil',
    price: 165,
    image: '/placeholder.svg?height=500&width=500',
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Lightweight dry oil with rose hip and argan. Imparts luminous glow while nourishing skin.',
    category: 'Skincare',
  },
  {
    id: '8',
    name: 'Linen Trousers',
    price: 285,
    image: '/placeholder.svg?height=500&width=500',
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Italian linen trousers with expert tailoring. Summer elegance meets comfort.',
    category: 'Fashion',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Natural', 'Charcoal', 'Sage'],
  },
  {
    id: '9',
    name: 'Peptide Night Complex',
    price: 210,
    image: '/placeholder.svg?height=500&width=500',
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Overnight treatment with 5 bio-active peptides. Repair and regenerate while you sleep.',
    category: 'Skincare',
  },
  {
    id: '10',
    name: 'Silk Camisole',
    price: 215,
    image: '/placeholder.svg?height=500&width=500',
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Pure charmeuse silk camisole with delicate lace trim. Effortlessly luxurious layering piece.',
    category: 'Fashion',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Black', 'Champagne'],
  },
  {
    id: '11',
    name: 'Clarifying Toner',
    price: 105,
    image: '/placeholder.svg?height=500&width=500',
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Gentle hydrating toner with niacinamide and rose water. Preps skin for optimal serum absorption.',
    category: 'Skincare',
  },
  {
    id: '12',
    name: 'Wool Coat',
    price: 725,
    image: '/placeholder.svg?height=500&width=500',
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    description: 'Double-faced wool coat with impeccable tailoring. An investment that transcends seasons.',
    category: 'Fashion',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Camel'],
  },
]
