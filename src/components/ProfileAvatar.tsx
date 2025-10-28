"use client";

import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, IconButton, Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/navigation';
import LoginPopup from './LoginPopup';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileAvatarProps {
  size?: number;
  isLoggedIn?: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 50,
}) => {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [userName, setUserName] = useState("User");
  const [userImage, setUserImage] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  useEffect(() => {
    // Always try to fetch user details on mount
    // If user is not logged in, API will return error and we'll use default values
    checkAuthAndFetchDetails();
  }, []);

  const checkAuthAndFetchDetails = async () => {
    // AuthContext handles authentication, just fetch user details if logged in
    if (isLoggedIn) {
      fetchUserDetails();
    }
  };

  // checkAuthentication removed - AuthContext handles authentication

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/home/details', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('User details response:', data);

      if (response.ok && data.status === 'success') {
        setUserName(data.details.user.name || "User");
        setUserImage(data.details.user.imageUrl || "");
        setNotificationCount(data.details.notifications.unreadCount || 0);
      } else {
        // API returned an error, use default values
        console.warn('Failed to fetch user details:', data.message || 'Unknown error');
        // Keep default values: "User", no image, 0 notifications
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Keep default values on error
    }
  };

  const handleAvatarClick = () => {
    if (isLoggedIn) {
      // Navigate to profile if logged in
      router.push('/profile');
    } else {
      // Open login popup if not logged in
      setIsLoginPopupOpen(true);
    }
  };

  const handleLogin = () => {
    login(); // Use context login function
    // Refresh user details after login
    fetchUserDetails();
    // Optionally reload the page to update all components
    window.location.reload();
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%", // ensures spacing works
      }}
    >
      {/* Left side (Avatar + Texts) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={userImage}
          alt={userName}
          onClick={handleAvatarClick}
          sx={{
            width: size,
            height: size,
            backgroundColor: "#E0E0E0",
            border: "3px solid #F5F5F5",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {!userImage && (
            <PersonIcon
              sx={{
                fontSize: size * 0.7,
                color: "#9E9E9E",
              }}
            />
          )}
        </Avatar>

        <Box sx={{display:'flex', flexDirection:'column',gap:'0px',
          color:'white'}}>
          <Typography variant="h6">Good Morning</Typography>
          <Typography variant="h6" sx={{
          fontWeight:'bold',color:'#FAC200;'}}>{userName}</Typography>
        </Box>
      </Box>
      

      {/* Right side (Notification icon with badge) */}
      <IconButton>
        <Badge 
          badgeContent={notificationCount} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#FF0000',
              color: '#FFF',
            }
          }}
        >
          <NotificationsNoneIcon sx={{
            color:'white',
            width:'40px',
            height:'40px',
          }}/>
        </Badge>
      </IconButton>
    </Box>

    {/* Login Popup */}
    <LoginPopup 
      isOpen={isLoginPopupOpen}
      onClose={handleLoginPopupClose}
      onLogin={handleLogin}
    />
    </>
  );
};

export default ProfileAvatar;
