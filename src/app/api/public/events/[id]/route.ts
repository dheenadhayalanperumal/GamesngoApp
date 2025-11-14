import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Public Event Details API - Starting request for event:', id);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const scope = searchParams.get('scope');
    
    // Get cookies from the request for authenticated requests
    const cookies = request.headers.get('cookie');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Build the URL with optional query params
    const params_url = new URLSearchParams();
    if (status) params_url.append('status', status);
    if (scope) params_url.append('scope', scope);
    
    const queryString = params_url.toString();
    const url = `${apiUrl}/api/public/events/${id}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Public Event Details API - Calling:', url);
    
    // Forward the request to the actual API
    // Include cookies in headers if they exist (user is logged in)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: cookies ? 'include' : 'omit',
    });

    console.log('Public Event Details API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Public Event Details API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Public Event Details API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Public Event Details API - Parsed data:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Public Event Details API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

