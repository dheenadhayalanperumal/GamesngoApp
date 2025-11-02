import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Vendor Offer Game API - Starting request');
    
    // Get cookies from the request (access_token and refresh_token)
    const cookies = request.headers.get('cookie');
    console.log('Vendor Offer Game API - Has cookies:', !!cookies);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get('offerId') || searchParams.get('offer_id');
    
    console.log('Vendor Offer Game API - Query params:', { offerId });
    
    // Validate parameters
    if (!offerId) {
      return NextResponse.json(
        { status: 'error', reason: 'missing_offer', message: 'offerId not provided' },
        { status: 422 }
      );
    }
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const endpoint = `${apiUrl}/api/games/vendors/offer-game`;
    console.log('Vendor Offer Game API - Calling:', endpoint);
    
    // Build query string
    const queryParams = new URLSearchParams({
      offerId: offerId,
    });
    
    const fullUrl = `${endpoint}?${queryParams}`;
    console.log('Vendor Offer Game API - Full URL:', fullUrl);
    
    // Forward the request to the actual API with cookies
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
    });

    console.log('Vendor Offer Game API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Vendor Offer Game API - Response text:', text);
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Vendor Offer Game API - Failed to parse response:', parseError);
      return NextResponse.json(
        { status: 'error', message: 'Invalid response from server' },
        { status: 500 }
      );
    }

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Vendor Offer Game API - Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

