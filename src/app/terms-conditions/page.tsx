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

export default function TermsConditions() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Terms & Conditions');
  const [updatedAt, setUpdatedAt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTermsConditions();
  }, []);

  const fetchTermsConditions = async () => {
    try {
      const response = await fetch('/api/legal/terms', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('Terms & conditions response:', data);

      if (response.ok && data.status === 'success') {
        setContent(data.page.content || '');
        setTitle(data.page.title || 'Terms & Conditions');
        setUpdatedAt(data.page.updatedAt || '');
        setError(false);
      } else {
        console.warn('Failed to fetch terms & conditions:', data.message);
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching terms & conditions:', err);
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
        padding: '24px 20px 100px 20px', // Generous padding for readability
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
              Failed to load terms & conditions
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
        {/* OLD CONTENT BELOW - TO BE REMOVED */}
        {false && (<>
        {/* Introduction Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333', // Dark gray color for headings
              fontSize: '14px', // Slightly larger font for headings
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Introduction
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px', // Standard readable font size
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            Welcome to Gamesngo! These Terms and Conditions (&quot;Terms&quot;) govern your use of our mobile application and services (collectively, the &quot;Service&quot;) operated by Gamesngo (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 3
            }}
          >
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
          </Typography>
        </Box>

        {/* Acceptance of Terms Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Acceptance of Terms
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            By downloading, installing, or using the Gamesngo mobile application, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            If you do not agree to these Terms, please do not use our Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any such modifications.
          </Typography>
        </Box>

        {/* User Accounts Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            User Accounts
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            To access certain features of our Service, you may be required to create an account. You are responsible for:
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 3, marginBottom: 2 }}>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Providing accurate, current, and complete information during registration
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Maintaining the security of your account credentials
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              All activities that occur under your account
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Notifying us immediately of any unauthorized use of your account
            </Typography>
          </Box>
        </Box>

        {/* Game Rules and Fair Play Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Game Rules and Fair Play
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            All users must play fairly and in accordance with the rules of each game. Prohibited activities include:
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 3, marginBottom: 2 }}>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Using cheats, hacks, or any unauthorized third-party software
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Creating multiple accounts to gain unfair advantages
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Exploiting bugs or glitches in the games
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Colluding with other players to manipulate game outcomes
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            Violation of these rules may result in account suspension or permanent ban from our Service.
          </Typography>
        </Box>

        {/* Rewards and Prizes Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Rewards and Prizes
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            Gamesngo offers various rewards, coins, and prizes to users based on their performance in games. Please note:
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 3, marginBottom: 2 }}>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              All rewards are subject to verification and may take time to process
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              We reserve the right to modify or discontinue reward programs at any time
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Rewards may have expiration dates and terms of use
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Fraudulent activity may result in forfeiture of rewards
            </Typography>
          </Box>
        </Box>

        {/* Privacy and Data Collection Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Privacy and Data Collection
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
          </Typography>
        </Box>

        {/* Prohibited Uses Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Prohibited Uses
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            You may not use our Service:
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 3, marginBottom: 2 }}>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              For any unlawful purpose or to solicit others to perform unlawful acts
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              To infringe upon or violate our intellectual property rights or the intellectual property rights of others
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
            </Typography>
          </Box>
        </Box>

        {/* Termination Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Termination
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            If you wish to terminate your account, you may simply discontinue using the Service.
          </Typography>
        </Box>

        {/* Disclaimer Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Disclaimer
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            The information on this Service is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms relating to our Service and the use of this Service.
          </Typography>
        </Box>

        {/* Contact Information Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: 2,
              lineHeight: 1.4
            }}
          >
            Contact Information
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 2
            }}
          >
            If you have any questions about these Terms and Conditions, please contact us at legal@gamesngo.com or through our contact form.
          </Typography>
        </Box>

        {/* Last Updated Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666666', // Lighter gray for less important text
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}
          >
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>
        </>)}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
