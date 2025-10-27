import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Redeem API - Request body:', body);
    
    if (!body.scratch_id) {
      console.error('Redeem API - Missing scratch_id');
      return NextResponse.json(
        { status: 'error', message: 'scratch_id is required' },
        { status: 422 }
      );
    }
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    console.log('Redeem API - Has cookies:', !!cookies);
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    console.log('Redeem API - Calling:', `${apiUrl}/api/scratch/redeem`);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(`${apiUrl}/api/scratch/redeem`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    console.log('Redeem API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Redeem API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Redeem API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

