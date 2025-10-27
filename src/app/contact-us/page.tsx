"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";
import HeaderWithBack from '@/components/HeaderWithBack';

export default function ContactUs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    message: ''
  });

  // Handle form input changes
  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    // You can add API call here to submit the form data
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '120vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button */}
          <HeaderWithBack/>

      {/* Main Content Area - Light Gray Card */}
      <Box sx={{ 
        backgroundColor: '#FFFFFF', // Light gray background from reference
       
        minHeight: 'calc(100vh - 80px)'
      }}>
        <Card sx={{
          backgroundColor: '#EEEEEE', // Light gray card background
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Card shadow
          padding: '12px',
          margin: '12px',
        }}>
          <CardContent sx={{ padding: '-1px', borderRadius: '12px', background: '#FFFFFF' }}>
            {/* Contact Us Title */}
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#21175B', // Dark purple/blue color from reference
                fontSize: '24px', // Large font size from reference
                fontWeight: '500',
                marginBottom: '8px',
                lineHeight: 'normal'
              }}
            >
              Contact Us
            </Typography>

            {/* Description Text */}
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#616161', // Dark gray color from reference
                
                fontSize: '15px', // Font size from reference
                fontWeight: 400,
                marginBottom: '24px',
                lineHeight: 'normal'
              }}
            >
              Reach out to us and our team will assist you as soon as possible.
            </Typography>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <Box sx={{ marginBottom: '20px' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(33, 23, 91, 0.90)', // Dark purple/blue color
                    fontSize: '17px', // Font size from reference
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  Full Name<span style={{ color: '#f44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      height: '48px', // Height from reference
                      '& fieldset': {
                        borderColor: '#E0E0E0', // Light gray border
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#303F9F'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#303F9F'
                      }
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 16px',
                      fontSize: '16px'
                    }
                  }}
                />
              </Box>

              {/* Mobile Number Field */}
              <Box sx={{ marginBottom: '20px' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(33, 23, 91, 0.90)',
                    fontSize: '17px',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  Mobile Number<span style={{ color: '#f44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleInputChange('mobileNumber')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      height: '48px',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#303F9F'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#303F9F'
                      }
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 16px',
                      fontSize: '16px'
                    }
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box sx={{ marginBottom: '20px' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(33, 23, 91, 0.90)',
                    fontSize: '17px',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  Email ID<span style={{ color: '#f44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      height: '48px',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#303F9F'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#303F9F'
                      }
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 16px',
                      fontSize: '16px'
                    }
                  }}
                />
              </Box>

              {/* Message Field */}
              <Box sx={{ marginBottom: '32px' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(33, 23, 91, 0.90)',
                    fontSize: '17px',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  Message<span style={{ color: '#f44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      minHeight: '120px', // Height from reference
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#303F9F'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#303F9F'
                      }
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 16px',
                      fontSize: '16px'
                    }
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#FFC107', // Bright yellow/orange from reference
                  color: 'white',
                  fontSize: '18px', // Font size from reference
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  height: '56px', // Height from reference
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
                  '&:hover': {
                    backgroundColor: '#FFB300',
                    boxShadow: '0 6px 16px rgba(255, 193, 7, 0.4)'
                  }
                }}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
