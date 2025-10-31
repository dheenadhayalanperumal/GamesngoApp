'use client';

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import PlayersList from '@/components/leaderboard/PlayersList';
import EventTabs from '@/components/events/EventTabs';
import EventDetailsSection from '@/components/events/EventDetailsSection';
import MissionSection, { MissionData } from '@/components/events/MissionSection';
import EventsList, { EventData } from '@/components/events/EventsList';
import EmptyState from '@/components/events/EmptyState';
import ConfirmBuyTicketsPopup from '@/components/events/ConfirmBuyTicketsPopup';

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

interface ApiEvent {
  id: number;
  title: string;
  category: string;
  entryCost: number;
  roomSize: number;
  startAt: string;
  endAt: string;
  timeLeftSeconds: number;
  players: number;
  game: {
    id: number;
    name: string;
    bannerUrl: string;
  };
  prize: {
    product?: {
      id: number;
      title: string;
      coverUrl: string;
      worthCoins: number;
    };
    prizeCoins: number | null;
  };
  status: string;
  state: {
    isLive: boolean;
    isUpcoming: boolean;
    isEnded: boolean;
  };
}

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedYourEventId, setSelectedYourEventId] = useState<number | null>(null);
  const [liveEvents, setLiveEvents] = useState<EventData[]>([]);
  const [isLoadingLiveEvents, setIsLoadingLiveEvents] = useState(true);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Reset sub-tab when switching main tabs
    setActiveSubTab(0);
    // Reset selected event when switching tabs
    setSelectedYourEventId(null);
  };

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveSubTab(newValue);
  };

  const handleBuyTickets = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsConfirmOpen(true);
  };

  const handleConfirmBuy = () => {
    if (selectedEventId) {
      console.log(`Buying tickets for event ${selectedEventId}`);
      // Add your ticket buying logic here
      // After successful purchase, you might want to refresh the events list
    }
    setSelectedEventId(null);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedEventId(null);
  };

  const handlePlayGame = (missionId: number) => {
    console.log(`Playing game for mission ${missionId}`);
    // Add your game play logic here
  };

  const handleEventClick = (eventId: number) => {
    setSelectedYourEventId(eventId);
    setActiveSubTab(0); // Reset to first sub-tab when selecting event
  };

  const handleBackToList = () => {
    setSelectedYourEventId(null);
    setActiveSubTab(0);
  };

  // Helper function to convert seconds to readable time format
  const formatTimeLeft = (seconds: number): string => {
    if (seconds <= 0) return 'Ended';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Transform API event to EventData format
  const transformEvent = (apiEvent: ApiEvent): EventData => {
    const prizeValue = apiEvent.prize?.product?.worthCoins 
      ? `₹${apiEvent.prize.product.worthCoins}` 
      : apiEvent.prize?.prizeCoins 
        ? `${apiEvent.prize.prizeCoins} Coins`
        : 'No Prize';
    
    const imageUrl = apiEvent.game?.bannerUrl || apiEvent.prize?.product?.coverUrl || '/images/product/p1.png';
    
    return {
      id: apiEvent.id,
      title: apiEvent.title,
      description: apiEvent.category || apiEvent.title,
      image: imageUrl,
      prizeValue,
      players: apiEvent.players,
      roomSize: apiEvent.roomSize,
      timeLeft: formatTimeLeft(apiEvent.timeLeftSeconds),
      entryCost: apiEvent.entryCost,
      isLive: apiEvent.state.isLive,
      isPrize: !!apiEvent.prize?.product || !!apiEvent.prize?.prizeCoins,
    };
  };

  // Fetch live events from API
  useEffect(() => {
    const fetchLiveEvents = async () => {
      if (activeTab !== 0) return; // Only fetch when on Live Events tab
      
      try {
        setIsLoadingLiveEvents(true);
        const response = await fetch('/api/public/events?filter=live');
        const data = await response.json();

        console.log('API Response:', data);
        console.log('Number of events from API:', data.events?.length);

        if (response.ok && data.status === 'success' && data.events) {
          const transformedEvents = data.events.map(transformEvent);
          console.log('Transformed events count:', transformedEvents.length);
          console.log('Transformed events:', transformedEvents);
          setLiveEvents(transformedEvents);
        } else {
          console.error('Failed to fetch live events:', data);
          setLiveEvents([]);
        }
      } catch (error) {
        console.error('Error fetching live events:', error);
        setLiveEvents([]);
      } finally {
        setIsLoadingLiveEvents(false);
      }
    };

    fetchLiveEvents();
  }, [activeTab]);

  // Function to load mission data from API
  // const loadMissionData = async (missionId: number) => {
  //   try {
  //     // Replace with your actual API call
  //     // const response = await fetch(`/api/missions/${missionId}`);
  //     // const data = await response.json();
  //     // setMissionData(data);
      
  //     // For now, using mock data
  //     const mockData: MissionData = {
  //       id: missionId,
  //       title: "Dynamic Mission Title",
  //       subtitle: "Dynamic Mission Subtitle",
  //       image: "/images/product/p1.png",
  //       playButtonText: "Start Mission",
  //       eventMission: {
  //         title: "Mission Objectives",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Complete Tasks",
  //             description: "Complete all assigned tasks to progress.",
  //           },
  //           {
  //             id: 2,
  //             title: "Earn Points",
  //             description: "Accumulate points through gameplay.",
  //             emoji: "⭐"
  //           },
  //           {
  //             id: 3,
  //             title: "Reach Goals",
  //             description: "Achieve specific goals to unlock rewards.",
  //             emoji: "🎯"
  //           }
  //         ]
  //       }
  //     };
  //     setMissionData(mockData);
  //   } catch (error) {
  //     console.error('Failed to load mission data:', error);
  //   }
  // };

  // Dynamic mission data
  const [missionData] = useState<MissionData>({
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
      isPrize: true,
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
          {isLoadingLiveEvents ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : liveEvents.length > 0 ? (
            <EventsList events={liveEvents} onBuyTickets={handleBuyTickets} />
          ) : (
            <EmptyState message="No live events available" />
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {selectedYourEventId === null ? (
            // Show all events list
            <>
              {yourEvents.length > 0 ? (
                <EventsList 
                  events={yourEvents} 
                  onBuyTickets={handleBuyTickets}
                  hideBuyButton={true}
                  onEventClick={handleEventClick}
                />
              ) : (
                <EmptyState message="No events registered yet" />
              )}
            </>
          ) : (
            // Show selected event details with tabs
            <>
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
                    {yourEvents
                      .filter((event) => event.id === selectedYourEventId)
                      .map((event) => (
                        <Box key={event.id}>
                          <EventCard
                            {...event}
                            onBuyTickets={handleBuyTickets}
                            hideBuyButton={true}
                          />
                          <EventDetailsSection details={eventDetails} />
                        </Box>
                      ))}
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
            </>
          )}
        </TabPanel>
      </Box>
      <TabBar />

      {/* Confirm Buy Tickets Popup */}
      <ConfirmBuyTicketsPopup
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmBuy}
      />
    </Box>
  );
};

export default EventsPage;

