import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Wallet Transactions API called');
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    console.log('📋 Wallet Transactions params:', { filter, page, perPage });

    // Validate pagination parameters
    if (page <= 0) {
      return NextResponse.json(
        { status: 'error', message: 'Page must be greater than 0' },
        { status: 422 }
      );
    }

    if (perPage < 1 || perPage > 50) {
      return NextResponse.json(
        { status: 'error', message: 'PerPage must be between 1 and 50' },
        { status: 422 }
      );
    }

    // Validate filter parameter
    if (!['all', 'earn', 'redeem'].includes(filter)) {
      return NextResponse.json(
        { status: 'error', message: 'Filter must be one of: all, earn, redeem' },
        { status: 422 }
      );
    }

    // Get cookies from the request
    const cookies = request.headers.get('cookie') || '';
    console.log('🍪 Cookies received:', cookies);

    // Prepare the external API URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const apiUrl = `${baseUrl}/api/wallet/transactions?filter=${filter}&page=${page}&perPage=${perPage}`;
    
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
    console.error('❌ Wallet Transactions API error:', error);
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
