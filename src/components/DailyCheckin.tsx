import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DailyCheckBox from './DailyCheckBox';
import ClaimButton from './ClaimButton';

interface DailyCheckinProps {
  onClaim?: () => void;
  currentDay?: number;
  claimedDays?: number[];
}

const DailyCheckin: React.FC<DailyCheckinProps> = ({
  onClaim,
  currentDay = 5,
  claimedDays = [1,2,3]
}) => {
    const dailyRewards = [10, 15, 20, 25, 30, 35, 50];

    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: {
                    xs: '12px',
                    sm: '16px',
                    md: '20px'
                },
                padding: {
                    xs: '12px',
                    sm: '16px',
                    md: '20px'
                },
                display: 'flex',
                flexDirection: 'column',
                gap: {
                    xs: '16px',
                    sm: '18px',
                    md: '20px'
                },
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                maxWidth: '100%',
                margin: '0 auto',
                width:'100%',
            }}
        >
            <Typography
                variant='h6'
                sx={{
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: {
                        xs: '20px',
                        sm: '22px',
                        md: '24px'
                    }
                }}
            >
                Daily Check In
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gap: {
                        xs: '6px',
                        sm: '10px',
                        md: '14px'
                    },
                    justifyItems: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden'
                }}
            >
                {dailyRewards.map((reward, index) => {
                    const dayNumber = index + 1;
                    const isUnlocked = dayNumber <= currentDay;
                    const isCompleted = dayNumber < currentDay;
                    const isClaimed = claimedDays.includes(dayNumber);

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: {
                                    xs: '4px',
                                    sm: '6px',
                                    md: '8px'
                                },
                                width: '100%'
                            }}
                        >
                            <DailyCheckBox
                                coinCount={reward}
                                isUnlocked={isUnlocked}
                                isCompleted={isCompleted}
                                isClaimed={isClaimed}
                            />
                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#2c3e50',
                                    fontWeight: 'bold',
                                    fontSize: {
                                        xs: '10px',
                                        sm: '12px',
                                        md: '14px'
                                    },
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Day {dayNumber}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <ClaimButton
                onClick={onClaim}
                disabled={currentDay > 7}
            />
        </Box>
    );
};

export default DailyCheckin;


