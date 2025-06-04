"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Package, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function OrdersPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Sign in to view your orders</h1>
            <p className="text-muted-foreground mb-8">
              You need to be signed in to access your order history.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/profile" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center py-16"
        >
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">No orders yet</h1>
          <p className="text-muted-foreground mb-8">
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <Link href="/products">
            <Button size="lg">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
