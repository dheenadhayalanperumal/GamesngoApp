"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ArrowBack, Bolt, Close } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';

interface NotificationItem {
  id: number;
  title: string;
  iconUrl: string | null;
  createdAt: string;
  isRead: boolean;
  message?: string; // Full message loaded from detail API
}

interface NotificationDetail {
  id: number;
  title: string;
  message: string;
  iconUrl: string | null;
  createdAt: string | null;
  readAt: string | null;
}

export default function Notifications() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextAfterId, setNextAfterId] = useState<number | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationDetail | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (isLoggedIn) {
        loadNotifications();
      } else {
        // Redirect to home if not logged in
        router.push('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, authLoading]);

  const loadNotifications = async (afterId?: number) => {
    try {
      if (afterId) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setNotifications([]);
      }
      setError(null);

      let url = '/api/notifications?limit=20';
      if (afterId) {
        url += `&afterId=${afterId}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Notifications response:', data);

      if (response.ok && data.status === 'success') {
        const newNotifications = data.notifications.items || [];
        
        if (afterId) {
          // Append to existing notifications
          setNotifications(prev => [...prev, ...newNotifications]);
        } else {
          // Replace notifications
          setNotifications(newNotifications);
        }

        setHasMore(data.notifications.hasMore || false);
        setNextAfterId(data.notifications.nextAfterId || null);
      } else {
        setError(data.message || 'Failed to load notifications');
        if (response.status === 401) {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      setError('Failed to load notifications. Please try again.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (nextAfterId && !isLoadingMore && hasMore) {
      loadNotifications(nextAfterId);
    }
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    // Open detail dialog and fetch full notification
    setIsDetailDialogOpen(true);
    setIsLoadingDetail(true);

    try {
      const response = await fetch(`/api/notifications/${notification.id}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Notification detail response:', data);

      if (response.ok && data.status === 'success') {
        setSelectedNotification(data.notification);
        
        // Update the notification in the list to mark as read
        setNotifications(prev => 
          prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
        );
      } else {
        setError(data.message || 'Failed to load notification details');
      }
    } catch (error) {
      console.error('Error loading notification detail:', error);
      setError('Failed to load notification details. Please try again.');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      
      // Format as date
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
      });
    } catch (error) {
      return dateString;
    }
  };

  const getIconColor = (index: number) => {
    // Alternate between purple and yellow
    const colors = [
      { bg: '#E0BBE4', icon: '#957DAD' }, // Purple
      { bg: '#FFFACD', icon: '#FFD700' }, // Yellow
    ];
    return colors[index % colors.length];
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return null; // Will redirect
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button */}
      <Box sx={{ 
        backgroundColor: '#4A27C7',
        padding: '20px',
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
              fontSize: '16px'
            }}
          >
            Back
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa',
        padding: '20px',
        minHeight: 'calc(100vh - 80px)',
        paddingBottom: '100px' // Space for TabBar
      }}>
        {/* Page Title */}
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#303F9F',
            fontSize: '22px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 3
          }}
        >
          Notification
        </Typography>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '40px',
            textAlign: 'center'
          }}>
            <Typography sx={{ color: '#d32f2f', marginBottom: 2 }}>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => loadNotifications()}
              sx={{ backgroundColor: '#4A27C7' }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Notification Cards */}
        {!isLoading && !error && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {notifications.map((notification, index) => {
                const iconColors = getIconColor(index);
                return (
                  <Card 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: notification.isRead ? 'none' : '2px solid #4A27C7',
                      padding: 0,
                      cursor: 'pointer',
                      opacity: notification.isRead ? 0.9 : 1,
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease'
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
                            backgroundColor: iconColors.bg,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {notification.iconUrl ? (
                            <img 
                              src={notification.iconUrl} 
                              alt="Notification icon"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                          ) : (
                            <Bolt 
                              sx={{ 
                                color: iconColors.icon,
                                fontSize: 24,
                                transform: 'rotate(45deg)'
                              }} 
                            />
                          )}
                        </Avatar>

                        {/* Notification Content */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: '#333333',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                lineHeight: 1.3,
                                flex: 1
                              }}
                            >
                              {notification.title}
                            </Typography>
                            {!notification.isRead && (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: '#4A27C7',
                                  marginLeft: 1,
                                  flexShrink: 0,
                                  marginTop: 0.5
                                }}
                              />
                            )}
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#666666',
                              fontFamily: 'Poppins',
                              fontSize: '12px',
                              fontWeight: 400,
                              marginTop: 0.5
                            }}
                          >
                            {formatDate(notification.createdAt)}
                          </Typography>
                          {notification.message && (
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: '#333333',
                                fontFamily: 'Poppins',
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: 1.5,
                                wordWrap: 'break-word',
                                marginTop: 1
                              }}
                            >
                              {notification.message}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            {/* Load More Button */}
            {hasMore && !isLoadingMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <Button 
                  variant="outlined"
                  onClick={loadMore}
                  sx={{ 
                    borderColor: '#4A27C7',
                    color: '#4A27C7',
                    '&:hover': {
                      borderColor: '#4A27C7',
                      backgroundColor: 'rgba(74, 39, 199, 0.04)'
                    }
                  }}
                >
                  Load More
                </Button>
              </Box>
            )}

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <CircularProgress size={24} />
              </Box>
            )}

            {/* Empty State */}
            {notifications.length === 0 && !isLoading && (
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
                  You&apos;ll see your notifications here when they arrive
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            margin: '20px'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#4A27C7',
          color: 'white',
          padding: '16px 20px'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            Notification Details
          </Typography>
          <IconButton
            onClick={() => setIsDetailDialogOpen(false)}
            sx={{ color: 'white', padding: '4px' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          {isLoadingDetail ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <CircularProgress />
            </Box>
          ) : selectedNotification ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
                {selectedNotification.iconUrl ? (
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%'
                    }}
                    src={selectedNotification.iconUrl}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      backgroundColor: '#E0BBE4',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Bolt 
                      sx={{ 
                        color: '#957DAD',
                        fontSize: 28,
                        transform: 'rotate(45deg)'
                      }} 
                    />
                  </Avatar>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#333333',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      marginBottom: 0.5
                    }}
                  >
                    {selectedNotification.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666666',
                      fontSize: '12px'
                    }}
                  >
                    {formatDate(selectedNotification.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#333333',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}
              >
                {selectedNotification.message}
              </Typography>
              {selectedNotification.readAt && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#999999',
                    fontSize: '11px',
                    display: 'block',
                    marginTop: 2
                  }}
                >
                  Read at: {formatDate(selectedNotification.readAt)}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography sx={{ color: '#666666' }}>
              Failed to load notification details.
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
