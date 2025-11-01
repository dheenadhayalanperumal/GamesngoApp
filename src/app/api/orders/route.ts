import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';

// Helper to forward cookies
const getCookiesHeader = (request: NextRequest) => {
  const cookies = request.headers.get('cookie');
  return cookies ? { 'Cookie': cookies } : {};
};

// GET /api/orders - List Orders
export async function GET(request: NextRequest) {
  try {
    console.log('Orders API (GET) - Starting request');
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    
    const url = `${API_BASE_URL}/api/orders?limit=${limit}`;
    console.log('Orders API (GET) - Calling:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...getCookiesHeader(request),
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Orders API (GET) - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Orders API (GET) - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Orders API (GET) - Parse error:', parseError);
      data = null;
    }

    if (!response.ok || !data) {
      console.error('Orders API (GET) - Error fetching orders');
      return NextResponse.json(
        { status: 'error', message: data?.message || 'Failed to fetch orders' },
        { status: response.status === 401 ? 401 : 500 }
      );
    }

    console.log('Orders API (GET) - Parsed orders data:', {
      ordersCount: data.orders?.length || 0
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Orders API (GET) - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

