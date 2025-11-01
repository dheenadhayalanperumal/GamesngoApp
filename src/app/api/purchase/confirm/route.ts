import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';

// Helper to forward cookies
const getCookiesHeader = (request: NextRequest): Record<string, string> => {
  const cookies = request.headers.get('cookie');
  return cookies ? { 'Cookie': cookies } : {};
};

// POST /api/purchase/confirm - Confirm Purchase
export async function POST(request: NextRequest) {
  try {
    console.log('Purchase Confirm API - Starting request');
    const url = `${API_BASE_URL}/api/purchase/confirm`;
    console.log('Purchase Confirm API - Calling:', url);

    // Get request body
    const body = await request.json();
    console.log('Purchase Confirm API - Request body:', body);

    const cookieHeaders = getCookiesHeader(request);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...cookieHeaders,
      },
      credentials: 'include',
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    console.log('Purchase Confirm API - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Purchase Confirm API - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Purchase Confirm API - Parse error:', parseError);
      data = null;
    }

    if (!response.ok || !data) {
      console.error(`Purchase Confirm API - Error for product_id ${body.product_id}, address_id ${body.address_id}`);
      return NextResponse.json(
        { 
          status: 'error', 
          message: data?.message || 'Failed to confirm purchase',
          walletCoins: data?.walletCoins,
          required: data?.required
        },
        { status: response.status === 404 ? 404 : response.status === 422 ? 422 : 500 }
      );
    }

    console.log('Purchase Confirm API - Parsed order data:', {
      orderNo: data.order?.orderNo,
      customerProductId: data.order?.customerProductId,
      status: data.order?.status,
      payable: data.order?.payable
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Purchase Confirm API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
