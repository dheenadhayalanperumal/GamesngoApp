"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Pagination,
} from '@mui/material';
import TabBar from "@/components/TabBar";
import CoinIcon from '@/assets/icons/coin.png';
import HeaderWithBack from '@/components/HeaderWithBack';
import { useAuth } from '@/contexts/AuthContext';

// Transaction interface based on API documentation
interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  direction: 'Earn' | 'Redeem';
  title: string;
  category: string;
  amount: number;
  signedAmount: number;
  balanceAfter: number;
  meta: Record<string, unknown>;
  createdAt: string;
  monthKey: string;
  monthLabel: string;
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

export default function CoinsHistory() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  // API functions
  const fetchWalletTransactions = useCallback(async (filter: string = 'all', page: number = 1) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/wallet/transactions?filter=${filter}&page=${page}&perPage=${perPage}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Wallet transactions response:', data);

      if (response.ok && data.status === 'success') {
        setWalletData(data);
        setCurrentPage(page);
      } else {
        console.error('Failed to fetch wallet transactions:', data.message || 'Unknown error');
        setError(data.message || 'Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [perPage]);

  // Fetch data on component mount and when filter changes
  useEffect(() => {
    if (isLoggedIn && !authLoading) {
      const filter = activeTab === 'All' ? 'all' : activeTab.toLowerCase();
      fetchWalletTransactions(filter, 1);
    }
  }, [isLoggedIn, authLoading, activeTab]);

  // Handle tab change
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const filter = activeTab === 'All' ? 'all' : activeTab.toLowerCase();
    fetchWalletTransactions(filter, page);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  };

  // Format amount for display
  const formatAmount = (signedAmount: number) => {
    const isPositive = signedAmount > 0;
    const amount = Math.abs(signedAmount);
    return `${isPositive ? '+' : '-'}${amount} Coins`;
  };

  // Get transactions from API data
  const transactions = walletData?.transactions || [];

  // Group transactions by month using monthLabel from API
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const month = transaction.monthLabel || 'Unknown';
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
        <HeaderWithBack />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh' 
        }}>
          <CircularProgress />
        </Box>
        <TabBar />
      </div>
    );
  }

  // Redirect to home if not logged in
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
        <HeaderWithBack />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <Typography variant="h6" sx={{ color: '#666', marginBottom: 2 }}>
            Please log in to view your coin history
          </Typography>
        </Box>
        <TabBar />
      </div>
    );
  }

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
            onClick={() => handleTabChange('All')}
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
            onClick={() => handleTabChange('Earn')}
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
            onClick={() => handleTabChange('Redeem')}
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

        {/* Error State */}
        {error && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px',
            marginTop: 2
          }}>
            <Typography variant="body1" sx={{ color: '#F44336' }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '40px'
          }}>
            <CircularProgress />
          </Box>
        )}

        {/* Transaction List */}
        {!isLoading && !error && Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
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
                          {transaction.category}
                        </Typography>
                      </Box>

                      {/* Right Column - Amount, Date & Icon */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: transaction.signedAmount > 0 ? '#4CAF50' : '#F44336', // Green for earn, red for redeem
                              fontSize: '14px', // Font size from reference
                              fontWeight: 'bold',
                              marginBottom: 0.5,
                              lineHeight: 1.3
                            }}
                          >
                            {formatAmount(transaction.signedAmount)}
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
                            {formatDate(transaction.createdAt)}
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
        {!isLoading && !error && transactions.length === 0 && (
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

        {/* Pagination */}
        {!isLoading && !error && walletData && walletData.pagination.totalPages > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '20px',
            marginTop: 2
          }}>
            <Pagination
              count={walletData.pagination.totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#666',
                  '&.Mui-selected': {
                    backgroundColor: '#3C3CD2',
                    color: 'white',
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
