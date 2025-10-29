import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shopId: string; outletId: string }> }
) {
  try {
    const { shopId, outletId } = await params;

    console.log('Vendor Outlet Offers API - Request params:', { shopId, outletId });

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com'}/api/public/vendors/${shopId}/outlets/${outletId}/offers`;
    
    console.log('Vendor Outlet Offers API - Calling:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('Vendor Outlet Offers API - Response status:', response.status);
    console.log('Vendor Outlet Offers API - Response data:', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Vendor Outlet Offers API - Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
