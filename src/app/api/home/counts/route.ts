import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Counts API - Starting request');
    
    // Get cookies from the request (access_token and refresh_token)
    const cookies = request.headers.get('cookie');
    console.log('Counts API - Has cookies:', !!cookies);
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const endpoint = `${apiUrl}/api/home/counts`;
    console.log('Counts API - Calling:', endpoint);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
    });

    console.log('Counts API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Counts API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Counts API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Counts API - Parsed data:', data);
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Counts API - Proxy error:', error);
    
    // Return a fallback response instead of error to prevent site hanging
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Unable to connect to server',
        counts: {
          coins: 0,
          vouchers: { unredeemed: 0 }
        }
      },
      { status: 200 } // Return 200 so the site doesn't hang
    );
  }
}

