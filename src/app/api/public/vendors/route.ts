import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '12';

    console.log('Vendors API - Request params:', {
      q, city, state, page, perPage
    });

    // Build query string
    const queryParams = new URLSearchParams();
    if (q) queryParams.append('q', q);
    if (city) queryParams.append('city', city);
    if (state) queryParams.append('state', state);
    queryParams.append('page', page);
    queryParams.append('perPage', perPage);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com'}/api/public/vendors?${queryParams.toString()}`;
    
    console.log('Vendors API - Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('Vendors API - Response status:', response.status);
    console.log('Vendors API - Response data:', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Vendors API - Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
