import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Public Home API - Starting request');
    
    const { searchParams } = new URL(request.url);
    const only = searchParams.get('only');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Build the URL with query params if provided
    const url = only 
      ? `${apiUrl}/api/public/home?only=${only}`
      : `${apiUrl}/api/public/home`;
    
    console.log('Public Home API - Calling:', url);
    
    // Forward the request to the actual API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Public Home API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Public Home API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Public Home API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Public Home API - Parsed data:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Public Home API - Proxy error:', error);
    
    // Return fallback data to prevent site hanging
    return NextResponse.json(
      { 
        status: 'success', 
        home: {
          popularGames: [],
          dailyScratch: null,
          restaurants: [],
          banners: []
        }
      },
      { status: 200 } // Return 200 so the site doesn't hang
    );
  }
}
