import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uexkcowbqpezwijkmcst.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleGtjb3dicXBlendpamttY3N0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTAzNjIwNiwiZXhwIjoyMDY0NjEyMjA2fQ.Vfi1EuW-03M9E_PW-SvpZyF6tSrmEUKOWES1q778cdQ'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

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

async function setupData() {
  console.log('🚀 Setting up NexaShop database data...')
  
  try {
    // Insert categories first
    console.log('📁 Inserting categories...')
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'name' })
      .select()
    
    if (categoriesError) {
      console.error('❌ Error inserting categories:', categoriesError)
      return
    }
    
    console.log(`✅ Inserted ${categoriesData?.length} categories`)
    
    // Insert products
    console.log('📦 Inserting products...')
    let successCount = 0
    
    for (const product of products) {
      const category = categoriesData?.find(c => c.name === product.category_name)
      if (category) {
        const { error: productError } = await supabase
          .from('products')
          .upsert({
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            category_id: category.id,
            stock_quantity: product.stock_quantity
          }, { onConflict: 'name' })
        
        if (productError) {
          console.error('❌ Error inserting product:', product.name, productError)
        } else {
          console.log(`✅ ${product.name}`)
          successCount++
        }
      }
    }
    
    console.log(`\n🎉 Database setup completed successfully!`)
    console.log(`📊 Summary:`)
    console.log(`   - Categories: ${categoriesData?.length}`)
    console.log(`   - Products: ${successCount}`)
    console.log(`\n🌐 You can now test the API endpoints:`)
    console.log(`   - http://localhost:3000/api/categories`)
    console.log(`   - http://localhost:3000/api/products`)
    console.log(`   - http://localhost:3000/products`)
    
  } catch (error) {
    console.error('💥 Error setting up database:', error)
  }
}

setupData()
