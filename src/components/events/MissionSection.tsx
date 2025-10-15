'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import MissionItem, { MissionItemData } from './MissionItem';

export interface MissionData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  playButtonText: string;
  eventMission: {
    title: string;
    items: MissionItemData[];
  };
}

interface MissionSectionProps {
  missionData: MissionData;
  onPlayGame: (missionId: number) => void;
  imageHeight?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  showBorder?: boolean;
}

const MissionSection: React.FC<MissionSectionProps> = ({
  missionData,
  onPlayGame,
  imageHeight = '280px',
  buttonColor = '#FAC200',
  buttonTextColor = '#FFF',
  showBorder = true,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Mission Image */}
      <Box
        sx={{
          width: '100%',
          height: imageHeight,
          flexShrink: 0,
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'lightgray',
        }}
      >
        <img
          src={missionData.image}
          alt={missionData.title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            borderRadius: '10px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      {/* Mission Title and Subtitle */}
      <Box>
        <Typography
          sx={{
            color: '#21175B',
            fontFamily: 'Inter',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '15px',
            marginTop: '14px',
          }}
        >
          {missionData.title}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(33, 23, 91, 0.70)',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '15px',
            marginTop: '18px',
          }}
        >
          {missionData.subtitle}
        </Typography>
      </Box>

      {/* Play Button */}
      <Box
        sx={{
          width: '100%',
          height: '60px',
          flexShrink: 0,
          borderRadius: '14px',
          background: buttonColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          cursor: 'pointer',
          mt: '10px',
        }}
        onClick={() => onPlayGame(missionData.id)}
      >
        <Typography
          sx={{
            color: buttonTextColor,
            fontFamily: 'Poppins',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          {missionData.playButtonText}
        </Typography>
      </Box>

      {/* Event Mission Content */}
      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{
            color: '#21175B',
            fontFamily: 'Inter',
            fontSize: '22px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '15px',
            mb: 3,
          }}
        >
          {missionData.eventMission.title}
        </Typography>

        <Box
          sx={{
            py: 3,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            borderRadius: '10px',
            border: showBorder ? '1px solid rgba(0, 0, 0, 0.20)' : 'none',
          }}
        >
          {missionData.eventMission.items.map((item, index) => (
            <MissionItem key={item.id} item={item} index={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MissionSection;
