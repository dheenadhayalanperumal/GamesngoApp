import { NextRequest, NextResponse } from 'next/server';

function getCookiesHeader(request: NextRequest): Record<string, string> {
  const cookies = request.headers.get('cookie');
  const headers: Record<string, string> = {};
  
  if (cookies) {
    headers['Cookie'] = cookies;
  }
  
  return headers;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Profile Update API - Starting request');
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/profile/update`;
    
    // Check if request has form data (multipart) or JSON
    const contentType = request.headers.get('content-type');
    let body: FormData | string;
    const cookieHeaders = getCookiesHeader(request);
    
    if (contentType?.includes('multipart/form-data')) {
      body = await request.formData();
      // Don't set Content-Type for FormData, browser will set it with boundary
    } else {
      body = JSON.stringify(await request.json());
      cookieHeaders['Content-Type'] = 'application/json';
      cookieHeaders['Accept'] = 'application/json';
    }
    
    console.log('Profile Update API - Calling:', url);
    console.log('Profile Update API - Content-Type:', contentType);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: cookieHeaders,
      credentials: 'include',
      body: body as BodyInit,
      cache: 'no-store',
    });

    console.log('Profile Update API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Profile Update API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Profile Update API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Profile Update API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

