import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Event Leaderboard API - Starting request for event:', id);
    
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '50';
    
    // Get cookies from the request for authenticated requests
    const cookies = request.headers.get('cookie');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Build the URL with query params
    const params_url = new URLSearchParams();
    params_url.append('page', page);
    params_url.append('perPage', perPage);
    
    const url = `${apiUrl}/api/public/events/${id}/leaderboard?${params_url.toString()}`;
    
    console.log('Event Leaderboard API - Calling:', url);
    
    // Forward the request to the actual API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
    });

    console.log('Event Leaderboard API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Event Leaderboard API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Event Leaderboard API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Event Leaderboard API - Parsed data:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Event Leaderboard API - Proxy error:', error);
    return NextResponse.json(
      { 
        status: 'success',
        leaderboard: [],
        pagination: {
          page: 1,
          perPage: 50,
          total: 0,
          totalPages: 0,
          hasNext: false
        },
        me: {
          joined: false,
          rank: null,
          score: null,
          position: null
        }
      },
      { status: 200 }
    );
  }
}

