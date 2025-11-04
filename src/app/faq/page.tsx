'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Alert } from '@mui/material';
import { 
  ChevronLeft,
  ExpandMore
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
}

interface FAQsResponse {
  status: string;
  faqs?: FAQ[];
  reason?: string;
}

export default function FAQPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | false>(false);

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/public/faqs', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        const data: FAQsResponse = await response.json();
        console.log('FAQs API Response:', data);

        if (response.ok && data.status === 'success' && data.faqs) {
          // Sort FAQs by sortOrder ascending
          const sortedFaqs = [...data.faqs].sort((a, b) => a.sortOrder - b.sortOrder);
          setFaqs(sortedFaqs);
          
          // Expand first FAQ by default if available
          if (sortedFaqs.length > 0) {
            setExpanded(`panel-${sortedFaqs[0].id}`);
          }
        } else {
          setError(data.reason || 'Failed to fetch FAQs');
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F5F5F5',
        position: 'relative',
        margin:"0 -15px",
        width:"calc(100% + 30px)",
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
          FAQ&apos;s
        </Typography>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress size={60} sx={{ color: '#3F51B5' }} />
          </Box>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* FAQ Accordion */}
        {!isLoading && !error && faqs.length > 0 && (
          <Card
            sx={{
              borderRadius: 3,
              background: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion
                key={faq.id}
                expanded={expanded === `panel-${faq.id}`}
                onChange={handleChange(`panel-${faq.id}`)}
                sx={{
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: 0,
                  },
                  boxShadow: 'none',
                  borderBottom: index < faqs.length - 1 ? '1px solid #e0e0e0' : 'none'
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
                    {faq.question}
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
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && !error && faqs.length === 0 && (
          <Alert severity="info">
            No FAQs available at the moment.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
