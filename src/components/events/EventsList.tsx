'use client';

import React from 'react';
import { Box } from '@mui/material';
import EventCard from '@/components/EventCard';

export interface EventData {
  id: number;
  title: string;
  description: string;
  image: string;
  prizeValue: string;
  players: number;
  timeLeft: string;
  entryCost: number;
  isLive: boolean;
  isPrize: boolean;
}

interface EventsListProps {
  events: EventData[];
  onBuyTickets: (eventId: number) => void;
  gap?: number;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  onBuyTickets,
  gap = 3,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: gap,
      }}
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          onBuyTickets={onBuyTickets}
        />
      ))}
    </Box>
  );
};

export default EventsList;
