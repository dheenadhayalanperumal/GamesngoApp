import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { shopId: string } }
) {
  try {
    const { shopId } = params;

    console.log('Vendor Outlets API - Request params:', { shopId });

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com'}/api/public/vendors/${shopId}/outlets`;
    
    console.log('Vendor Outlets API - Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('Vendor Outlets API - Response status:', response.status);
    console.log('Vendor Outlets API - Response data:', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Vendor Outlets API - Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
