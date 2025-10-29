import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'Normal Game';
    const perPage = searchParams.get('perPage') || '12';

    console.log('Games Init API - Request params:', { type, perPage });

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com'}/api/public/games/init?type=${encodeURIComponent(type)}&perPage=${perPage}`;
    
    console.log('Games Init API - Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Games Init API - Response status:', response.status);

    const data = await response.json();
    console.log('Games Init API - Response data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Games Init API - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games init data' },
      { status: 500 }
    );
  }
}
