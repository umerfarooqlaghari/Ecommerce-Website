-- NexaShop Database Setup
-- Run this SQL in your Supabase Dashboard SQL Editor

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

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Latest gadgets and electronic devices'),
('Fashion', 'Trendy clothing and accessories'),
('Home & Garden', 'Everything for your home and garden'),
('Sports', 'Sports equipment and fitness gear'),
('Books', 'Books, magazines, and educational materials')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category_id, stock_quantity) VALUES
-- Electronics
('iPhone 15 Pro', 'Latest iPhone with advanced camera system and A17 Pro chip', 999.99, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', (SELECT id FROM categories WHERE name = 'Electronics'), 50),
('MacBook Air M3', 'Powerful laptop with M3 chip and all-day battery life', 1299.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', (SELECT id FROM categories WHERE name = 'Electronics'), 30),
('Sony WH-1000XM5', 'Premium noise-canceling wireless headphones', 399.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', (SELECT id FROM categories WHERE name = 'Electronics'), 75),
('Samsung 4K Smart TV', '55-inch 4K UHD Smart TV with HDR and streaming apps', 799.99, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', (SELECT id FROM categories WHERE name = 'Electronics'), 25),
('iPad Pro 12.9"', 'Professional tablet with M2 chip and Liquid Retina display', 1099.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', (SELECT id FROM categories WHERE name = 'Electronics'), 40),
('AirPods Pro 2', 'Advanced noise cancellation with spatial audio', 249.99, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500', (SELECT id FROM categories WHERE name = 'Electronics'), 100),

-- Fashion
('Designer Leather Jacket', 'Premium genuine leather jacket with modern fit', 299.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', (SELECT id FROM categories WHERE name = 'Fashion'), 40),
('Classic Denim Jeans', 'Comfortable straight-fit denim jeans in classic blue', 79.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', (SELECT id FROM categories WHERE name = 'Fashion'), 100),
('Luxury Watch', 'Elegant stainless steel watch with automatic movement', 599.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', (SELECT id FROM categories WHERE name = 'Fashion'), 20),
('Designer Sneakers', 'Comfortable and stylish sneakers for everyday wear', 149.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', (SELECT id FROM categories WHERE name = 'Fashion'), 60),
('Silk Dress', 'Elegant silk dress perfect for special occasions', 189.99, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', (SELECT id FROM categories WHERE name = 'Fashion'), 35),
('Wool Sweater', 'Cozy merino wool sweater in multiple colors', 89.99, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', (SELECT id FROM categories WHERE name = 'Fashion'), 80),

-- Home & Garden
('Modern Coffee Table', 'Sleek glass-top coffee table with wooden legs', 249.99, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', (SELECT id FROM categories WHERE name = 'Home & Garden'), 15),
('Indoor Plant Set', 'Collection of 3 low-maintenance indoor plants with pots', 89.99, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500', (SELECT id FROM categories WHERE name = 'Home & Garden'), 35),
('Ergonomic Office Chair', 'Comfortable office chair with lumbar support', 299.99, 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500', (SELECT id FROM categories WHERE name = 'Home & Garden'), 25),
('LED Desk Lamp', 'Adjustable LED desk lamp with USB charging port', 59.99, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', (SELECT id FROM categories WHERE name = 'Home & Garden'), 50),

-- Sports
('Professional Tennis Racket', 'High-quality tennis racket for intermediate to advanced players', 199.99, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', (SELECT id FROM categories WHERE name = 'Sports'), 25),
('Yoga Mat Premium', 'Non-slip premium yoga mat with carrying strap', 49.99, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', (SELECT id FROM categories WHERE name = 'Sports'), 80),
('Running Shoes', 'Lightweight running shoes with advanced cushioning', 129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', (SELECT id FROM categories WHERE name = 'Sports'), 60),
('Fitness Tracker', 'Advanced fitness tracker with heart rate monitoring', 199.99, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500', (SELECT id FROM categories WHERE name = 'Sports'), 45),

-- Books
('JavaScript: The Complete Guide', 'Comprehensive guide to modern JavaScript development', 39.99, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', (SELECT id FROM categories WHERE name = 'Books'), 50),
('Design Thinking Handbook', 'Learn the principles and practices of design thinking', 29.99, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', (SELECT id FROM categories WHERE name = 'Books'), 40),
('The Art of Photography', 'Master the techniques of professional photography', 45.99, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', (SELECT id FROM categories WHERE name = 'Books'), 30),
('Cooking Masterclass', 'Learn to cook like a professional chef', 34.99, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', (SELECT id FROM categories WHERE name = 'Books'), 55)
ON CONFLICT DO NOTHING;
