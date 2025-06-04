import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    console.log('Setting up database...')
    
    // Categories data
    const categories = [
      { name: 'Electronics', description: 'Latest gadgets and electronic devices' },
      { name: 'Fashion', description: 'Trendy clothing and accessories' },
      { name: 'Home & Garden', description: 'Everything for your home and garden' },
      { name: 'Sports', description: 'Sports equipment and fitness gear' },
      { name: 'Books', description: 'Books, magazines, and educational materials' }
    ]

    // Products data
    const products = [
      // Electronics
      { name: 'iPhone 15 Pro', description: 'Latest iPhone with advanced camera system and A17 Pro chip', price: 999.99, image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', category_name: 'Electronics', stock_quantity: 50 },
      { name: 'MacBook Air M3', description: 'Powerful laptop with M3 chip and all-day battery life', price: 1299.99, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', category_name: 'Electronics', stock_quantity: 30 },
      { name: 'Sony WH-1000XM5', description: 'Premium noise-canceling wireless headphones', price: 399.99, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category_name: 'Electronics', stock_quantity: 75 },
      { name: 'Samsung 4K Smart TV', description: '55-inch 4K UHD Smart TV with HDR and streaming apps', price: 799.99, image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', category_name: 'Electronics', stock_quantity: 25 },
      { name: 'iPad Pro 12.9"', description: 'Professional tablet with M2 chip and Liquid Retina display', price: 1099.99, image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', category_name: 'Electronics', stock_quantity: 40 },
      { name: 'AirPods Pro 2', description: 'Advanced noise cancellation with spatial audio', price: 249.99, image_url: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500', category_name: 'Electronics', stock_quantity: 100 },

      // Fashion
      { name: 'Designer Leather Jacket', description: 'Premium genuine leather jacket with modern fit', price: 299.99, image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', category_name: 'Fashion', stock_quantity: 40 },
      { name: 'Classic Denim Jeans', description: 'Comfortable straight-fit denim jeans in classic blue', price: 79.99, image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', category_name: 'Fashion', stock_quantity: 100 },
      { name: 'Luxury Watch', description: 'Elegant stainless steel watch with automatic movement', price: 599.99, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category_name: 'Fashion', stock_quantity: 20 },
      { name: 'Designer Sneakers', description: 'Comfortable and stylish sneakers for everyday wear', price: 149.99, image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', category_name: 'Fashion', stock_quantity: 60 },
      { name: 'Silk Dress', description: 'Elegant silk dress perfect for special occasions', price: 189.99, image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', category_name: 'Fashion', stock_quantity: 35 },
      { name: 'Wool Sweater', description: 'Cozy merino wool sweater in multiple colors', price: 89.99, image_url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', category_name: 'Fashion', stock_quantity: 80 },

      // Home & Garden
      { name: 'Modern Coffee Table', description: 'Sleek glass-top coffee table with wooden legs', price: 249.99, image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', category_name: 'Home & Garden', stock_quantity: 15 },
      { name: 'Indoor Plant Set', description: 'Collection of 3 low-maintenance indoor plants with pots', price: 89.99, image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500', category_name: 'Home & Garden', stock_quantity: 35 },
      { name: 'Ergonomic Office Chair', description: 'Comfortable office chair with lumbar support', price: 299.99, image_url: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500', category_name: 'Home & Garden', stock_quantity: 25 },
      { name: 'LED Desk Lamp', description: 'Adjustable LED desk lamp with USB charging port', price: 59.99, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', category_name: 'Home & Garden', stock_quantity: 50 },

      // Sports
      { name: 'Professional Tennis Racket', description: 'High-quality tennis racket for intermediate to advanced players', price: 199.99, image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', category_name: 'Sports', stock_quantity: 25 },
      { name: 'Yoga Mat Premium', description: 'Non-slip premium yoga mat with carrying strap', price: 49.99, image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', category_name: 'Sports', stock_quantity: 80 },
      { name: 'Running Shoes', description: 'Lightweight running shoes with advanced cushioning', price: 129.99, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', category_name: 'Sports', stock_quantity: 60 },
      { name: 'Fitness Tracker', description: 'Advanced fitness tracker with heart rate monitoring', price: 199.99, image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500', category_name: 'Sports', stock_quantity: 45 },

      // Books
      { name: 'JavaScript: The Complete Guide', description: 'Comprehensive guide to modern JavaScript development', price: 39.99, image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', category_name: 'Books', stock_quantity: 50 },
      { name: 'Design Thinking Handbook', description: 'Learn the principles and practices of design thinking', price: 29.99, image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', category_name: 'Books', stock_quantity: 40 },
      { name: 'The Art of Photography', description: 'Master the techniques of professional photography', price: 45.99, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', category_name: 'Books', stock_quantity: 30 },
      { name: 'Cooking Masterclass', description: 'Learn to cook like a professional chef', price: 34.99, image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', category_name: 'Books', stock_quantity: 55 }
    ]
    
    // Insert categories
    console.log('Inserting categories...')
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'name' })
      .select()
    
    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to insert categories',
        details: categoriesError 
      }, { status: 500 })
    }
    
    console.log('Categories inserted:', categoriesData?.length)

    // Insert products
    console.log('Inserting products...')
    let successCount = 0
    const insertedProducts = []

    for (const product of products) {
      const category = categoriesData?.find(c => c.name === product.category_name)
      if (category) {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .upsert({
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            category_id: category.id,
            stock_quantity: product.stock_quantity
          }, { onConflict: 'name' })
          .select()
          .single()

        if (productError) {
          console.error('Error inserting product:', product.name, productError)
        } else {
          successCount++
          insertedProducts.push(productData)
        }
      }
    }

    // Sample reviews data
    console.log('Inserting sample reviews...')
    const sampleReviews = [
      { product_name: 'iPhone 15 Pro', user_id: '00000000-0000-0000-0000-000000000001', rating: 5, comment: 'Amazing phone! The camera quality is outstanding and the performance is incredibly smooth.' },
      { product_name: 'iPhone 15 Pro', user_id: '00000000-0000-0000-0000-000000000002', rating: 4, comment: 'Great device overall, but the price is quite high. Worth it for the features though.' },
      { product_name: 'MacBook Air M3', user_id: '00000000-0000-0000-0000-000000000003', rating: 5, comment: 'Perfect laptop for work and creative tasks. Battery life is exceptional!' },
      { product_name: 'Sony WH-1000XM5', user_id: '00000000-0000-0000-0000-000000000001', rating: 5, comment: 'Best noise-canceling headphones I\'ve ever used. Sound quality is phenomenal.' },
      { product_name: 'Designer Leather Jacket', user_id: '00000000-0000-0000-0000-000000000002', rating: 4, comment: 'High quality leather and great fit. Looks very stylish and feels durable.' },
      { product_name: 'Yoga Mat Premium', user_id: '00000000-0000-0000-0000-000000000003', rating: 5, comment: 'Excellent grip and comfort. Perfect for my daily yoga practice.' }
    ]

    let reviewsCount = 0
    for (const review of sampleReviews) {
      const product = insertedProducts.find(p => p.name === review.product_name)
      if (product) {
        const { error: reviewError } = await supabase
          .from('reviews')
          .upsert({
            product_id: product.id,
            user_id: review.user_id,
            rating: review.rating,
            comment: review.comment
          }, { onConflict: 'user_id,product_id' })

        if (reviewError) {
          console.error('Error inserting review:', reviewError)
        } else {
          reviewsCount++
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully!',
      data: {
        categories: categoriesData?.length || 0,
        products: successCount,
        reviews: reviewsCount
      }
    })
    
  } catch (error) {
    console.error('Error setting up database:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to setup database' },
      { status: 500 }
    )
  }
}
