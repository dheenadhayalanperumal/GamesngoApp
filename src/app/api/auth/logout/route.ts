import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Forward the request to the external API
    const response = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();
    
    // Create response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Clear all authentication cookies on the server side
    const cookiesToClear = [
      'access_token',
      'refresh_token', 
      'registration_verified',
      'session_token',
      'auth_token',
      'token',
      'session',
      'auth',
      'jwt',
      'user_token',
      'gamesngo_session',
      'gamesngo_auth',
      'gamesngo_token'
    ];
    
    // Set cookies to expire immediately
    cookiesToClear.forEach(cookieName => {
      nextResponse.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    });
    
    // Also forward Set-Cookie headers from the external API if any
    const setCookieHeaders = response.headers.get('set-cookie');
    if (setCookieHeaders) {
      nextResponse.headers.set('Set-Cookie', setCookieHeaders);
    }
    
    console.log('🔐 Logout API: Cleared server-side cookies');
    return nextResponse;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}