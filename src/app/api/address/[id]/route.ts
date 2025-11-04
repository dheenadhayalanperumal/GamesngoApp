import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Address API - Updating address:', id);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/address/${id}`;
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    // Get request body as FormData or JSON
    const contentType = request.headers.get('content-type');
    let body;
    
    if (contentType?.includes('application/json')) {
      // Handle JSON request
      body = JSON.stringify(await request.json());
    } else {
      // Handle FormData request
      body = await request.formData();
    }
    
    console.log('Address API - Calling:', url);
    
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...(cookies ? { 'Cookie': cookies } : {}),
    };
    
    if (contentType?.includes('application/json')) {
      headers['Content-Type'] = 'application/json';
    }
    // Don't set Content-Type for FormData - browser will set it automatically with boundary
    
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: body as BodyInit,
      cache: 'no-store',
    });

    console.log('Address API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Address API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Address API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Address API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Address API - Deleting address:', id);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/address/${id}`;
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    console.log('Address API - Calling:', url);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Address API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Address API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Address API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Address API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

