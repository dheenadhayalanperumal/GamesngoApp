import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '50';

    console.log('Category Products API - Starting request for category:', categoryId);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/public/products/category/${categoryId}?limit=${limit}`;
    
    console.log('Category Products API - Calling:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Category Products API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Category Products API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { category: { id: Number(categoryId), name: '', slug: '' }, products: [] };
    } catch (parseError) {
      console.error('Category Products API - Parse error:', parseError);
      data = { category: { id: Number(categoryId), name: '', slug: '' }, products: [] };
    }
    
    console.log('Category Products API - Parsed data:', {
      categoryId: data.category?.id,
      categoryName: data.category?.name,
      productsCount: data.products?.length || 0
    });
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Category Products API - Proxy error:', error);
    return NextResponse.json(
      { category: { id: Number(params.id), name: '', slug: '' }, products: [] },
      { status: 200 }
    );
  }
}

