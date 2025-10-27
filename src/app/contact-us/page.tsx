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

export default function ContactUs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Clear previous messages
    setErrors({});
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      console.log('Submitting contact form...', formData);
      
      const response = await fetch('/api/public/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          mobile_number: formData.mobileNumber,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      console.log('Contact form response:', data);

      if (response.ok && data.status === 'success') {
        setSuccessMessage(data.message || 'Thank you for contacting us. We will get back to you soon.');
        // Clear form
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          message: ''
        });
        
        // Show success message for 5 seconds then navigate back
        setTimeout(() => {
          router.back();
        }, 3000);
      } else {
        console.error('Form submission failed:', data);
        
        if (data.errors) {
          // Map API errors to form field errors
          const fieldErrors: Record<string, string> = {};
          if (data.errors.full_name) fieldErrors.fullName = data.errors.full_name;
          if (data.errors.mobile_number) fieldErrors.mobileNumber = data.errors.mobile_number;
          if (data.errors.email) fieldErrors.email = data.errors.email;
          if (data.errors.message) fieldErrors.message = data.errors.message;
          setErrors(fieldErrors);
        } else {
          alert(data.message || 'Failed to submit form. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '120vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button */}
      <Box sx={{ 
        backgroundColor: '#4848DB',
        padding: '20px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
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
              fontSize: '16px'
            }}
          >
            Back
          </Typography>
        </Box>
      </Box>

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

            {/* Success Message */}
            {successMessage && (
              <Box sx={{ 
                marginBottom: '20px', 
                padding: '16px', 
                backgroundColor: '#e8f5e9', 
                borderRadius: '8px',
                border: '1px solid #4caf50'
              }}>
                <Typography sx={{ color: '#2e7d32', fontSize: '15px', fontWeight: 500 }}>
                  ✅ {successMessage}
                </Typography>
              </Box>
            )}

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
                  error={!!errors.fullName}
                  helperText={errors.fullName}
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
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.message}
                  helperText={errors.message}
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
                disabled={isSubmitting}
                sx={{
                  backgroundColor: isSubmitting ? '#e0e0e0' : '#FFC107', // Bright yellow/orange from reference
                  color: isSubmitting ? '#9e9e9e' : 'white',
                  fontSize: '18px', // Font size from reference
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  height: '56px', // Height from reference
                  textTransform: 'none',
                  boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(255, 193, 7, 0.3)',
                  '&:hover': {
                    backgroundColor: isSubmitting ? '#e0e0e0' : '#FFB300',
                    boxShadow: isSubmitting ? 'none' : '0 6px 16px rgba(255, 193, 7, 0.4)'
                  },
                  '&:disabled': {
                    backgroundColor: '#e0e0e0',
                    color: '#9e9e9e'
                  }
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
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
