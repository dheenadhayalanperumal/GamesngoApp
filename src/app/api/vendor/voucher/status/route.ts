import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Vendor Voucher Status API - Starting request');
    
    // Get cookies from the request (access_token and refresh_token)
    const cookies = request.headers.get('cookie');
    console.log('Vendor Voucher Status API - Has cookies:', !!cookies);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const voucherId = searchParams.get('voucherId');
    const offerId = searchParams.get('offerId');
    
    console.log('Vendor Voucher Status API - Query params:', { voucherId, offerId });
    
    // Validate parameters - at least one is required
    if (!voucherId && !offerId) {
      return NextResponse.json(
        { status: 'error', message: 'Either voucherId or offerId is required' },
        { status: 422 }
      );
    }
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const endpoint = `${apiUrl}/api/vendor/voucher/status`;
    console.log('Vendor Voucher Status API - Calling:', endpoint);
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (voucherId) queryParams.append('voucherId', voucherId);
    if (offerId) queryParams.append('offerId', offerId);
    
    const fullUrl = `${endpoint}?${queryParams}`;
    console.log('Vendor Voucher Status API - Full URL:', fullUrl);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
    });

    console.log('Vendor Voucher Status API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Vendor Voucher Status API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Vendor Voucher Status API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Vendor Voucher Status API - Parsed data:', data);
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Vendor Voucher Status API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
