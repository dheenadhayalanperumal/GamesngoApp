"use client";

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { ArrowBack, Bolt } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";

export default function Notifications() {
  const router = useRouter();

  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "Great news!",
      message: "Your Nandhana Palace restaurant voucher has been successfully added to your wallet. Use it anytime to enjoy delicious meals and exciting dining discounts.",
      iconColor: "#E0BBE4", // Light purple background
      iconBgColor: "#957DAD", // Dark purple icon
      isRead: false
    },
    {
      id: 2,
      title: "Great news!",
      message: "Your Nandhana Palace restaurant voucher has been successfully added to your wallet. Use it anytime to enjoy delicious meals and exciting dining discounts.",
      iconColor: "#FFFACD", // Light yellow background
      iconBgColor: "#FFD700", // Gold/yellow icon
      isRead: false
    },
    {
      id: 3,
      title: "Great news!",
      message: "Your Nandhana Palace restaurant voucher has been successfully added to your wallet. Use it anytime to enjoy delicious meals and exciting dining discounts.",
      iconColor: "#E0BBE4", // Light purple background
      iconBgColor: "#957DAD", // Dark purple icon
      isRead: false
    },
    {
      id: 4,
      title: "Great news!",
      message: "Your Nandhana Palace restaurant voucher has been successfully added to your wallet. Use it anytime to enjoy delicious meals and exciting dining discounts.",
      iconColor: "#E0BBE4", // Light purple background
      iconBgColor: "#957DAD", // Dark purple icon
      isRead: false
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button */}
      <Box sx={{ 
        backgroundColor: '#4A27C7', // Dark blue color from reference
        padding: '20px 20px 20px 20px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer' 
          }} 
          onClick={() => router.back()}
        >
          <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontWeight: 500,
              fontSize: '16px' // Font size from reference
            }}
          >
            Back
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area - Light Gray Background */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa', // Light gray background from reference
        padding: '20px',
        minHeight: 'calc(100vh - 80px)'
      }}>
        {/* Page Title */}
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#303F9F', // Dark purple/blue color from reference
            fontSize: '22px', // Font size from reference
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 3
          }}
        >
          Notification
        </Typography>

        {/* Notification Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              sx={{
                backgroundColor: 'white',
                borderRadius: '12px', // Rounded corners from reference
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle shadow
                border: 'none',
                padding: 0,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  {/* Notification Icon */}
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: notification.iconColor, // Light purple or yellow background
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bolt 
                      sx={{ 
                        color: notification.iconBgColor, // Dark purple or gold icon
                        fontSize: 24,
                        transform: 'rotate(45deg)' // Diagonal orientation like in reference
                      }} 
                    />
                  </Avatar>

                  {/* Notification Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#333333', // Dark gray text from reference
                        fontSize: '16px', // Font size from reference
                        fontWeight: 'bold',
                        marginBottom: 1,
                        lineHeight: 1.3
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#333333', // Dark gray text from reference
                        fontFamily: 'Poppins',
                        fontSize: '14px', // Font size from reference
                        fontWeight: 400,
                        lineHeight: 1.5,
                        wordWrap: 'break-word'
                      }}
                    >
                      {notification.message}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '60px 20px',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666666',
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: 1
              }}
            >
              No notifications yet
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#999999',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              You'll see your notifications here when they arrive
            </Typography>
          </Box>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
