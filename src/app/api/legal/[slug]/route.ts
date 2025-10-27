import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    console.log(`Legal Page API - Fetching: ${slug}`);
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Forward the request to the actual API
    const response = await fetch(`${apiUrl}/api/legal/${slug}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log(`Legal Page API - Response status: ${response.status}`);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Legal Page API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    return nextResponse;
  } catch (error) {
    console.error('Legal Page API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

