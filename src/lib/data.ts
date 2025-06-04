// Mock database with dummy data for development
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: string
  stripe_payment_intent_id: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  product_id: string
  rating: number
  comment: string
  created_at: string
}

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Everything for your home and garden',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Sports',
    description: 'Sports equipment and fitness gear',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Books',
    description: 'Books, magazines, and educational materials',
    created_at: '2024-01-01T00:00:00Z'
  }
]

// Mock Products
export const products: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999.99,
    image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    category_id: '1',
    stock_quantity: 50,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'Powerful laptop with M3 chip and all-day battery life',
    price: 1299.99,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    category_id: '1',
    stock_quantity: 30,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-canceling wireless headphones',
    price: 399.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category_id: '1',
    stock_quantity: 75,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Samsung 4K Smart TV',
    description: '55-inch 4K UHD Smart TV with HDR and streaming apps',
    price: 799.99,
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    category_id: '1',
    stock_quantity: 25,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Fashion
  {
    id: '5',
    name: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern fit',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category_id: '2',
    stock_quantity: 40,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Classic Denim Jeans',
    description: 'Comfortable straight-fit denim jeans in classic blue',
    price: 79.99,
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category_id: '2',
    stock_quantity: 100,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Luxury Watch',
    description: 'Elegant stainless steel watch with automatic movement',
    price: 599.99,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category_id: '2',
    stock_quantity: 20,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    name: 'Designer Sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear',
    price: 149.99,
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    category_id: '2',
    stock_quantity: 60,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Home & Garden
  {
    id: '9',
    name: 'Modern Coffee Table',
    description: 'Sleek glass-top coffee table with wooden legs',
    price: 249.99,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    category_id: '3',
    stock_quantity: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    name: 'Indoor Plant Set',
    description: 'Collection of 3 low-maintenance indoor plants with pots',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    category_id: '3',
    stock_quantity: 35,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sports
  {
    id: '11',
    name: 'Professional Tennis Racket',
    description: 'High-quality tennis racket for intermediate to advanced players',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
    category_id: '4',
    stock_quantity: 25,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    description: 'Non-slip premium yoga mat with carrying strap',
    price: 49.99,
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    category_id: '4',
    stock_quantity: 80,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Books
  {
    id: '13',
    name: 'JavaScript: The Complete Guide',
    description: 'Comprehensive guide to modern JavaScript development',
    price: 39.99,
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    category_id: '5',
    stock_quantity: 50,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '14',
    name: 'Design Thinking Handbook',
    description: 'Learn the principles and practices of design thinking',
    price: 29.99,
    image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    category_id: '5',
    stock_quantity: 40,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Mock Reviews
export const reviews: Review[] = [
  {
    id: '1',
    user_id: 'user1',
    product_id: '1',
    rating: 5,
    comment: 'Amazing phone! The camera quality is outstanding.',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    user_id: 'user2',
    product_id: '1',
    rating: 4,
    comment: 'Great phone but a bit expensive.',
    created_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    user_id: 'user3',
    product_id: '2',
    rating: 5,
    comment: 'Perfect laptop for work and creative tasks.',
    created_at: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    user_id: 'user4',
    product_id: '3',
    rating: 5,
    comment: 'Best noise-canceling headphones I\'ve ever used!',
    created_at: '2024-01-18T00:00:00Z'
  }
]

// Helper functions to simulate database operations
export const getProducts = (categoryId?: string, limit?: number) => {
  let filteredProducts = categoryId 
    ? products.filter(p => p.category_id === categoryId)
    : products
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit)
  }
  
  return filteredProducts
}

export const getProductById = (id: string) => {
  return products.find(p => p.id === id)
}

export const getCategories = () => {
  return categories
}

export const getCategoryById = (id: string) => {
  return categories.find(c => c.id === id)
}

export const getReviewsByProductId = (productId: string) => {
  return reviews.filter(r => r.product_id === productId)
}

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  )
}
