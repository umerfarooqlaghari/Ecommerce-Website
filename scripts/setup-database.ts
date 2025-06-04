import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uexkcowbqpezwijkmcst.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleGtjb3dicXBlendpamttY3N0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTAzNjIwNiwiZXhwIjoyMDY0NjEyMjA2fQ.Vfi1EuW-03M9E_PW-SvpZyF6tSrmEUKOWES1q778cdQ'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Database setup SQL
const createTablesSQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on reviews" ON reviews FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Users can manage their own cart items" ON cart_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create their own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
`

// Dummy data
const categories = [
  { name: 'Electronics', description: 'Latest gadgets and electronic devices' },
  { name: 'Fashion', description: 'Trendy clothing and accessories' },
  { name: 'Home & Garden', description: 'Everything for your home and garden' },
  { name: 'Sports', description: 'Sports equipment and fitness gear' },
  { name: 'Books', description: 'Books, magazines, and educational materials' }
]

const products = [
  // Electronics
  { name: 'iPhone 15 Pro', description: 'Latest iPhone with advanced camera system and A17 Pro chip', price: 999.99, image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', category_name: 'Electronics', stock_quantity: 50 },
  { name: 'MacBook Air M3', description: 'Powerful laptop with M3 chip and all-day battery life', price: 1299.99, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', category_name: 'Electronics', stock_quantity: 30 },
  { name: 'Sony WH-1000XM5', description: 'Premium noise-canceling wireless headphones', price: 399.99, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category_name: 'Electronics', stock_quantity: 75 },
  { name: 'Samsung 4K Smart TV', description: '55-inch 4K UHD Smart TV with HDR and streaming apps', price: 799.99, image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', category_name: 'Electronics', stock_quantity: 25 },
  
  // Fashion
  { name: 'Designer Leather Jacket', description: 'Premium genuine leather jacket with modern fit', price: 299.99, image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', category_name: 'Fashion', stock_quantity: 40 },
  { name: 'Classic Denim Jeans', description: 'Comfortable straight-fit denim jeans in classic blue', price: 79.99, image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', category_name: 'Fashion', stock_quantity: 100 },
  { name: 'Luxury Watch', description: 'Elegant stainless steel watch with automatic movement', price: 599.99, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category_name: 'Fashion', stock_quantity: 20 },
  { name: 'Designer Sneakers', description: 'Comfortable and stylish sneakers for everyday wear', price: 149.99, image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', category_name: 'Fashion', stock_quantity: 60 },
  
  // Home & Garden
  { name: 'Modern Coffee Table', description: 'Sleek glass-top coffee table with wooden legs', price: 249.99, image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', category_name: 'Home & Garden', stock_quantity: 15 },
  { name: 'Indoor Plant Set', description: 'Collection of 3 low-maintenance indoor plants with pots', price: 89.99, image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500', category_name: 'Home & Garden', stock_quantity: 35 },
  
  // Sports
  { name: 'Professional Tennis Racket', description: 'High-quality tennis racket for intermediate to advanced players', price: 199.99, image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', category_name: 'Sports', stock_quantity: 25 },
  { name: 'Yoga Mat Premium', description: 'Non-slip premium yoga mat with carrying strap', price: 49.99, image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', category_name: 'Sports', stock_quantity: 80 },
  
  // Books
  { name: 'JavaScript: The Complete Guide', description: 'Comprehensive guide to modern JavaScript development', price: 39.99, image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', category_name: 'Books', stock_quantity: 50 },
  { name: 'Design Thinking Handbook', description: 'Learn the principles and practices of design thinking', price: 29.99, image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', category_name: 'Books', stock_quantity: 40 }
]

async function setupDatabase() {
  console.log('Setting up database with service role key...')

  try {
    // First, execute the SQL to create tables using RPC
    console.log('Creating tables...')

    // Create categories table
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE IF NOT EXISTS categories (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          image_url TEXT,
          category_id UUID REFERENCES categories(id),
          stock_quantity INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS cart_items (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          product_id UUID REFERENCES products(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS orders (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          stripe_payment_intent_id VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS order_items (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
          product_id UUID REFERENCES products(id),
          quantity INTEGER NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS reviews (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          product_id UUID REFERENCES products(id) ON DELETE CASCADE,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
        ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
        ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
        ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
        ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Allow public read access on categories" ON categories;
        DROP POLICY IF EXISTS "Allow public read access on products" ON products;
        DROP POLICY IF EXISTS "Allow public read access on reviews" ON reviews;

        CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
        CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
        CREATE POLICY "Allow public read access on reviews" ON reviews FOR SELECT USING (true);
      `
    })

    if (createError) {
      console.log('Tables might already exist, continuing with data insertion...')
    } else {
      console.log('Tables created successfully!')
    }

    // Insert categories
    console.log('Inserting categories...')
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'name' })
      .select()

    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError)
      return
    }

    console.log('Categories inserted:', categoriesData?.length)

    // Insert products
    console.log('Inserting products...')
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
          console.error('Error inserting product:', product.name, productError)
        } else {
          console.log('✓ Inserted product:', product.name)
        }
      }
    }

    console.log('🎉 Database setup completed successfully!')

  } catch (error) {
    console.error('Error setting up database:', error)
  }
}

setupDatabase()
