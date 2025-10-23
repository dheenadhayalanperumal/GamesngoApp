import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    // Forward the request to the actual API with cookies
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
      method: 'POST',
      headers: cookies ? { 'Cookie': cookies } : {},
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();
    
    // Create the response with cookies
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
