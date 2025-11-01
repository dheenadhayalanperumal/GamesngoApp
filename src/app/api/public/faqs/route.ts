import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Public FAQs API - Starting request');
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    const url = `${apiUrl}/api/public/faqs`;
    
    console.log('Public FAQs API - Calling:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Public FAQs API - Response status:', response.status);
    
    let data;
    try {
      const text = await response.text();
      console.log('Public FAQs API - Response text:', text.substring(0, 500));
      data = text ? JSON.parse(text) : { status: 'error', reason: 'Empty response' };
    } catch (parseError) {
      console.error('Public FAQs API - Parse error:', parseError);
      data = { status: 'error', reason: 'Invalid JSON response' };
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Public FAQs API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', reason: 'Internal server error' },
      { status: 500 }
    );
  }
}

