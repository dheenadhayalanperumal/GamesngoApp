'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Client-side device detection and redirect component
 * This serves as a fallback if middleware doesn't work
 */
export default function DeviceRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on client side
    if (typeof window === 'undefined') return;

    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

    const currentPath = pathname;

    // Desktop user trying to access main app - redirect to landing
    if (!isMobile && currentPath !== '/landing' && !currentPath.startsWith('/api') && !currentPath.startsWith('/_next')) {
      console.log('[Client Redirect] Desktop user on', currentPath, '- redirecting to /landing');
      router.replace('/landing');
      return;
    }

    // Mobile user trying to access landing - redirect to home
    if (isMobile && currentPath === '/landing') {
      console.log('[Client Redirect] Mobile user on /landing - redirecting to /');
      router.replace('/');
      return;
    }

    // Desktop user on root - redirect to landing
    if (!isMobile && currentPath === '/') {
      console.log('[Client Redirect] Desktop user on root - redirecting to /landing');
      router.replace('/landing');
      return;
    }
  }, [pathname, router]);

  return null; // This component doesn't render anything
}

