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

export async function GET(request: NextRequest) {
  try {
    console.log('Daily Games API - Starting request');
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/daily-games`;
    
    // Get cookies for authentication
    const cookieHeaders = getCookiesHeader(request);
    
    console.log('Daily Games API - Calling:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: cookieHeaders,
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Daily Games API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Daily Games API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Daily Games API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Daily Games API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

