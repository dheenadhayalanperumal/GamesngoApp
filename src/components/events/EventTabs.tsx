'use client';

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface EventTabsProps {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: string[];
  indicatorColor?: string;
  selectedColor?: string;
  unselectedColor?: string;
}

const EventTabs: React.FC<EventTabsProps> = ({
  activeTab,
  onTabChange,
  tabs,
  indicatorColor = '#3c3cd2',
  selectedColor = '#21175b',
  unselectedColor = 'rgba(33, 23, 91, 0.6)',
}) => {
  return (
    <Box
      sx={{
        color: '#fff',
        padding: '20px 20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        sx={{
          minHeight: 48,
          '& .MuiTabs-indicator': {
            height: 4,
            bgcolor: indicatorColor,
            borderRadius: '4px 4px 0 0',
          },
          '& .MuiTab-root': {
            color: unselectedColor,
            fontSize: 16,
            fontWeight: 600,
            textTransform: 'none',
            minHeight: 48,
            flex: 1,
            maxWidth: 'none',
          },
          '& .MuiTab-root.Mui-selected': {
            color: selectedColor,
            fontWeight: 700,
          },
          borderRadius: '0',
          overflow: 'visible',
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default EventTabs;
