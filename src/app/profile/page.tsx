"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  AccountBalanceWallet,
  LocalOffer,
  Notifications,
  Security,
  Share,
  Description,
  Policy,
  ContactSupport,
  Logout,
  Bolt,
  SportsEsports,
  EmojiEvents,
  TrendingUp,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TabBar from "@/components/TabBar";

export default function Profile() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const userInfo = {
    name: 'Gamesngo',
    joinDate: 'Joined Oct 5, 2025',
    totalCoins: 1015,
    totalCoupons: 11,
    gamesPlayed: 147,
    gamesWins: 67,
    gamesScore: 2154,
  };

  const accountMenuItems = [
    { icon: <AccountBalanceWallet />, title: 'Coins History' },
    { icon: <LocalOffer />, title: 'Coupons' },
    { icon: <Notifications />, title: 'Notifications', hasToggle: true },
    { icon: <Security />, title: 'Change PIN' },
    { icon: <Share />, title: 'Invite & Win (+100 Coins)', highlight: true },
    { icon: <Description />, title: 'Terms & Conditions' },
    { icon: <Policy />, title: 'Privacy Policy' },
    { icon: <ContactSupport />, title: 'Contact Us' },
    { icon: <Logout />, title: 'Log Out', isLogout: true },
  ];

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
          
          <Typography variant="body1" sx={{ color: 'white', fontWeight: 500, cursor: 'pointer' }}>
            Edit
          </Typography>
        </Box>

        {/* Profile Avatar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Avatar
            sx={{
              width: '120px',
              height: '120px',
              backgroundColor: 'white',
              border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            <Image 
              src="/logoblue.svg" 
              alt="Profile" 
              width={80} 
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </Avatar>
        </Box>

        {/* User Info */}
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <Typography variant="h4" sx={{ 
            color: '#FFF',
            fontFamily: 'Rubik',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            marginBottom: 1
          }}>
            {userInfo.name}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal'
          }}>
            {userInfo.joinDate}
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
              }}>     {userInfo.totalCoins}
              </Typography>
              </Box>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.80)',
                fontFamily: 'Rubik',
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
                {userInfo.totalCoupons}
              </Typography>
              </Box>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.80)',
                fontFamily: 'Rubik',
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
                  {userInfo.gamesPlayed}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.40)',
                  textAlign: 'center',
                  fontFamily: 'Rubik',
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
                  {userInfo.gamesWins}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.40)',
                  textAlign: 'center',
                  fontFamily: 'Rubik',
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
                  {userInfo.gamesScore}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.40)',
                  textAlign: 'center',
                  fontFamily: 'Rubik',
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
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 2 }}>
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
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            color: item.isLogout ? '#f44336' : '#333'
                          }}
                        >
                          {item.title}
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