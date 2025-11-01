import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Public Today Offers API - Starting request');
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    
    const url = `${apiUrl}/api/public/products/today-offers`;
    
    console.log('Public Today Offers API - Calling:', url);
    
    // Forward the request to the actual API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching to always get fresh data
    });

    console.log('Public Today Offers API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Public Today Offers API - Response text:', text.substring(0, 500)); // Log first 500 chars
      data = text ? JSON.parse(text) : { categories: [], todayOffers: [], banners: [] };
    } catch (parseError) {
      console.error('Public Today Offers API - Parse error:', parseError);
      data = { categories: [], todayOffers: [], banners: [] };
    }
    
    console.log('Public Today Offers API - Parsed data:', {
      categoriesCount: data.categories?.length || 0,
      offersCount: data.todayOffers?.length || 0,
      bannersCount: data.banners?.length || 0
    });
    
    // Return the data directly (no status wrapper needed based on API doc)
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Public Today Offers API - Proxy error:', error);
    
    // Return fallback data to prevent site hanging
    return NextResponse.json(
      { 
        categories: [],
        todayOffers: [],
        banners: []
      },
      { status: 200 }
    );
  }
}

