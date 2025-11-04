import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔔 Notifications API (list) called');
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';
    const afterId = searchParams.get('afterId');

    // Validate limit parameter
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
      return NextResponse.json(
        { status: 'error', message: 'Limit must be between 1 and 50' },
        { status: 422 }
      );
    }

    // Build query string
    let queryString = `limit=${limitNum}`;
    if (afterId) {
      const afterIdNum = parseInt(afterId, 10);
      if (isNaN(afterIdNum) || afterIdNum <= 0) {
        return NextResponse.json(
          { status: 'error', message: 'afterId must be a valid positive number' },
          { status: 422 }
        );
      }
      queryString += `&afterId=${afterIdNum}`;
    }

    // Get cookies from the request
    const cookies = request.headers.get('cookie') || '';
    console.log('🍪 Cookies received:', cookies);

    // Prepare the external API URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const apiUrl = `${baseUrl}/api/notifications?${queryString}`;
    
    console.log('🌐 Calling external API:', apiUrl);

    // Forward the request to the external API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies for authentication
      },
    });

    console.log('📡 External API response status:', response.status);

    const data = await response.json();
    console.log('📊 External API response data:', data);

    // Forward the response with proper headers
    const responseHeaders = new Headers();
    
    // Forward Set-Cookie headers from the external API
    const setCookieHeaders = response.headers.get('set-cookie');
    if (setCookieHeaders) {
      console.log('🍪 Forwarding Set-Cookie headers:', setCookieHeaders);
      responseHeaders.set('Set-Cookie', setCookieHeaders);
    }

    // Return the response with proper status
    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('❌ Notifications API (list) error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

