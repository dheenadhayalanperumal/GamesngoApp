import { NextRequest, NextResponse } from 'next/server';

// Function to detect if user is on mobile device
function isMobileDevice(userAgent: string): boolean {
  if (!userAgent) return false;
  
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;

  // Always allow API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const isMobile = isMobileDevice(userAgent);
  
  // Debug logging (check terminal/server logs for these)
  console.log('[Middleware]', { 
    pathname, 
    isMobile, 
    userAgent: userAgent ? userAgent.substring(0, 80) : 'no-user-agent' 
  });

  // If user is on mobile and trying to access landing page, redirect to home
  if (isMobile && pathname === '/landing') {
    console.log('Redirecting mobile user from /landing to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is on desktop and trying to access main app pages (not landing), redirect to landing
  if (!isMobile && pathname !== '/landing' && pathname !== '/') {
    console.log('Redirecting desktop user to /landing');
    return NextResponse.redirect(new URL('/landing', request.url));
  }

  // Handle root path: desktop -> landing, mobile -> home
  if (pathname === '/') {
    if (!isMobile) {
      console.log('Desktop user on root, redirecting to /landing');
      return NextResponse.redirect(new URL('/landing', request.url));
    }
    // Mobile users on root path can proceed
    return NextResponse.next();
  }

  // Allow all other requests (mobile users accessing main app, desktop users on landing)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

