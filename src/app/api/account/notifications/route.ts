import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    console.log('Account Notifications API (GET) - Calling:', `${apiUrl}/api/account/notifications`);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(`${apiUrl}/api/account/notifications`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
    });

    console.log('Account Notifications API (GET) - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Account Notifications API (GET) - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Account Notifications API (GET) - Parse error:', parseError);
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
    console.error('Account Notifications API (GET) - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    // Get content type to determine if it's JSON or form data
    const contentType = request.headers.get('content-type') || '';
    
    let body;
    let requestBody;
    const requestHeaders: HeadersInit = {
      'Accept': 'application/json',
      ...(cookies ? { 'Cookie': cookies } : {}),
    };
    
    // Parse request body based on content type
    if (contentType.includes('application/json')) {
      try {
        body = await request.json();
        requestHeaders['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(body);
      } catch (parseError) {
        console.error('Account Notifications API (POST) - JSON Body parse error:', parseError);
        return NextResponse.json(
          { status: 'error', message: 'Invalid request body' },
          { status: 422 }
        );
      }
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      try {
        const formData = await request.formData();
        body = Object.fromEntries(formData.entries());
        // Convert form data values to proper types
        if (body.enabled === 'true' || body.enabled === '1') {
          body.enabled = true;
        } else if (body.enabled === 'false' || body.enabled === '0') {
          body.enabled = false;
        }
        // Send as JSON (API accepts both formats, JSON is simpler for forwarding)
        requestHeaders['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(body);
      } catch (parseError) {
        console.error('Account Notifications API (POST) - Form Data parse error:', parseError);
        return NextResponse.json(
          { status: 'error', message: 'Invalid request body' },
          { status: 422 }
        );
      }
    } else {
      // Try JSON first, fallback to form data
      try {
        const text = await request.text();
        body = JSON.parse(text);
        requestHeaders['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(body);
      } catch {
        return NextResponse.json(
          { status: 'error', message: 'Invalid request body format' },
          { status: 422 }
        );
      }
    }
    
    // Validate request body
    if (typeof body.enabled !== 'boolean') {
      return NextResponse.json(
        { status: 'error', message: 'Invalid value: enabled must be a boolean' },
        { status: 422 }
      );
    }
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    console.log('Account Notifications API (POST) - Calling:', `${apiUrl}/api/account/notifications`);
    console.log('Account Notifications API (POST) - Body:', body);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(`${apiUrl}/api/account/notifications`, {
      method: 'POST',
      headers: requestHeaders,
      credentials: 'include',
      body: requestBody,
    });

    console.log('Account Notifications API (POST) - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Account Notifications API (POST) - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Account Notifications API (POST) - Parse error:', parseError);
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
    console.error('Account Notifications API (POST) - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

