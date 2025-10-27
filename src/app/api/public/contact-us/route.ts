import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Contact Us API - Request body:', body);
    
    // Validate required fields
    if (!body.full_name || !body.mobile_number || !body.email || !body.message) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'All fields are required',
          errors: {
            ...(body.full_name ? {} : { full_name: 'The full_name field is required.' }),
            ...(body.mobile_number ? {} : { mobile_number: 'The mobile_number field is required.' }),
            ...(body.email ? {} : { email: 'The email field is required.' }),
            ...(body.message ? {} : { message: 'The message field is required.' }),
          }
        },
        { status: 400 }
      );
    }
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    console.log('Contact Us API - Calling:', `${apiUrl}/api/public/contact-us`);
    
    // Forward the request to the actual API
    const response = await fetch(`${apiUrl}/api/public/contact-us`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Contact Us API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Contact Us API - Response text:', text);
      data = text ? JSON.parse(text) : { status: 'error', message: 'Empty response' };
    } catch (parseError) {
      console.error('Contact Us API - Parse error:', parseError);
      data = { status: 'error', message: 'Invalid JSON response' };
    }
    
    console.log('Contact Us API - Parsed data:', data);
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    return nextResponse;
  } catch (error) {
    console.error('Contact Us API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

