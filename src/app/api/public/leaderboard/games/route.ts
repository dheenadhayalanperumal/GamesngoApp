import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Leaderboard Games API - Starting request');
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'Normal Game';
    
    // Get cookies from the request (for authenticated requests)
    const cookies = request.headers.get('cookie');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Build the URL with query params
    const url = `${apiUrl}/api/public/leaderboard/games?type=${encodeURIComponent(type)}`;
    
    console.log('Leaderboard Games API - Calling:', url);
    
    // Forward the request to the actual API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
    });

    console.log('Leaderboard Games API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Leaderboard Games API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Leaderboard Games API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Leaderboard Games API - Parsed data:', data);
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Leaderboard Games API - Proxy error:', error);
    
    // Return fallback data to prevent site hanging
    return NextResponse.json(
      { 
        status: 'success',
        weekly: {
          leaderboard: [],
          prizes: [],
        },
        allTime: {
          leaderboard: [],
        },
      },
      { status: 200 } // Return 200 so the site doesn't hang
    );
  }
}

