'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import PlayersList from '@/components/leaderboard/PlayersList';
import EventTabs from '@/components/events/EventTabs';
import EventDetailsSection from '@/components/events/EventDetailsSection';
import MissionSection, { MissionData } from '@/components/events/MissionSection';
import EventsList, { EventData } from '@/components/events/EventsList';
import EmptyState from '@/components/events/EmptyState';

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
  const [activeSubTab, setActiveSubTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Reset sub-tab when switching main tabs
    setActiveSubTab(0);
  };

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
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

  // Dummy data for PlayersList component
  const playerrank = [
    {
      rank: 1,
      name: "Alex Johnson",
      avatar: "/images/crown/crown2.svg",
      score: 2450,
      coins: 1250
    },
    {
      rank: 2,
      name: "Sarah Wilson",
      avatar: "/images/product/p1.png",
      score: 2380,
      coins: 1180
    },
    {
      rank: 3,
      name: "Mike Chen",
      avatar: "/images/product/p1.png",
      score: 2320,
      coins: 1120
    },
    {
      rank: 4,
      name: "Emma Davis",
      avatar: "/images/product/p1.png",
      score: 2280,
      coins: 1080
    },
    {
      rank: 5,
      name: "David Brown",
      avatar: "/images/product/p1.png",
      score: 2250,
      coins: 1050
    },
    {
      rank: 6,
      name: "Lisa Garcia",
      avatar: "/images/product/p1.png",
      score: 2200,
      coins: 1000
    },
    {
      rank: 7,
      name: "Tom Anderson",
      avatar: "/images/product/p1.png",
      score: 2180,
      coins: 980
    },
    {
      rank: 8,
      name: "Anna Taylor",
      avatar: "/images/product/p1.png",
      score: 2150,
      coins: 950
    },
    {
      rank: 9,
      name: "Chris Lee",
      avatar: "/images/product/p1.png",
      score: 2120,
      coins: 920
    },
    {
      rank: 10,
      name: "Maria Rodriguez",
      avatar: "/images/product/p1.png",
      score: 2100,
      coins: 900
    }
  ];

  // Sample event data
  const liveEvents: EventData[] = [
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

  const yourEvents: EventData[] = [
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

  // Event details data
  const eventDetails: string[] = [
    'The event will commence on Sunday, August 15 at 6:00 PM and conclude on Sunday, August 15 at 8:00 PM.',
    'The leaderboard will display real-time game scores earned during the event period.',
    'Players can participate in multiple games to accumulate points throughout the event.',
    'Winners will be officially announced on Monday, August 16 at 6:00 PM.',
    'The winners will be officially announced on the event page.',
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
      <EventTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={['Live Events', 'Your Events']}
      />

      {/* Tab Content */}
      <Box sx={{ px: 2 }}>
        <TabPanel value={activeTab} index={0}>
          <EventsList events={liveEvents} onBuyTickets={handleBuyTickets} />
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
            <EventTabs
              activeTab={activeSubTab}
              onTabChange={handleSubTabChange}
              tabs={['Event Details', 'Mission', 'Leaderboard']}
              indicatorColor="#FFD015"
            />
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
                      <EventDetailsSection details={eventDetails} />
                    </Box>
                  ))
                ) : (
                  <EmptyState message="No events registered yet" />
                )}
              </Box>
            </TabPanel>

            {/* Mission Sub-tab */}
            <TabPanel value={activeSubTab} index={1}>
              <MissionSection
                missionData={missionData}
                onPlayGame={handlePlayGame}
              />
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
                <PlayersList players={playerrank} title="Event Leaderboard" removeMargins={true} />
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

