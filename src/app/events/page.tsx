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
import LoginPopup from '@/components/LoginPopup';
import { useAuth } from '@/contexts/AuthContext';

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
  canRegister: boolean;
  alreadyRegistered?: boolean;
}

interface MyEventApiResponse {
  id: number;
  event: {
    id: number;
    title: string;
    startAt: string;
    endAt: string;
  };
  game: {
    id: number;
    name: string;
    bannerUrl: string;
  };
  status: string;
  score: number | null;
  joinedAt: string;
}

const EventsPage = () => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedYourEventId, setSelectedYourEventId] = useState<number | null>(null);
  const [liveEvents, setLiveEvents] = useState<EventData[]>([]);
  const [yourEvents, setYourEvents] = useState<EventData[]>([]);
  const [isLoadingLiveEvents, setIsLoadingLiveEvents] = useState(true);
  const [isLoadingYourEvents, setIsLoadingYourEvents] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

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
    console.log('handleBuyTickets called with eventId:', eventId);
    // Check if user is logged in
    if (!isLoggedIn) {
      setSelectedEventId(eventId);
      setIsLoginPopupOpen(true);
      return;
    }
    
    // If logged in, show confirmation popup
    setSelectedEventId(eventId);
    setIsConfirmOpen(true);
  };

  const handleConfirmBuy = async () => {
    if (!selectedEventId) return;
    
    console.log('handleConfirmBuy - selectedEventId:', selectedEventId);
    console.log('Registering for event:', selectedEventId);
    
    setIsRegistering(true);
    try {
      const response = await fetch(`/api/events/${selectedEventId}/register`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        console.log('Event registration successful:', data);
        alert('Successfully registered for the event!');
        
        // Close confirmation popup
        setIsConfirmOpen(false);
        setSelectedEventId(null);
        
        // Refresh live events list to update player counts
        if (activeTab === 0) {
          const refreshResponse = await fetch('/api/public/events?scope=live');
          const refreshData = await refreshResponse.json();
          if (refreshResponse.ok && refreshData.status === 'success' && refreshData.events) {
            const transformedEvents = refreshData.events.map(transformEvent);
            setLiveEvents(transformedEvents);
          }
        }
      } else {
        // Handle different error codes
        let errorMessage = 'Failed to register for event';
        
        switch (response.status) {
          case 401:
            errorMessage = 'Please login to register for events';
            setIsConfirmOpen(false);
            setIsLoginPopupOpen(true);
            break;
          case 402:
            errorMessage = 'Insufficient coins. Please recharge your wallet.';
            break;
          case 404:
            errorMessage = 'Event not available';
            break;
          case 409:
            errorMessage = 'You have already registered for this event';
            break;
          case 422:
            errorMessage = data.message || 'Event not yet started, already ended, or full';
            break;
          case 500:
            errorMessage = 'Registration error. Please try again.';
            break;
          default:
            errorMessage = data.message || 'Failed to register for event';
        }
        
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedEventId(null);
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
    // Reset selected event if user closes login without logging in
    if (!isLoggedIn) {
      setSelectedEventId(null);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
    // After login, if there's a selected event, show confirmation popup
    if (selectedEventId) {
      setIsConfirmOpen(true);
    }
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
    console.log('transformEvent - apiEvent.id:', apiEvent.id, 'apiEvent.game.id:', apiEvent.game?.id);
    
    const prizeValue = apiEvent.prize?.product?.worthCoins 
      ? `₹${apiEvent.prize.product.worthCoins}` 
      : apiEvent.prize?.prizeCoins 
        ? `${apiEvent.prize.prizeCoins} Coins`
        : 'No Prize';
    
    const imageUrl = apiEvent.game?.bannerUrl || apiEvent.prize?.product?.coverUrl || '/images/product/p1.png';
    
    const transformedEvent = {
      id: apiEvent.id, // Make sure we use event.id, NOT game.id
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
      canRegister: apiEvent.canRegister,
      alreadyRegistered: apiEvent.alreadyRegistered,
    };
    
    console.log('transformEvent - Event ID:', transformedEvent.id, {
      canRegister: transformedEvent.canRegister,
      alreadyRegistered: transformedEvent.alreadyRegistered,
      apiEventCanRegister: apiEvent.canRegister,
      apiEventAlreadyRegistered: apiEvent.alreadyRegistered
    });
    return transformedEvent;
  };

  // Fetch live events from API
  useEffect(() => {
    const fetchLiveEvents = async () => {
      if (activeTab !== 0) return; // Only fetch when on Live Events tab
      
      try {
        setIsLoadingLiveEvents(true);
        const response = await fetch('/api/public/events');
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

  // Transform "My Events" API response to EventData format
  const transformMyEvent = (myEventApi: MyEventApiResponse): EventData => {
    // Calculate time left from endAt
    const endTime = new Date(myEventApi.event.endAt).getTime();
    const now = new Date().getTime();
    const timeLeftSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
    
    return {
      id: myEventApi.event.id, // Use event.id, not the participation id
      title: myEventApi.event.title,
      description: myEventApi.game.name,
      image: myEventApi.game.bannerUrl || '/images/product/p1.png',
      prizeValue: '—', // Not provided in my events API
      players: 0, // Not provided in my events API
      roomSize: undefined,
      timeLeft: formatTimeLeft(timeLeftSeconds),
      entryCost: 0, // Not provided in my events API
      isLive: myEventApi.status === 'Joined', // Consider "Joined" as live
      isPrize: false, // We don't have prize info in my events
      canRegister: false, // Already registered
      alreadyRegistered: true, // User has joined this event
      startAt: myEventApi.event.startAt,
      endAt: myEventApi.event.endAt,
    };
  };

  // Fetch "Your Events" from API
  useEffect(() => {
    const fetchYourEvents = async () => {
      if (activeTab !== 1 || !isLoggedIn) return; // Only fetch when on Your Events tab and user is logged in
      
      try {
        setIsLoadingYourEvents(true);
        const response = await fetch('/api/events/my');
        const data = await response.json();

        console.log('Your Events API Response:', data);
        console.log('Number of your events:', data.events?.length);

        if (response.ok && data.status === 'success' && data.events) {
          const transformedEvents = data.events.map(transformMyEvent);
          console.log('Transformed your events:', transformedEvents);
          setYourEvents(transformedEvents);
        } else {
          console.error('Failed to fetch your events:', data);
          setYourEvents([]);
        }
      } catch (error) {
        console.error('Error fetching your events:', error);
        setYourEvents([]);
      } finally {
        setIsLoadingYourEvents(false);
      }
    };

    fetchYourEvents();
  }, [activeTab, isLoggedIn]);

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


  // yourEvents is now fetched from API and stored in state

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
              {isLoadingYourEvents ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                  <CircularProgress />
                </Box>
              ) : yourEvents.length > 0 ? (
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
        isLoading={isRegistering}
      />

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleLoginPopupClose}
        onLogin={handleLoginSuccess}
      />
    </Box>
  );
};

export default EventsPage;

