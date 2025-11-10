import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.gamesngo.com';

// Helper to forward cookies
const getCookiesHeader = (request: NextRequest): Record<string, string> => {
  const cookies = request.headers.get('cookie');
  return cookies ? { 'Cookie': cookies } : {};
};

// GET /api/products/saved - Get list of saved products
export async function GET(request: NextRequest) {
  try {
    console.log('Products Saved API - GET - Starting request');
    const url = `${API_BASE_URL}/api/products/saved`;
    console.log('Products Saved API - GET - Calling:', url);

    const cookieHeaders = getCookiesHeader(request);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...cookieHeaders,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Products Saved API - GET - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Products Saved API - GET - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Products Saved API - GET - Parse error:', parseError);
      data = null;
    }

    // Handle specific error status codes
    if (!response.ok) {
      const statusCode = response.status;
      const errorMessage = data?.message || 'Failed to fetch saved products';
      
      if (statusCode === 401) {
        return NextResponse.json(
          { status: 'error', message: 'unauthorized' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { status: 'error', message: errorMessage },
        { status: statusCode }
      );
    }

    if (!data) {
      return NextResponse.json(
        { status: 'error', message: 'Empty response from server' },
        { status: 500 }
      );
    }

    console.log('Products Saved API - GET - Success:', {
      savedCount: data.saved?.length || 0
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Products Saved API - GET - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products/saved - Save a product to user's saved list
export async function POST(request: NextRequest) {
  try {
    console.log('Products Saved API - Starting request');
    const url = `${API_BASE_URL}/api/products/saved`;
    console.log('Products Saved API - Calling:', url);

    // Get request body as FormData
    const formData = await request.formData();
    
    console.log('Products Saved API - FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    // Validate productId
    const productId = formData.get('productId');
    if (!productId) {
      return NextResponse.json(
        { status: 'error', message: 'productId is required' },
        { status: 422 }
      );
    }

    const cookieHeaders = getCookiesHeader(request);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...cookieHeaders,
        // Don't set Content-Type for FormData - browser will set it automatically with boundary
      },
      credentials: 'include',
      body: formData,
      cache: 'no-store',
    });

    console.log('Products Saved API - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Products Saved API - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Products Saved API - Parse error:', parseError);
      data = null;
    }

    // Handle specific error status codes
    if (!response.ok) {
      const statusCode = response.status;
      const errorMessage = data?.message || 'Failed to save product';
      
      if (statusCode === 401) {
        return NextResponse.json(
          { status: 'error', message: 'unauthorized' },
          { status: 401 }
        );
      }
      
      if (statusCode === 404) {
        return NextResponse.json(
          { status: 'error', message: 'Product not found' },
          { status: 404 }
        );
      }
      
      if (statusCode === 409) {
        return NextResponse.json(
          { status: 'error', message: 'Product is not active' },
          { status: 409 }
        );
      }
      
      if (statusCode === 422) {
        return NextResponse.json(
          { status: 'error', message: errorMessage },
          { status: 422 }
        );
      }
      
      return NextResponse.json(
        { status: 'error', message: errorMessage },
        { status: statusCode }
      );
    }

    if (!data) {
      return NextResponse.json(
        { status: 'error', message: 'Empty response from server' },
        { status: 500 }
      );
    }

    console.log('Products Saved API - Success:', {
      productId: data.productId,
      saved: data.saved
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Products Saved API - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/saved - Remove a product from user's saved list
export async function DELETE(request: NextRequest) {
  try {
    console.log('Products Saved API - DELETE - Starting request');
    
    // Get request body as FormData
    const formData = await request.formData();
    
    console.log('Products Saved API - DELETE - FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    // Validate productId
    const productId = formData.get('productId');
    if (!productId) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid productId' },
        { status: 422 }
      );
    }

    const url = `${API_BASE_URL}/api/products/saved/${productId}`;
    console.log('Products Saved API - DELETE - Calling:', url);

    const cookieHeaders = getCookiesHeader(request);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        ...cookieHeaders,
        // Don't set Content-Type for FormData - browser will set it automatically with boundary
      },
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('Products Saved API - DELETE - Response status:', response.status);

    let data;
    try {
      const text = await response.text();
      console.log('Products Saved API - DELETE - Response text (first 500 chars):', text.substring(0, 500));
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error('Products Saved API - DELETE - Parse error:', parseError);
      data = null;
    }

    // Handle specific error status codes
    if (!response.ok) {
      const statusCode = response.status;
      const errorMessage = data?.message || 'Failed to remove product';
      
      if (statusCode === 401) {
        return NextResponse.json(
          { status: 'error', message: 'unauthorized' },
          { status: 401 }
        );
      }
      
      if (statusCode === 422) {
        return NextResponse.json(
          { status: 'error', message: errorMessage },
          { status: 422 }
        );
      }
      
      return NextResponse.json(
        { status: 'error', message: errorMessage },
        { status: statusCode }
      );
    }

    if (!data) {
      return NextResponse.json(
        { status: 'error', message: 'Empty response from server' },
        { status: 500 }
      );
    }

    console.log('Products Saved API - DELETE - Success:', {
      productId: data.productId,
      removed: data.removed
    });

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie headers for token rotation
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Products Saved API - DELETE - Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

