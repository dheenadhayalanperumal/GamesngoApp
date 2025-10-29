import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log('Game Details API - Request ID:', id);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com'}/api/public/games/${id}`;
    
    console.log('Game Details API - Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Game Details API - Response status:', response.status);

    const data = await response.json();
    console.log('Game Details API - Response data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Game Details API - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game details' },
      { status: 500 }
    );
  }
}
