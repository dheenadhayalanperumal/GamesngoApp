import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';

// Helper to forward cookies
const getCookiesHeader = (request: NextRequest) => {
  const cookies = request.headers.get('cookie');
  return cookies ? { 'Cookie': cookies } : {};
};

// POST /api/purchase/quote - Get Purchase Quote
export async function POST(request: NextRequest) {
  try {
    console.log('Purchase Quote API - Starting request');
    const url = `${API_BASE_URL}/api/purchase/quote`;
    console.log('Purchase Quote API - Calling:', url);

    // Get request body
    const body = await request.json();
    console.log('Purchase Quote API - Request body:', body);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...getCookiesHeader(request),
      },
      credentials: 'include',
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    console.log('Purchase Quote API - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Purchase Quote API - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Purchase Quote API - Parse error:', parseError);
      data = null;
    }

    if (!response.ok || !data) {
      console.error(`Purchase Quote API - Error for product_id ${body.product_id}`);
      return NextResponse.json(
        { status: 'error', message: data?.message || 'Failed to get quote' },
        { status: response.status === 404 ? 404 : response.status === 422 ? 422 : 500 }
      );
    }

    console.log('Purchase Quote API - Parsed quote data:', {
      productId: data.quote?.product?.id,
      qty: data.quote?.qty,
      payable: data.quote?.payable,
      canProceed: data.quote?.canProceed
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Purchase Quote API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
