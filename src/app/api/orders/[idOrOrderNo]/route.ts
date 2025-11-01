import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';

// Helper to forward cookies
const getCookiesHeader = (request: NextRequest): Record<string, string> => {
  const cookies = request.headers.get('cookie');
  return cookies ? { 'Cookie': cookies } : {};
};

// GET /api/orders/{idOrOrderNo} - Get Order Details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ idOrOrderNo: string }> }
) {
  try {
    const resolvedParams = await params;
    const idOrOrderNo = resolvedParams.idOrOrderNo;
    
    console.log(`Orders Details API (GET) - Starting request for: ${idOrOrderNo}`);
    const url = `${API_BASE_URL}/api/orders/${idOrOrderNo}`;
    console.log('Orders Details API (GET) - Calling:', url);

    const cookieHeaders = getCookiesHeader(request);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...cookieHeaders,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Orders Details API (GET) - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Orders Details API (GET) - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Orders Details API (GET) - Parse error:', parseError);
      data = null;
    }

    if (!response.ok || !data) {
      console.error(`Orders Details API (GET) - Order not found for: ${idOrOrderNo}`);
      return NextResponse.json(
        { status: 'error', message: data?.message || 'Order not found' },
        { status: response.status === 404 ? 404 : response.status === 401 ? 401 : 500 }
      );
    }

    console.log('Orders Details API (GET) - Parsed order data:', {
      orderNo: data.order?.orderNo,
      status: data.order?.status
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Orders Details API (GET) - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

