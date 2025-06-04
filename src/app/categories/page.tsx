"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Loader2 } from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  created_at: string
}

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  category_id: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products')
      ])

      const categoriesData = await categoriesRes.json()
      const productsData = await productsRes.json()

      if (categoriesData.success) {
        setCategories(categoriesData.data)
      }
      if (productsData.success) {
        setProducts(productsData.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProductCountForCategory = (categoryId: string) => {
    return products.filter(product => product.category_id === categoryId).length
  }

  const getFeaturedProductForCategory = (categoryId: string) => {
    return products.find(product => product.category_id === categoryId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Shop by Category
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Explore our carefully curated categories to find exactly what you're looking for
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const productCount = getProductCountForCategory(category.id)
            const featuredProduct = getFeaturedProductForCategory(category.id)

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/products?category=${category.id}`}>
                  <div className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    {/* Category Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                      {featuredProduct?.image_url ? (
                        <Image
                          src={featuredProduct.image_url}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Package className="h-16 w-16 text-muted-foreground" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm opacity-90">{productCount} products</p>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6">
                      <p className="text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Browse {category.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8"
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Browse all our products or use our search feature
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                View All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
