import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', params.id)
      .single()

    if (categoryError || !category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      )
    }

    // Fetch products in this category
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          description
        )
      `)
      .eq('category_id', params.id)
      .order('name')

    if (productsError) {
      console.error('Error fetching products:', productsError)
    }

    return NextResponse.json({
      success: true,
      data: {
        ...category,
        products: products || []
      }
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}
