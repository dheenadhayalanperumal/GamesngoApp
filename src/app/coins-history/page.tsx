"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import { Bolt } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";
import CoinIcon from '@/assets/icons/coin.png';
import HeaderWithBack from '@/components/HeaderWithBack';

export default function CoinsHistory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      title: "Puzzle Challenge",
      subtitle: "Daily Games",
      amount: "+15 Coins",
      date: "18 Sep 25 1.00am",
      type: "earn",
      isPositive: true
    },
    {
      id: 2,
      title: "Redeem",
      subtitle: "Games n Go Store",
      amount: "-599 Coins",
      date: "18 Sep 25 1.00am",
      type: "redeem",
      isPositive: false
    },
    {
      id: 3,
      title: "Momo Nations",
      subtitle: "Restaurant Games",
      amount: "+15 Coins",
      date: "18 Sep 25 1.00am",
      type: "earn",
      isPositive: true
    },
    {
      id: 4,
      title: "Puzzle Challenge",
      subtitle: "Daily Games",
      amount: "+15 Coins",
      date: "18 Sep 25 1.00am",
      type: "earn",
      isPositive: true
    },
    {
      id: 5,
      title: "Redeem",
      subtitle: "Games n Go Store",
      amount: "-599 Coins",
      date: "18 Sep 25 1.00am",
      type: "redeem",
      isPositive: false
    },
    {
      id: 6,
      title: "Momo Nations",
      subtitle: "Restaurant Games",
      amount: "+15 Coins",
      date: "18 Sep 25 1.00am",
      type: "earn",
      isPositive: true
    }
  ];

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Earn') return transaction.type === 'earn';
    if (activeTab === 'Redeem') return transaction.type === 'redeem';
    return true;
  });

  // Group transactions by month
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const month = 'September'; // In real app, you'd extract from date
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button */}
      <HeaderWithBack />

      {/* Yellow Header Section with Title */}
      <Box sx={{ 
        backgroundColor: 'rgba(250, 194, 0, 0.60)', // Yellow color from reference
        padding: '20px 20px 125px',
        color: 'white',
        textAlign: 'center',
        borderRadius: '0px 0px 40px 40px',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#21175B', // Dark text on yellow background
            fontSize: '26px', // Font size from reference
            fontWeight: 'bold',
            lineHeight: 1.2
          }}
        >
          Coins History
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ 
        backgroundColor: 'white',
        padding: '24px 14px',
        borderRadius: '15px 15px 0 0', // Rounded top corners
        marginTop: '-10px', // Overlap with yellow header
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        margin:'-110px 20px 0 20px',
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          marginBottom: 3, 
          justifyContent: 'center',
          borderBottom: '1px solid #E0E0E0',
          paddingBottom: 2,
          margin: '0 -14px',
          padding: '0 14px 16px 14px'
        }}>
          {/* All Tab */}
          <Button
            onClick={() => setActiveTab('All')}
            sx={{
              backgroundColor: activeTab === 'All' ? '#3C3CD2' : 'white',
              color: activeTab === 'All' ? 'white' : '#666666',
              border: activeTab === 'All' ? 'none' : '1px solid #E0E0E0',
              borderRadius: '30px',
              padding: '6px 6px',
              fontSize: '14px',
              fontWeight: activeTab === 'All' ? '400' : 'normal',
              textTransform: 'none',
              minWidth: '70px',
              '&:hover': {
                backgroundColor: activeTab === 'All' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            All
          </Button>

          {/* Earn Tab */}
          <Button
            onClick={() => setActiveTab('Earn')}
            sx={{
              backgroundColor: activeTab === 'Earn' ? '#3C3CD2' : 'white',
              color: activeTab === 'Earn' ? 'white' : '#666666',
              border: activeTab === 'Earn' ? 'none' : '1px solid #E0E0E0',
              borderRadius: '30px',
              padding: '6px 6px',
              fontSize: '14px',
              fontWeight: activeTab === 'Earn' ? '400' : 'normal',
              textTransform: 'none',
              minWidth: '70px',
              '&:hover': {
                backgroundColor: activeTab === 'Earn' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Earn
          </Button>

          {/* Redeem Tab */}
          <Button
            onClick={() => setActiveTab('Redeem')}
            sx={{
              backgroundColor: activeTab === 'Redeem' ? '#3C3CD2' : 'white',
              color: activeTab === 'Redeem' ? 'white' : '#666666',
              border: activeTab === 'Redeem' ? 'none' : '1px solid #E0E0E0',
              borderRadius: '30px',
              padding: '6px 6px',
              fontSize: '14px',
              fontWeight: activeTab === 'Redeem' ? '400' : 'normal',
              textTransform: 'none',
              minWidth: '90px',
              '&:hover': {
                backgroundColor: activeTab === 'Redeem' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Redeem
          </Button>
        </Box>
     

      {/* Main Content Area - Light Gray Background */}
      {/* <Box sx={{ 
        backgroundColor: '#f8f9fa', // Light gray background from reference
        padding: '0 20px 100px 20px',
        minHeight: 'calc(100vh - 200px)'
      }}> */}
        {/* Transaction List */}
        {Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
          <Box key={month} sx={{ marginBottom: 3 }}>
            {/* Month Header */}
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#21175B',
                fontSize: '22px', // Font size from reference
                fontWeight: '500',
                marginBottom: 2,
                marginTop: 2,
                lineHeight:1.2,
              }}
            >
              {month}
            </Typography>

            {/* Transaction Cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {monthTransactions.map((transaction) => (
                <Card 
                  key={transaction.id}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px', // Rounded corners from reference
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle shadow
                    border: 'none',
                    padding: 0
                  }}
                >
                  <CardContent sx={{ padding: '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Left Column - Transaction Details */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: 'rgba(0, 0, 0, 0.80)', // Dark gray text from reference
                            fontSize: '16px', // Font size from reference
                            fontWeight: '400',
                            marginBottom: 0.5,
                            lineHeight: 1.3
                          }}
                        >
                          {transaction.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#666666', // Lighter gray text from reference
                            fontSize: '12px', // Font size from reference
                            fontWeight: 400,
                            lineHeight: 1.4
                          }}
                        >
                          {transaction.subtitle}
                        </Typography>
                      </Box>

                      {/* Right Column - Amount, Date & Icon */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: transaction.isPositive ? '#4CAF50' : '#F44336', // Green for earn, red for redeem
                              fontSize: '14px', // Font size from reference
                              fontWeight: 'bold',
                              marginBottom: 0.5,
                              lineHeight: 1.3
                            }}
                          >
                            {transaction.amount}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#999999', // Light gray text from reference
                              fontSize: '10px', // Font size from reference
                              fontWeight: 400,
                              lineHeight: 1.2
                            }}
                          >
                            {transaction.date}
                          </Typography>
                        </Box>

                        {/* Coin Icon */}                   

                      <Box
                                component="img"
                                src={CoinIcon.src}
                                alt="Coin Icon"
                                sx={{
                                  width: 25,
                                  height: 25,
                                  objectFit: 'contain'
                                }}
                              />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
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
              No {activeTab.toLowerCase()} transactions
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#999999',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Your {activeTab.toLowerCase()} transactions will appear here
            </Typography>
          </Box>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
