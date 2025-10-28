import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Vendor Vouchers API - Starting request');
    
    // Get cookies from the request (access_token and refresh_token)
    const cookies = request.headers.get('cookie');
    console.log('Vendor Vouchers API - Has cookies:', !!cookies);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = Math.min(parseInt(searchParams.get('perPage') || '10'), 50);
    
    console.log('Vendor Vouchers API - Query params:', { filter, page, perPage });
    
    // Validate parameters
    if (page < 1) {
      return NextResponse.json(
        { status: 'error', message: 'Page must be 1 or greater' },
        { status: 422 }
      );
    }
    
    if (perPage < 1 || perPage > 50) {
      return NextResponse.json(
        { status: 'error', message: 'perPage must be between 1 and 50' },
        { status: 422 }
      );
    }
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const endpoint = `${apiUrl}/api/vendor/vouchers`;
    console.log('Vendor Vouchers API - Calling:', endpoint);
    
    // Build query string
    const queryParams = new URLSearchParams({
      filter,
      page: page.toString(),
      perPage: perPage.toString()
    });
    
    const fullUrl = `${endpoint}?${queryParams}`;
    console.log('Vendor Vouchers API - Full URL:', fullUrl);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
    });

    console.log('Vendor Vouchers API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Vendor Vouchers API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Vendor Vouchers API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Vendor Vouchers API - Parsed data:', data);
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Vendor Vouchers API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
