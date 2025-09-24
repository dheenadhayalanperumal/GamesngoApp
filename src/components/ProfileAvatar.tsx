import React from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface ProfileAvatarProps {
  size?: number;
  src?: string;
  alt?: string;
  userName?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 80,
  src,
  alt = "Profile Avatar",
  userName,
}) => {
  return (
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
          src={src}
          alt={alt}
          sx={{
            width: size,
            height: size,
            backgroundColor: "#E0E0E0",
            border: "3px solid #F5F5F5",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {!src && (
            <PersonIcon
              sx={{
                fontSize: size * 0.6,
                color: "#9E9E9E",
              }}
            />
          )}
        </Avatar>

        <Box>
          <Typography variant="h6">Good Morning</Typography>
          <Typography variant="h5">{userName || "Guest"}</Typography>
        </Box>
      </Box>

      {/* Right side (Notification icon) */}
      <IconButton>
        <NotificationsIcon   sx={{
                width:'50px',
                height:'50px'
              }}/>
      </IconButton>
    </Box>
  );
};

export default ProfileAvatar;
