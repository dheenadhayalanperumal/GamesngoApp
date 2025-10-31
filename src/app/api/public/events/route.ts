import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Public Events API - Starting request');
    
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '10';
    const q = searchParams.get('q');
    const status = searchParams.get('status') || 'any';
    const filter = searchParams.get('filter') || searchParams.get('scope') || 'all';
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Build the URL with query params
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('perPage', perPage);
    if (q) params.append('q', q);
    if (status !== 'any') params.append('status', status);
    if (filter !== 'all') params.append('filter', filter);
    
    const url = `${apiUrl}/api/public/events?${params.toString()}`;
    
    console.log('Public Events API - Calling:', url);
    
    // Forward the request to the actual API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Public Events API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Public Events API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Public Events API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Public Events API - Parsed data:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Public Events API - Proxy error:', error);
    
    // Return fallback data to prevent site hanging
    return NextResponse.json(
      { 
        status: 'success',
        events: [],
        pagination: {
          page: 1,
          perPage: 10,
          total: 0,
          totalPages: 0,
          hasNext: false
        }
      },
      { status: 200 } // Return 200 so the site doesn't hang
    );
  }
}

