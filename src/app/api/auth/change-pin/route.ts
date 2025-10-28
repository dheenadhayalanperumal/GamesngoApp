import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Change PIN API - Starting request');
    
    // Get cookies from the request (access_token and refresh_token)
    const cookies = request.headers.get('cookie');
    console.log('Change PIN API - Has cookies:', !!cookies);
    
    // Parse the request body
    const body = await request.json();
    console.log('Change PIN API - Request body:', body);
    
    // Validate required fields
    const { currentPin, newPin, confirmNewPin } = body;
    
    if (!currentPin || !newPin || !confirmNewPin) {
      return NextResponse.json(
        { status: 'error', message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate PIN format (4-6 digits)
    const pinRegex = /^\d{4,6}$/;
    if (!pinRegex.test(currentPin) || !pinRegex.test(newPin) || !pinRegex.test(confirmNewPin)) {
      return NextResponse.json(
        { status: 'error', message: 'PIN must be 4-6 digits' },
        { status: 422 }
      );
    }
    
    // Validate that new PIN and confirm PIN match
    if (newPin !== confirmNewPin) {
      return NextResponse.json(
        { status: 'error', message: 'New PIN and confirm PIN do not match' },
        { status: 422 }
      );
    }
    
    // Validate that new PIN is different from current PIN
    if (currentPin === newPin) {
      return NextResponse.json(
        { status: 'error', message: 'New PIN must be different from current PIN' },
        { status: 422 }
      );
    }
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const endpoint = `${apiUrl}/api/auth/change-pin`;
    console.log('Change PIN API - Calling:', endpoint);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      body: JSON.stringify({
        currentPin,
        newPin,
        confirmNewPin
      }),
    });

    console.log('Change PIN API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Change PIN API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Change PIN API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Change PIN API - Parsed data:', data);
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Change PIN API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
