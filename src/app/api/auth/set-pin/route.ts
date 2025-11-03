import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pin = String(formData.get('pin') || '').trim();
    const confirmPin = String(formData.get('confirmPin') || '').trim();

    if (!pin || !confirmPin) {
      return NextResponse.json(
        { status: 'error', message: 'PIN and Confirm PIN are required' },
        { status: 400 }
      );
    }

    if (pin !== confirmPin) {
      return NextResponse.json(
        { status: 'error', message: 'PINs do not match' },
        { status: 422 }
      );
    }

    const cookies = request.headers.get('cookie') || '';
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const response = await fetch(`${apiUrl}/api/auth/set-pin`, {
      method: 'POST',
      headers: cookies ? { 'Cookie': cookies } : {},
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();
    const nextResponse = NextResponse.json(data, { status: response.status });

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Set PIN API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}