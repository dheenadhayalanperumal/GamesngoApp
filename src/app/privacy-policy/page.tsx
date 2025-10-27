"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";

export default function PrivacyPolicy() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Privacy Policy');
  const [updatedAt, setUpdatedAt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await fetch('/api/legal/privacy', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('Privacy policy response:', data);

      if (response.ok && data.status === 'success') {
        setContent(data.page.content || '');
        setTitle(data.page.title || 'Privacy Policy');
        setUpdatedAt(data.page.updatedAt || '');
        setError(false);
      } else {
        console.warn('Failed to fetch privacy policy:', data.message);
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching privacy policy:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button and Title */}
      <Box sx={{ 
        backgroundColor: '#3F51B5', // Dark blue color from reference
        padding: '20px 20px 20px 20px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {/* Back Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer' 
          }} 
          onClick={() => router.back()}
        >
          <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontWeight: 500,
              fontSize: '16px' // Font size from reference
            }}
          >
            Back
          </Typography>
        </Box>

       
      </Box>

      {/* Main Content Area - White Background with Scrollable Content */}
      <Box sx={{ 
        backgroundColor: 'white', // White background from reference
        padding: '20px 20px 100px 20px', // Generous padding for readability
        minHeight: 'calc(100vh - 120px)',
        overflowY: 'auto'
      }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress sx={{ color: '#4848DB' }} />
          </Box>
        ) : error ? (
          <Box sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#f44336', marginBottom: 2 }}>
              Failed to load privacy policy
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', marginBottom: 3 }}>
              Please try again later or contact support if the problem persists.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Page Title */}
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#333333',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'left',
                marginBottom: 2,
              }}
            >
              {title}
            </Typography>
            
            {/* API Content */}
            <Box
              sx={{
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: '#333333',
                  fontWeight: 'bold',
                  marginTop: 3,
                  marginBottom: 2,
                },
                '& p': {
                  color: '#333333',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  marginBottom: 2,
                },
                '& ul, & ol': {
                  paddingLeft: 3,
                  marginBottom: 2,
                },
                '& li': {
                  color: '#333333',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  marginBottom: 1,
                },
                '& a': {
                  color: '#3F51B5',
                  textDecoration: 'underline',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                },
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* Last Updated */}
            {updatedAt && (
              <Box sx={{ marginTop: 4 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#666666',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontStyle: 'italic'
                  }}
                >
                  Last updated: {new Date(updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
