'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { 
  ChevronLeft,
  ExpandMore
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function FAQPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleBack = () => {
    router.back();
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqItems = [
    {
      id: 'panel1',
      question: '1. How it Works ?',
      answer: 'You can redeem your Games N Go coins for exciting real rewards, gift vouchers, and exclusive benefits directly inside the app anytime.'
    },
    {
      id: 'panel2',
      question: '2. How it Works ?',
      answer: 'You can redeem your Games N Go coins for exciting real rewards, gift vouchers, and exclusive benefits directly inside the app anytime.'
    },
    {
      id: 'panel3',
      question: '3. How it Works ?',
      answer: 'You can redeem your Games N Go coins for exciting real rewards, gift vouchers, and exclusive benefits directly inside the app anytime.'
    },
    {
      id: 'panel4',
      question: '4. How it Works ?',
      answer: 'You can redeem your Games N Go coins for exciting real rewards, gift vouchers, and exclusive benefits directly inside the app anytime.'
    },
    {
      id: 'panel5',
      question: '5. How it Works ?',
      answer: 'You can redeem your Games N Go coins for exciting real rewards, gift vouchers, and exclusive benefits directly inside the app anytime.'
    },
    {
      id: 'panel6',
      question: '6. How it Works ?',
      answer: 'You can redeem your Games N Go coins for exciting real rewards, gift vouchers, and exclusive benefits directly inside the app anytime.'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F5F5F5',
        position: 'relative'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: '#3F51B5',
          padding: { xs: '12px 16px', sm: '15px 20px', md: '15px 24px' },
          display: 'flex',
          alignItems: 'center',
          minHeight: { xs: '60px', sm: '70px', md: '80px' }
        }}
      >
        {/* Back Button */}
        <Box 
          onClick={handleBack}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: 'white',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          <IconButton 
            sx={{ 
              color: 'white',
              padding: { xs: 0.5, sm: 1, md: 1 },
              mr: 1
            }}
          >
            <ChevronLeft sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
            }} />
          </IconButton>
          <Typography sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            fontWeight: 600,
            fontFamily: 'Arial, sans-serif'
          }}>
            Back
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '20px', sm: '30px', md: '40px' },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Page Title */}
        <Typography sx={{
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          fontWeight: 800,
          color: '#616161',
          textAlign: 'center',
          mb: 2,
          fontFamily: 'Arial, sans-serif'
        }}>
          FAQ's
        </Typography>

        {/* FAQ Accordion */}
        <Card
          sx={{
            borderRadius: 3,
            background: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          {faqItems.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              sx={{
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
                boxShadow: 'none',
                borderBottom: index < faqItems.length - 1 ? '1px solid #e0e0e0' : 'none'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: '#212121' }} />}
                sx={{
                  padding: { xs: '16px 20px', sm: '20px 24px', md: '24px 28px' },
                  '&.Mui-expanded': {
                    minHeight: 'auto',
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                    '&.Mui-expanded': {
                      margin: 0,
                    }
                  }
                }}
              >
                <Typography sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontWeight: 700,
                  color: '#21175B',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{
                padding: { xs: '0 20px 20px 20px', sm: '0 24px 24px 24px', md: '0 28px 28px 28px' }
              }}>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#21175B',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.6,
                  paddingLeft: { xs: 0, sm: 0, md: 0 }
                }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      </Box>
    </Box>
  );
}
