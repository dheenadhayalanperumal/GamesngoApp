'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`events-tabpanel-${index}`}
      aria-labelledby={`events-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBuyTickets = (eventId: number) => {
    console.log(`Buying tickets for event ${eventId}`);
    // Add your ticket buying logic here
  };

  // Sample event data
  const liveEvents = [
    {
      id: 1,
      title: 'Gaming Chair',
      description: 'Ergonomic RGB Gaming Chair - Worth ₹15,000',
      image: '/images/banner/bubble_shooter.svg',
      prizeValue: '₹15,000',
      players: 47,
      timeLeft: '2d 15h',
      entryCost: 50,
      isLive: true,
      isPrize: true,
    },
    {
      id: 2,
      title: 'Gaming Chair',
      description: 'Ergonomic RGB Gaming Chair - Worth ₹15,000',
      image: '/images/banner/burger_master.svg',
      prizeValue: '₹15,000',
      players: 47,
      timeLeft: '2d 15h',
      entryCost: 50,
      isLive: true,
      isPrize: true,
    },
  ];

  const yourEvents = [
    {
      id: 3,
      title: 'My Gaming Event',
      description: 'Your registered gaming event',
      image: '/images/banner/bubble_shooter.svg',
      prizeValue: '₹10,000',
      players: 32,
      timeLeft: '1d 8h',
      entryCost: 30,
      isLive: true,
      isPrize: false,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        pb: 12,
        mx: '-15px', 
        marginTop: '70px',// Negative margin to counteract parent padding
      }}
    >
      <Header sx={{
        backgroundColor: '#4848DB',
        textAlign: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}/>
      <Box
        sx={{
          // bgcolor: '#3c3cd2',
          color: '#fff',
          padding: '20px 20px 0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Events
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Wallet</Typography>
            <Typography sx={{ fontSize: 14 }}>▼</Typography>
          </Box>
        </Box> */}

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: 48,
            '& .MuiTabs-indicator': {
              height: 4,
              bgcolor: '#3c3cd2',
              borderRadius: '4px 4px 0 0',
            },
            '& .MuiTab-root': {
              color: 'rgba(33, 23, 91, 0.6)',
              fontSize: 18,
              fontWeight: 600,
              textTransform: 'none',
              minHeight: 48,
              flex: 1,
              maxWidth: 'none',
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#21175b',
              fontWeight: 700,
            },
            // bgcolor: '#fff',
            borderRadius: '0',
            overflow: 'visible',
          }}
        >
          <Tab label="Live Events" />
          <Tab label="Your Events" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ px: 2 }}>
        <TabPanel value={activeTab} index={0}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {liveEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onBuyTickets={handleBuyTickets}
              />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {yourEvents.length > 0 ? (
              yourEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onBuyTickets={handleBuyTickets}
                />
              ))
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#666',
                  }}
                >
                  No events registered yet
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>
      </Box>
      <TabBar />
    </Box>
  );
};

export default EventsPage;

