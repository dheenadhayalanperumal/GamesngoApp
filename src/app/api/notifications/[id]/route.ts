import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔔 Notification Detail API called for ID:', id);
    
    // Validate id parameter
    const idNum = parseInt(id, 10);
    if (isNaN(idNum) || idNum <= 0) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid notification ID' },
        { status: 422 }
      );
    }

    // Get cookies from the request
    const cookies = request.headers.get('cookie') || '';
    console.log('🍪 Cookies received:', cookies);

    // Prepare the external API URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const apiUrl = `${baseUrl}/api/notifications/${idNum}`;
    
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
    console.error('❌ Notification Detail API error:', error);
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

