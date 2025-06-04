import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Groq API key not configured' },
        { status: 500 }
      )
    }

    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get current products and categories for context
    const [productsResponse, categoriesResponse] = await Promise.all([
      supabase.from('products').select('name, description, price, categories(name)').limit(20),
      supabase.from('categories').select('name, description')
    ])

    const products = productsResponse.data || []
    const categories = categoriesResponse.data || []

    // Create context about the store
    const storeContext = `
You are NexaBot, a helpful shopping assistant for NexaShop, a modern e-commerce platform. 

STORE INFORMATION:
- Store Name: NexaShop
- Tagline: "Modern E-commerce Platform"
- Features: Fast delivery, secure payments, 24/7 support, 30-day returns
- Free shipping on orders over $50

AVAILABLE CATEGORIES:
${categories.map(cat => `- ${cat.name}: ${cat.description}`).join('\n')}

SAMPLE PRODUCTS:
${products.slice(0, 10).map(product => 
  `- ${product.name} ($${product.price}) - ${product.description} [Category: ${product.categories?.name || 'N/A'}]`
).join('\n')}

CAPABILITIES:
- Help users find products
- Provide product recommendations
- Answer questions about shipping, returns, and policies
- Guide users through the shopping process
- Explain features and categories
- Help with account and order questions

GUIDELINES:
- Be friendly, helpful, and professional
- Keep responses concise but informative
- If asked about specific products not in the sample, suggest similar ones or direct to search
- For technical issues, suggest contacting support
- Always try to be helpful and guide users to what they need
- Use emojis sparingly but appropriately
- If you don't know something specific, be honest and suggest alternatives

Current user context: ${context || 'No additional context provided'}
`

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: storeContext
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    })

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text()
      console.error('Groq API error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Failed to get response from AI assistant' },
        { status: 500 }
      )
    }

    const groqData = await groqResponse.json()
    const aiResponse = groqData.choices?.[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json(
        { success: false, error: 'No response from AI assistant' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
