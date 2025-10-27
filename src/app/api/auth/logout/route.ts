import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('Logout API - Clearing authentication cookies');
    
    // Create success response
    const nextResponse = NextResponse.json(
      { status: 'success', message: 'Logged out successfully' },
      { status: 200 }
    );
    
    // Clear all auth cookies on the client side
    // Note: The external API doesn't have a logout endpoint,
    // so we just clear the cookies client-side
    nextResponse.cookies.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    nextResponse.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    nextResponse.cookies.set('registration_verified', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    console.log('Logout API - Cookies cleared successfully');
    
    return nextResponse;
  } catch (error) {
    console.error('Logout API - Error:', error);
    
    // Even if there's an error, clear cookies and return success
    const nextResponse = NextResponse.json(
      { status: 'success', message: 'Logged out' },
      { status: 200 }
    );
    
    // Clear cookies
    nextResponse.cookies.set('access_token', '', { maxAge: 0, path: '/' });
    nextResponse.cookies.set('refresh_token', '', { maxAge: 0, path: '/' });
    nextResponse.cookies.set('registration_verified', '', { maxAge: 0, path: '/' });
    
    return nextResponse;
  }
}

