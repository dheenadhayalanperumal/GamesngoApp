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
  roomSize?: number;
  timeLeft: string;
  entryCost: number;
  isLive: boolean;
  isPrize: boolean;
}

interface EventsListProps {
  events: EventData[];
  onBuyTickets: (eventId: number) => void;
  gap?: number;
  hideBuyButton?: boolean;
  onEventClick?: (eventId: number) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  onBuyTickets,
  gap = 3,
  hideBuyButton = false,
  onEventClick,
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
          hideBuyButton={hideBuyButton}
          onClick={onEventClick ? () => onEventClick(event.id) : undefined}
        />
      ))}
    </Box>
  );
};

export default EventsList;
