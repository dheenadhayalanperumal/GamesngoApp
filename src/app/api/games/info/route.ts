import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Games Info API - Starting request');
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId') || searchParams.get('id');
    
    if (!gameId) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Game ID is required',
          reason: 'missing_game_id'
        },
        { status: 400 }
      );
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/games/info?gameId=${gameId}`;
    
    const cookies = request.headers.get('cookie');
    
    console.log('Games Info API - Calling:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Games Info API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Games Info API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Games Info API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Games Info API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}


