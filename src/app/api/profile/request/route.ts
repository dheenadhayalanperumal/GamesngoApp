import { NextRequest, NextResponse } from 'next/server';

function getCookiesHeader(request: NextRequest): Record<string, string> {
  const cookies = request.headers.get('cookie');
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  
  if (cookies) {
    headers['Cookie'] = cookies;
  }
  
  return headers;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Profile Request API - Starting request');
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/profile/request`;
    
    const body = await request.json();
    const cookieHeaders = getCookiesHeader(request);
    
    console.log('Profile Request API - Calling:', url);
    console.log('Profile Request API - Body:', body);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: cookieHeaders,
      credentials: 'include',
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    console.log('Profile Request API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Profile Request API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Profile Request API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Profile Request API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

