'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface EventDetailsItem {
  id: number;
  text: string;
}

interface EventDetailsSectionProps {
  title?: string;
  details?: EventDetailsItem[] | string[];
  titleColor?: string;
  textColor?: string;
  showBorder?: boolean;
  htmlContent?: string;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  title = 'Event Details',
  details = [],
  titleColor = '#21175B',
  textColor = '#21175B',
  showBorder = true,
  htmlContent,
}) => {
  // Convert string array to EventDetailsItem array for consistency
  const detailsArray = details.map((item, index) =>
    typeof item === 'string' ? { id: index, text: item } : item
  );

  return (
    <Box
      sx={{
        mt: 3,
        backgroundColor: 'transparent',
        borderRadius: '12px',
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: titleColor,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          py: '24px',
          px: '24px',
          borderRadius: '10px',
          border: showBorder ? '1px solid rgba(0, 0, 0, 0.20)' : 'none',
        }}
      >
        {htmlContent ? (
          // Render HTML content from API
          <Box
            sx={{
              color: textColor,
              fontSize: 16,
              lineHeight: 1.5,
              '& p': {
                margin: 0,
                marginBottom: 2,
              },
              '& p:last-child': {
                marginBottom: 0,
              },
              '& ul, & ol': {
                paddingLeft: '20px',
                marginBottom: 2,
              },
              '& li': {
                marginBottom: 1,
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                marginTop: 2,
                marginBottom: 1,
                fontWeight: 600,
              },
              '& strong, & b': {
                fontWeight: 600,
              },
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          // Render bullet list from details array
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
                color: textColor,
                fontSize: 16,
                lineHeight: 1.5,
              },
              '& li::before': {
                content: '"•"',
                color: textColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginRight: '12px',
                marginTop: '2px',
              },
            }}
          >
            {detailsArray.map((detail) => (
              <li key={detail.id}>{detail.text}</li>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventDetailsSection;
