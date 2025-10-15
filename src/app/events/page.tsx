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

// Mission data interface
interface MissionData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  playButtonText: string;
  eventMission: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
      emoji?: string;
    }[];
  };
}

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Reset sub-tab when switching main tabs
    setActiveSubTab(0);
  };

  const handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveSubTab(newValue);
  };

  const handleBuyTickets = (eventId: number) => {
    console.log(`Buying tickets for event ${eventId}`);
    // Add your ticket buying logic here
  };

  const handlePlayGame = (missionId: number) => {
    console.log(`Playing game for mission ${missionId}`);
    // Add your game play logic here
  };

  // Function to update mission data dynamically
  const updateMissionData = (newData: Partial<MissionData>) => {
    setMissionData(prev => ({ ...prev, ...newData }));
  };

  // Function to load mission data from API
  const loadMissionData = async (missionId: number) => {
    try {
      // Replace with your actual API call
      // const response = await fetch(`/api/missions/${missionId}`);
      // const data = await response.json();
      // setMissionData(data);
      
      // For now, using mock data
      const mockData: MissionData = {
        id: missionId,
        title: "Dynamic Mission Title",
        subtitle: "Dynamic Mission Subtitle",
        image: "/images/product/p1.png",
        playButtonText: "Start Mission",
        eventMission: {
          title: "Mission Objectives",
          items: [
            {
              id: 1,
              title: "Complete Tasks",
              description: "Complete all assigned tasks to progress.",
            },
            {
              id: 2,
              title: "Earn Points",
              description: "Accumulate points through gameplay.",
              emoji: "⭐"
            },
            {
              id: 3,
              title: "Reach Goals",
              description: "Achieve specific goals to unlock rewards.",
              emoji: "🎯"
            }
          ]
        }
      };
      setMissionData(mockData);
    } catch (error) {
      console.error('Failed to load mission data:', error);
    }
  };

  // Dynamic mission data
  const [missionData, setMissionData] = useState<MissionData>({
    id: 1,
    title: "Koriyaki Tiger",
    subtitle: "Claws of Fury, Spirit of Flame",
    image: "/images/product/p1.png",
    playButtonText: "Play",
    eventMission: {
      title: "Event Mission",
      items: [
        {
          id: 1,
          title: "Ticket Access",
          description: "Only users who buy a ticket can join the event.",
        },
        {
          id: 2,
          title: "Event Duration",
          description: "Event will run for a limited time period.",
          emoji: "⏳"
        },
        {
          id: 3,
          title: "Gameplay Participation",
          description: "During the event time, eligible users can play the event games.",
          emoji: "🎮"
        },
        {
          id: 4,
          title: "Leaderboard Tracking",
          description: "All participant's scores are tracked and displayed on the leaderboard.",
          emoji: "🏆"
        }
      ]
    }
  });

  // Sample event data
  const liveEvents = [
    {
      id: 1,
      title: 'Gaming Chair',
      description: 'Ergonomic RGB Gaming Chair - Worth ₹15,000',
      image: '/images/product/p1.png',
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
      image: '/images/product/p1.png',
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
      image: '/images/product/p1.png',
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
          {/* Sub-tabs for Your Events */}
          <Box
            sx={{
              color: '#fff',
              padding: '0 0 20px 0',
              position: 'sticky',
              top: 0,
              zIndex: 1000,
            }}
          >
            <Tabs
              value={activeSubTab}
              onChange={handleSubTabChange}
              sx={{
                minHeight: 40,
                '& .MuiTabs-indicator': {
                  height: 3,
                  bgcolor: '#FFD015',
                  borderRadius: '2px 2px 0 0',
                },
                '& .MuiTab-root': {
                  color: 'rgba(33, 23, 91, 0.6)',
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: 40,
                  flex: 1,
                  maxWidth: 'none',
                },
                '& .MuiTab-root.Mui-selected': {
                  color: '#21175b',
                  fontWeight: 700,
                },
                borderRadius: '0',
                overflow: 'visible',
              }}
            >
              <Tab label="Event Details" />
              <Tab label="Mission" />
              <Tab label="Leaderboard" />
            </Tabs>
          </Box>

          {/* Sub-tab Content */}
          <Box sx={{ px: 2 }}>
            {/* Event Details Sub-tab */}
            <TabPanel value={activeSubTab} index={0}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                {yourEvents.length > 0 ? (
                  yourEvents.map((event) => (
                    <Box key={event.id}>
                      <EventCard
                        {...event}
                        onBuyTickets={handleBuyTickets}
                      />
                      
                      {/* Event Details Content */}
                      <Box
                        sx={{
                          mt: 3,
                          // p: 3,
                          backgroundColor: 'transparent',
                          borderRadius: '12px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: '#21175B',
                            mb: 2,
                          }}
                        >
                          Event Details
                        </Typography>
                        <Box  sx={{py:'24px', px:'24px',
                          borderRadius: '10px', border: '1px solid rgba(0, 0, 0, 0.20)'}}>

                        
                        <Box
                          component="ul"
                          sx={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            '& li': {
                              display: 'flex',
                              alignItems: 'flex-start',
                              mb: 2,
                              color: '#21175B',
                              fontSize: 16,
                              lineHeight: 1.5,
                            },
                            '& li::before': {
                              content: '"•"',
                              color: '#21175B',
                              fontWeight: 'bold',
                              fontSize: 18,
                              marginRight: '12px',
                              marginTop: '2px',
                            },
                          }}
                        >
                          <li>
                            The event will commence on Sunday, August 15 at 6:00 PM and conclude on Sunday, August 15 at 8:00 PM.
                          </li>
                          <li>
                            The leaderboard will display real-time game scores earned during the event period.
                          </li>
                          <li>
                            Players can participate in multiple games to accumulate points throughout the event.
                          </li>
                          <li>
                            Winners will be officially announced on Monday, August 16 at 6:00 PM.
                          </li>
                          <li>
                            The winners will be officially announced on the event page.
                          </li>
                        </Box>
                        </Box>
                      </Box>
                    </Box>
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

            {/* Mission Sub-tab */}
            <TabPanel value={activeSubTab} index={1}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '280px',
                    flexShrink: 0,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'lightgray',
                  }}
                >
                  <img
                    src="/images/product/p1.png"
                    alt="Koriyaki Tiger"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
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
                    // textAlign: 'center',
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
                     background: '#FAC200',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: 2,
                     cursor: 'pointer',
                       mt:'10px',
                   }}
                   onClick={() => handlePlayGame(missionData.id)}
                 >
                   <Typography
                     sx={{
                       color: '#FFF',
                       fontFamily: 'Poppins',
                       fontSize: '26px',
                       fontStyle: 'normal',
                       fontWeight: 700,
                       lineHeight: 'normal',
                     }}
                   >
                     {missionData.playButtonText}
                   </Typography>
                   {/* <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     style={{
                       color: '#FFF',
                       fontFamily: 'Poppins',
                       fontSize: '26px',
                       fontStyle: 'normal',
                       fontWeight: 700,
                       lineHeight: 'normal',
                     }}
                   >
                     <path
                       d="M8 5V19L19 12L8 5Z"
                       fill="currentColor"
                     />
                   </svg> */}
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

                   
                   {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}> */}
                   <Box  sx={{py:3, px:3,display: 'flex', flexDirection: 'column', gap: 3 ,
                          borderRadius: '10px', border: '1px solid rgba(0, 0, 0, 0.20)'}}>
                     {missionData.eventMission.items.map((item, index) => (
                       <Box key={item.id}>
                         <Typography
                           sx={{
                             color: '#21175B',
                             fontFamily: 'Inter',
                             fontSize: '20px',
                             fontStyle: 'normal',
                             fontWeight: 500,
                             lineHeight: '15px',
                             mb: 1.5,
                           }}
                         >
                           {index + 1}. {item.title} {item.emoji && item.emoji}
                         </Typography>
                         <Typography
                           sx={{
                             color: '#21175B',
                             fontFamily: 'Inter',
                             fontSize: '16px',
                             fontStyle: 'normal',
                             fontWeight: 400,
                             lineHeight: '20px',
                             ml: 2,
                           }}
                         >
                           • {item.description}
                         </Typography>
                       </Box>
                     ))}
                   </Box>
                 </Box>
              </Box>
              
            </TabPanel>

            {/* Leaderboard Sub-tab */}
            <TabPanel value={activeSubTab} index={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
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
                    Leaderboard content will be displayed here
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </TabPanel>
      </Box>
      <TabBar />
    </Box>
  );
};

export default EventsPage;

