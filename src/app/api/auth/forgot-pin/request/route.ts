import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const mobile = String(formData.get('mobile') || '').trim();

    if (!mobile) {
      return NextResponse.json(
        { status: 'error', message: 'Mobile is required' },
        { status: 400 }
      );
    }

    const cookies = request.headers.get('cookie') || '';
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const response = await fetch(`${apiUrl}/api/auth/forgot-pin/request`, {
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
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}


