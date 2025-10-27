"use client";

import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";

export default function PrivacyPolicy() {
  const router = useRouter();

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
         {/* Page Title */}
         <Typography 
          variant="h4" 
          sx={{ 
            color: '#333333', // Dark gray color for headings
            fontSize: '24px', // Large font size for title
            fontWeight: 'bold',
            textAlign: 'left',
            marginBottom: 2,
           
          }}
        >
          Privacy policy
        </Typography>
        {/* Disclaimer Section */}
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
            Disclaimer
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
            The English version of this Privacy Policy shall always prevail in case of any conflicts with translated versions, if any.
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
            This Privacy Policy describes the policies and procedures of Gamesngo and its affiliates (collectively, "Gamesngo", "we", "our" or "us") on the collection, use and disclosure of your information on our platform and the services, features, content, applications or products we offer (collectively, the "Service").
          </Typography>
        </Box>

        {/* Collection of Your Information Section */}
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
            Collection of Your Information
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
            We collect information about your buying behavior, browsing patterns, preferences, and other information that you provide to us when you interact with our platform. We may also collect information about your device, including your IP address, browser type, and operating system.
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
            We store and process your information primarily in India. By using our Service, you consent to the collection, use, and disclosure of your information in accordance with this Privacy Policy.
          </Typography>
        </Box>

        {/* Use of Demographic / Profile Data Section */}
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
            Use of Demographic / Profile Data / Your Information
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
            We use the information we collect to provide, maintain, and improve our Service, including to:
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 3, marginBottom: 2 }}>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Conduct internal research and analysis to improve our products and services
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Enhance your user experience and personalize our Service
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Send you marketing communications and promotional materials
            </Typography>
            <Typography component="li" sx={{ 
              color: '#333333',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 1
            }}>
              Share insights with our group companies, affiliates, and business partners
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
            We may collect your email addresses, delivery addresses, phone numbers, payment instrument details, and information from loyalty programs or third-party business partners (e.g., for travel tickets, movie tickets, online bills). We may also collect your UPI ID and access SMS, instant messages, contacts, directory, camera, photo gallery, device information, PAN, credit information reports, GST Number, and KYC details with your consent.
          </Typography>
        </Box>

        {/* Cookies Section */}
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
            Cookies
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
            We use "cookies" and "session cookies" to analyze web page flow, measure promotional effectiveness, and promote trust and safety. You can decline or delete cookies, though this may affect certain features of our platform.
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
            We also use cookies from third-party partners like Google Analytics. For more information about how Google uses your data, please visit their privacy policy at{' '}
            <Typography 
              component="a" 
              href="https://www.google.com/intl/en/policies/privacy/" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ 
                color: '#3F51B5', // Blue color for links
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              https://www.google.com/intl/en/policies/privacy/
            </Typography>
            .
          </Typography>
        </Box>

        {/* Data Security Section */}
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
            Data Security
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
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
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
            If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@gamesngo.com or through our contact form.
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
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
