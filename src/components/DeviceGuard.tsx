'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface DeviceGuardProps {
  children: React.ReactNode;
}

const DeviceGuard: React.FC<DeviceGuardProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Function to detect if device is mobile
    const checkMobile = () => {
      if (typeof window === 'undefined') return false;
      
      // Get user agent string (opera is rarely needed, so we'll skip it to avoid type issues)
      const userAgent = navigator.userAgent || navigator.vendor || '';
      
      // Check for mobile devices
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent.toLowerCase());
      
      // Also check screen width as a fallback (tablets in portrait might be considered mobile)
      const isSmallScreen = window.innerWidth <= 768;
      
      return isMobileDevice || isSmallScreen;
    };

    const mobile = checkMobile();
    setIsMobile(mobile);
    setIsChecking(false);

    // If not mobile and not on landing page, redirect to landing page
    if (!mobile && pathname !== '/landing') {
      router.replace('/landing');
    }
  }, [pathname, router]);

  // Show nothing while checking (prevents flash of content)
  if (isChecking || isMobile === null) {
    return null;
  }

  // If not mobile and trying to access non-landing page, show nothing (redirect will happen)
  if (!isMobile && pathname !== '/landing') {
    return null;
  }

  // Allow mobile users to access all pages, and everyone to access landing page
  return <>{children}</>;
};

export default DeviceGuard;

