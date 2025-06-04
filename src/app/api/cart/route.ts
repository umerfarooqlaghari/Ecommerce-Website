import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/cart - Get user's cart items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch cart items' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: cartItems || [],
      count: cartItems?.length || 0
    })
  } catch (error) {
    console.error('Error fetching cart items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart items' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, product_id, quantity = 1 } = body

    if (!user_id || !product_id) {
      return NextResponse.json(
        { success: false, error: 'User ID and Product ID are required' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user_id)
      .eq('product_id', product_id)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing cart item:', checkError)
      return NextResponse.json(
        { success: false, error: 'Failed to check cart' },
        { status: 500 }
      )
    }

    if (existingItem) {
      // Update quantity if item exists
      const { data: updatedItem, error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select(`
          *,
          product:products(*)
        `)
        .single()

      if (updateError) {
        console.error('Error updating cart item:', updateError)
        return NextResponse.json(
          { success: false, error: 'Failed to update cart item' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        data: updatedItem,
        message: 'Cart item updated'
      })
    } else {
      // Add new item to cart
      const { data: newItem, error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id,
          product_id,
          quantity
        })
        .select(`
          *,
          product:products(*)
        `)
        .single()

      if (insertError) {
        console.error('Error adding cart item:', insertError)
        return NextResponse.json(
          { success: false, error: 'Failed to add item to cart' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        data: newItem,
        message: 'Item added to cart'
      })
    }
  } catch (error) {
    console.error('Error processing cart request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process cart request' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { item_id, quantity } = body

    if (!item_id || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Item ID and quantity are required' },
        { status: 400 }
      )
    }

    if (quantity <= 0) {
      // Delete item if quantity is 0 or less
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', item_id)

      if (deleteError) {
        console.error('Error deleting cart item:', deleteError)
        return NextResponse.json(
          { success: false, error: 'Failed to remove item from cart' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart'
      })
    }

    const { data: updatedItem, error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', item_id)
      .select(`
        *,
        product:products(*)
      `)
      .single()

    if (updateError) {
      console.error('Error updating cart item:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update cart item' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: 'Cart item updated'
    })
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('item_id')
    const userId = searchParams.get('user_id')

    if (itemId) {
      // Delete specific item
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (error) {
        console.error('Error deleting cart item:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to remove item from cart' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart'
      })
    } else if (userId) {
      // Clear entire cart for user
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)

      if (error) {
        console.error('Error clearing cart:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to clear cart' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Cart cleared'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Item ID or User ID is required' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error deleting cart item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove item from cart' },
      { status: 500 }
    )
  }
}
