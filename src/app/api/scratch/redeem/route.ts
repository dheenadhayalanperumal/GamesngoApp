import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse FormData instead of JSON
    const formData = await request.formData();
    const scratch_id = formData.get('scratch_id');
    console.log('Redeem API - Received scratch_id from FormData:', scratch_id);
    
    // Validate scratch_id - must be present and valid
    if (!scratch_id || scratch_id === 'undefined' || scratch_id === 'null' || scratch_id.toString().trim() === '') {
      console.error('Redeem API - Missing or invalid scratch_id:', scratch_id);
      return NextResponse.json(
        { status: 'error', message: 'scratch_id is required' },
        { status: 422 }
      );
    }
    
    // Validate scratch_id is a valid number
    const scratchIdNum = typeof scratch_id === 'number' ? scratch_id : parseInt(scratch_id.toString(), 10);
    if (isNaN(scratchIdNum) || scratchIdNum <= 0) {
      console.error('Redeem API - Invalid scratch_id value:', scratch_id);
      return NextResponse.json(
        { status: 'error', message: 'scratch_id must be a valid positive number' },
        { status: 422 }
      );
    }
    
    // Get cookies from the request
    const cookies = request.headers.get('cookie');
    console.log('Redeem API - Has cookies:', !!cookies);
    
    // Get the API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';
    console.log('Redeem API - Calling:', `${apiUrl}/api/scratch/redeem`);
    
    // Create FormData for forwarding to external API
    const externalFormData = new FormData();
    externalFormData.append('scratch_id', scratchIdNum.toString());
    
    // Forward the request to the actual API with cookies
    const response = await fetch(`${apiUrl}/api/scratch/redeem`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      credentials: 'include',
      body: externalFormData,
    });

    console.log('Redeem API - Response status:', response.status);
    
    // Try to parse response
    let data;
    try {
      const text = await response.text();
      console.log('Redeem API - Response text:', text);
      
      // Handle empty or whitespace-only responses
      const trimmedText = text ? text.trim() : '';
      if (!trimmedText) {
        // Provide a default error message based on status code
        if (response.status === 422) {
          data = { status: 'error', message: 'Invalid scratch card or validation failed' };
        } else if (response.status === 402) {
          data = { status: 'error', message: 'Not enough coins for extra scratch' };
        } else if (response.status === 404) {
          data = { status: 'error', message: 'Scratch card not found' };
        } else {
          data = { status: 'error', message: 'Empty response from server' };
        }
      } else {
        // Try to parse as JSON
        try {
          data = JSON.parse(trimmedText);
        } catch (jsonError) {
          // If it's not JSON, create an error object with the text as message
          console.error('Redeem API - JSON parse error:', jsonError);
          data = { 
            status: 'error', 
            message: trimmedText.length > 200 ? 'Invalid response format' : trimmedText 
          };
        }
      }
    } catch (parseError) {
      console.error('Redeem API - Parse error:', parseError);
      // Provide a default error message based on status code
      if (response.status === 422) {
        data = { status: 'error', message: 'Invalid scratch card or validation failed' };
      } else {
        data = { status: 'error', message: 'Failed to process response' };
      }
    }
    
    // Create the response
    const nextResponse = NextResponse.json(data, { status: response.status });
    
    // Forward Set-Cookie headers from the API response (in case of token rotation)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

