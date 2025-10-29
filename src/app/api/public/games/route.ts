import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const category = searchParams.get('category');
    const type = searchParams.get('type') || 'Normal Game';
    const q = searchParams.get('q');
    const sort = searchParams.get('sort') || 'popularity';
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '12';

    console.log('Games API - Request params:', { categoryId, category, type, q, sort, page, perPage });

    let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com'}/api/public/games?`;
    
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (category) params.append('category', category);
    params.append('type', type);
    if (q) params.append('q', q);
    params.append('sort', sort);
    params.append('page', page);
    params.append('perPage', perPage);
    
    apiUrl += params.toString();
    
    console.log('Games API - Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Games API - Response status:', response.status);

    const data = await response.json();
    console.log('Games API - Response data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Games API - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games data' },
      { status: 500 }
    );
  }
}
