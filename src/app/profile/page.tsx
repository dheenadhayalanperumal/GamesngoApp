"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  // IconButton,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  // Edit,
  AccountBalanceWallet,
  LocalOffer,
  Notifications,
  Security,
  Share,
  Description,
  Policy,
  ContactSupport,
  Logout,
  // Bolt,
  // SportsEsports,
  // EmojiEvents,
  // TrendingUp,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TabBar from "@/components/TabBar";
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const router = useRouter();
  const { isLoggedIn, logout, isLoading: authLoading } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [accountData, setAccountData] = useState({
    user: { name: 'User', imageUrl: '', joinedAt: '' },
    counts: { coins: 0, coupons: { total: 0, unredeemed: 0 } },
    stats: { gamesPlayed: 0, gamesScore: 0 },
    preferences: { notifications: { enabled: true } },
    invite: { rewardCoins: 100 }
  });
  
  useEffect(() => {
    // Only fetch data if user is logged in
    if (isLoggedIn) {
      fetchAccountOverview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // checkAuthenticationAndFetchData removed - AuthContext handles authentication

  // checkAuthentication removed - AuthContext handles authentication

  const fetchAccountOverview = async () => {
    try {
      const response = await fetch('/api/account/overview', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Account overview response:', data);

      if (response.ok && data.status === 'success') {
        setAccountData(data.account);
        setNotificationsEnabled(data.account.preferences.notifications.enabled);
      } else {
        console.warn('Failed to fetch account overview:', data.message || 'Unknown error');
        // If account overview fails, user might not be authenticated
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching account overview:', error);
      router.push('/');
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent double clicks
    
    setIsLoggingOut(true);
    console.log('Logging out...');

    try {
      // Call logout API to clear server-side session
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
        console.log('Logout API response:', response.status);
      } catch (apiError) {
        console.warn('Logout API failed, continuing with client-side logout:', apiError);
      }
      
      // Use context logout function (clears all client-side data)
      logout();
      
      console.log('Logout successful, redirecting to home...');
      
      // Redirect to home page
      router.push('/');
      
      // Force page reload to clear all state
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to home
      router.push('/');
      window.location.reload();
    }
  };

  // Format join date
  const formatJoinDate = (dateString: string) => {
    if (!dateString) return 'Member';
    const date = new Date(dateString);
    return `Joined ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const accountMenuItems = [
    { icon: <AccountBalanceWallet />, title: 'Coins History' },
    { icon: <LocalOffer />, title: 'Coupons' },
    { icon: <Notifications />, title: 'Notifications', hasToggle: true },
    { icon: <Security />, title: 'Change PIN' },
    { icon: <Share />, title: `Invite & Win` },
    { icon: <Description />, title: 'Terms & Conditions' },
    { icon: <Policy />, title: 'Privacy Policy' },
    { icon: <ContactSupport />, title: 'Contact Us' },
    { icon: <Logout />, title: 'Log Out', isLogout: true },
  ];

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ color: '#4848DB' }} 
        />
        <Typography variant="body2" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Redirect to home if not logged in
  if (!isLoggedIn) {
    router.push('/');
    return null;
  }

  // Authentication check complete - user is logged in

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Blue Header Section */}
      <Box sx={{ 
        backgroundColor: '#4848DB',
        padding: '20px 20px 40px 20px',
        color: 'white',
        position: 'relative',
        
      }}>
        {/* Top Bar with Back and Edit */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => router.back()}>
            <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
              Back
            </Typography>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ color: 'white', fontWeight: 500, cursor: 'pointer' }}
            onClick={() => {
              // Pass user data via localStorage for edit page
              if (typeof window !== 'undefined') {
                localStorage.setItem('editProfileData', JSON.stringify({
                  name: accountData.user.name,
                  imageUrl: accountData.user.imageUrl,
                  joinedAt: accountData.user.joinedAt
                }));
              }
              router.push('/profile/edit');
            }}
          >
            Edit
          </Typography>
        </Box>

        {/* Profile Avatar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Avatar
            src={accountData.user.imageUrl || undefined}
            sx={{
              width: '120px',
              height: '120px',
              backgroundColor: 'white',
              border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            {!accountData.user.imageUrl && (
            <Image 
              src="/logoblue.svg" 
              alt="Profile" 
              width={80} 
              height={80}
              style={{ objectFit: 'contain' }}
            />
            )}
          </Avatar>
        </Box>

        {/* User Info */}
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <Typography variant="h4" sx={{ 
            color: '#FFF',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            marginBottom: 1
          }}>
            {accountData.user.name}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal'
          }}>
            {formatJoinDate(accountData.user.joinedAt)}
          </Typography>
        </Box>

        {/* Stats Cards in Header */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Card sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              minWidth: '142px',
              marginTop: 2,
              backdropFilter: 'blur(10px)',
            }}>
            <CardContent sx={{ padding: 2, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-evenly',}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
               <Image 
                   src="/coin.png" 
                   alt="Coins" 
                   width={40} 
                   height={40}
                   style={{ color: '#FAC200', marginRight: 4 }}
                 />
              </Box>
              <Typography variant="h4" sx={{ 
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '25px',
                marginBottom: 0.5 
              }}>     {accountData.counts.coins}
              </Typography>
              </Box>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.80)',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '25px'
              }}>
                Total Coins
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              minWidth: '142px',
              marginTop: 2,
              backdropFilter: 'blur(10px)',
            }}>
            <CardContent sx={{ padding: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
                <Image 
                  src="/coupons.svg" 
                  alt="Coupons" 
                  width={40} 
                  height={40}
                  style={{ color: '#FAC200', marginRight: 4 }}
                />
              </Box>
              <Typography variant="h4" sx={{ 
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '25px',
                marginBottom: 0.5 
              }}>
                {accountData.counts.coupons.total}
              </Typography>
              </Box>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.80)',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '25px'
              }}>
                Total Coupons
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* White Content Area */}
      <Box sx={{ backgroundColor: 'white', padding: '20px', paddingBottom: '100px' }}>
        {/* Game Statistics Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            <Card sx={{ 
              flex: 1, 
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.20)',
              background: 'rgba(0, 0, 0, 0.00)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
            }}>
              <CardContent sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ 
                  color: '#21175B',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '22px',
                  marginBottom: 1 
                }}>
                  {accountData.stats.gamesPlayed}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.40)',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '15px'
                }}>
                  Games Played
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ 
              flex: 1, 
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.20)',
              background: 'rgba(0, 0, 0, 0.00)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
            }}>
              <CardContent sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ 
                  color: '#21175B',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '22px',
                  marginBottom: 1 
                }}>
                  {0}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.40)',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '15px'
                }}>
                  Games Wins
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ 
              flex: 1, 
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.20)',
              background: 'rgba(0, 0, 0, 0.00)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
            }}>
              <CardContent sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                  color: '#21175B',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '22px',
                  marginBottom: 1 
                }}>
                  {accountData.stats.gamesScore}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.40)',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '15px'
                }}>
                  Games Score
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Account Section */}
        <Box>
          <Typography variant="h5" sx={{ 
            color: '#21175B',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '21px',
            marginBottom: 2
          }}>
            Account
          </Typography>
          
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <List sx={{ padding: 0 }}>
              {accountMenuItems.map((item, index) => (
                <Box key={index}>
                  <ListItem 
                    sx={{ 
                      padding: '16px 20px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f8f9fa'
                      }
                    }}
                    onClick={() => {
                      if (item.title === 'Contact Us') {
                        router.push('/contact-us');
                      } else if (item.title === 'Privacy Policy') {
                        router.push('/privacy-policy');
                      } else if (item.title === 'Terms & Conditions') {
                        router.push('/terms-conditions');
                      } else if (item.title === 'Notifications') {
                        router.push('/notifications');
                      } else if (item.title === 'Coins History') {
                        router.push('/coins-history');
                      } else if (item.title === 'Coupons') {
                        router.push('/coupons');
                      } else if (item.title === 'Change PIN') {
                        router.push('/change-pin/old-pin');
                      } else if (item.title === 'Invite & Win') {
                        router.push('/refer-win');
                      } else if (item.title === 'Log Out') {
                        handleLogout();
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: item.isLogout ? '#f44336' : 'rgba(33, 23, 91, 0.90)',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '21px'
                          }}
                        >
                          {item.isLogout && isLoggingOut ? 'Logging out...' : item.title}
                          {item.highlight && (
                            <Typography component="span" sx={{ color: '#FAC200', fontWeight: 'bold' }}>
                              {' '}(+100 Coins)
                            </Typography>
                          )}
                        </Typography>
                      }
                    />
                    {item.hasToggle ? (
                      <Switch
                        checked={notificationsEnabled}
                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#4caf50',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#4caf50',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ color: '#ccc' }}>
                        ›
                      </Typography>
                    )}
                  </ListItem>
                  
                  {index < accountMenuItems.length - 1 && (
                    <Divider sx={{ marginLeft: 7 }} />
                  )}
                </Box>
              ))}
            </List>
          </Card>
        </Box>
      </Box>
      
      <TabBar />
    </div>
  );
}