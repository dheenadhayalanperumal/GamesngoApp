import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scratch_id = searchParams.get('scratch_id');
    
    console.log('Quote API - Received scratch_id:', scratch_id);
    
    // Validate scratch_id - must be present and not empty
    if (!scratch_id || scratch_id.trim() === '' || scratch_id === 'undefined' || scratch_id === 'null') {
      console.error('Quote API - Missing or invalid scratch_id');
      return NextResponse.json(
        { status: 'error', message: 'scratch_id is required' },
        { status: 422 }
      );
    }
    
    // Validate scratch_id is a valid number
    const scratchIdNum = parseInt(scratch_id, 10);
    if (isNaN(scratchIdNum) || scratchIdNum <= 0) {
      console.error('Quote API - Invalid scratch_id value:', scratch_id);
      return NextResponse.json(
        { status: 'error', message: 'scratch_id must be a valid positive number' },
        { status: 422 }
      );
    }
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Forward the request to the actual API with cookies
    const response = await fetch(`${apiUrl}/api/scratch/quote?scratch_id=${scratchIdNum}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Quote API (POST) - Request body:', body);
    
    // Validate scratch_id - must be present and valid
    if (!body.scratch_id || body.scratch_id === 'undefined' || body.scratch_id === 'null') {
      console.error('Quote API (POST) - Missing or invalid scratch_id');
      return NextResponse.json(
        { status: 'error', message: 'scratch_id is required' },
        { status: 422 }
      );
    }
    
    // Validate scratch_id is a valid number
    const scratchIdNum = typeof body.scratch_id === 'number' ? body.scratch_id : parseInt(body.scratch_id, 10);
    if (isNaN(scratchIdNum) || scratchIdNum <= 0) {
      console.error('Quote API (POST) - Invalid scratch_id value:', body.scratch_id);
      return NextResponse.json(
        { status: 'error', message: 'scratch_id must be a valid positive number' },
        { status: 422 }
      );
    }
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    // Forward the request to the actual API with cookies
    const response = await fetch(`${apiUrl}/api/scratch/quote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
      body: JSON.stringify({ scratch_id: scratchIdNum }),
    });

    const data = await response.json();
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

