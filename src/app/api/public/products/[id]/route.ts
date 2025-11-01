import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    console.log('Product Details API - Starting request for product:', productId);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/public/products/${productId}`;
    
    console.log('Product Details API - Calling:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Product Details API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Product Details API - Response text:', text.substring(0, 500));
      
      if (!text) {
        data = null;
      } else {
        data = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Product Details API - Parse error:', parseError);
      data = null;
    }
    
    if (response.status === 404) {
      return NextResponse.json(
        { status: 'error', message: 'Product not found' },
        { status: 404 }
      );
    }
    
    if (!response.ok || !data) {
      console.error('Product Details API - Error response');
      return NextResponse.json(
        { status: 'error', message: 'Failed to fetch product details' },
        { status: response.status || 500 }
      );
    }
    
    console.log('Product Details API - Success:', {
      productId: data.id,
      title: data.title,
      galleryCount: data.gallery?.length || 0
    });
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Product Details API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Unexpected failure' },
      { status: 500 }
    );
  }
}

