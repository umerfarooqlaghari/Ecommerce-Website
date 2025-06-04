import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useChatContext() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [context, setContext] = useState<string>('')

  useEffect(() => {
    let newContext = ''

    // Home page
    if (pathname === '/') {
      newContext = 'User is on the home page browsing featured products and categories'
    }

    // Products page
    else if (pathname === '/products') {
      const category = searchParams?.get('category')
      const search = searchParams?.get('search')

      if (category) {
        newContext = `User is browsing products filtered by category ID: ${category}`
      } else if (search) {
        newContext = `User is searching for products with query: "${search}"`
      } else {
        newContext = 'User is browsing all products'
      }
    }
    
    // Individual product page
    else if (pathname.startsWith('/products/')) {
      const productId = pathname.split('/products/')[1]
      newContext = `User is viewing a specific product with ID: ${productId}`
    }
    
    // Categories page
    else if (pathname === '/categories') {
      newContext = 'User is browsing product categories'
    }
    
    // Cart page
    else if (pathname === '/cart') {
      newContext = 'User is viewing their shopping cart'
    }
    
    // About page
    else if (pathname === '/about') {
      newContext = 'User is reading about NexaShop company information'
    }
    
    // Contact page
    else if (pathname === '/contact') {
      newContext = 'User is on the contact page looking for support'
    }
    
    // Auth pages
    else if (pathname.startsWith('/auth/')) {
      newContext = 'User is on authentication pages (sign in/sign up)'
    }
    
    // Profile/Account pages
    else if (pathname === '/profile') {
      newContext = 'User is viewing their profile page'
    } else if (pathname === '/orders') {
      newContext = 'User is viewing their order history'
    } else if (pathname === '/settings') {
      newContext = 'User is in account settings'
    } else if (pathname === '/wishlist') {
      newContext = 'User is viewing their wishlist'
    }
    
    // Default
    else {
      newContext = `User is on page: ${pathname}`
    }

    setContext(newContext)
  }, [pathname, searchParams])

  return context
}
