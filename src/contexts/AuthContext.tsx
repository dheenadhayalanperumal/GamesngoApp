'use client';

import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use useRef to persist login state across re-renders
  const loginStateRef = useRef<boolean>(false);
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize login state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 Auth: Initializing authentication...');
      try {
        // Check if user is logged in by trying to fetch user data
        const response = await fetch('/api/home/counts', {
          method: 'GET',
          credentials: 'include',
        });

        console.log('🔐 Auth: Counts API response status:', response.status);
        const data = await response.json();
        console.log('🔐 Auth: Counts API response data:', data);
        
        if (response.ok && data.status === 'success') {
          console.log('🔐 Auth: User is logged in');
          loginStateRef.current = true;
          setIsLoggedInState(true);
        } else {
          console.log('🔐 Auth: User is not logged in');
          loginStateRef.current = false;
          setIsLoggedInState(false);
        }
      } catch (error) {
        console.error('🔐 Auth: Error checking login status:', error);
        loginStateRef.current = false;
        setIsLoggedInState(false);
      } finally {
        console.log('🔐 Auth: Authentication check complete, setting loading to false');
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setIsLoggedIn = (value: boolean) => {
    console.log('🔐 Auth: Setting login state to:', value);
    loginStateRef.current = value;
    setIsLoggedInState(value);
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', value.toString());
    }
  };

  const login = () => {
    console.log('🔐 Auth: User logged in');
    setIsLoggedIn(true);
  };

  const clearCookies = () => {
    if (typeof window !== 'undefined') {
      // Clear authentication cookies by setting them to expire in the past
      const cookiesToClear = [
        'access_token',
        'refresh_token', 
        'registration_verified',
        'session_token',
        'auth_token',
        'token',
        'session',
        'auth',
        'jwt',
        'user_token'
      ];
      
      const currentDomain = window.location.hostname;
      const currentPath = window.location.pathname;
      
      cookiesToClear.forEach(cookieName => {
        // Clear with different path and domain combinations
        const cookieOptions = [
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${currentDomain};`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${currentDomain};`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${currentPath};`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${currentPath}; domain=${currentDomain};`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${currentPath}; domain=.${currentDomain};`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure;`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; httponly;`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict;`,
          `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax;`,
        ];
        
        cookieOptions.forEach(option => {
          try {
            document.cookie = option;
          } catch (e) {
            // Ignore errors for invalid cookie options
          }
        });
      });
      
      console.log('🔐 Auth: Cookies cleared for domain:', currentDomain);
    }
  };

  const verifyCookiesCleared = () => {
    if (typeof window !== 'undefined') {
      const cookiesToCheck = [
        'access_token',
        'refresh_token', 
        'registration_verified',
        'session_token',
        'auth_token'
      ];
      
      const remainingCookies = cookiesToCheck.filter(cookieName => {
        return document.cookie.includes(`${cookieName}=`);
      });
      
      if (remainingCookies.length > 0) {
        console.warn('🔐 Auth: Some cookies still present:', remainingCookies);
      } else {
        console.log('🔐 Auth: All authentication cookies cleared successfully');
      }
    }
  };

  const logout = () => {
    console.log('🔐 Auth: User logged out');
    setIsLoggedIn(false);
    
    // Clear localStorage and sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.clear();
      sessionStorage.clear();
    }
    
    // Clear HTTP cookies
    clearCookies();
    
    // Verify cookies are cleared
    setTimeout(() => {
      verifyCookiesCleared();
    }, 100);
  };

  const value: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
