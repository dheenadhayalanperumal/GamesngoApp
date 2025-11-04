"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Lock,
  CheckCircle,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TabBar from "@/components/TabBar";

interface ProfileData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  avatarUrl: string;
}

interface ProfileEditQuote {
  costCoins: number;
  balance: number;
  eligibleForEmailReward: boolean;
}

interface ProfileDetailsResponse {
  status: string;
  user: ProfileData;
  profileEdit: ProfileEditQuote;
  message?: string;
}

interface ProfileRequestResponse {
  status: string;
  requires?: {
    emailOtp: boolean;
  };
  costCoins?: number;
  debug?: {
    email_debug_otp?: string;
  };
  message?: string;
}

interface ProfileUpdateResponse {
  status: string;
  updated?: string[];
  costCoins?: number;
  rewarded?: boolean;
  message?: string;
}

export default function EditProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileEdit, setProfileEdit] = useState<ProfileEditQuote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    otp: '',
    phone: '',
  });
  
  const [originalEmail, setOriginalEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const [requiresEmailOtp, setRequiresEmailOtp] = useState(false);
  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [rewardedCoins, setRewardedCoins] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/profile/details', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        const data: ProfileDetailsResponse = await response.json();
        console.log('Profile Details Response:', data);

        if (response.ok && data.status === 'success') {
          setProfileData(data.user);
          setProfileEdit(data.profileEdit);
          setFormData({
            userName: data.user.name || '',
            email: data.user.email || '',
            otp: '',
            phone: data.user.mobile || '',
          });
          setOriginalEmail(data.user.email || '');
          
          if (data.user.avatarUrl) {
            setAvatarPreview(data.user.avatarUrl);
          }
        } else {
          if (response.status === 401) {
            setError('Please login to view profile');
          } else {
            setError(data.message || 'Failed to fetch profile data');
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to fetch profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset OTP verification if email changes
    if (field === 'email' && value !== originalEmail) {
      setShowOtpField(false);
      setIsOtpVerified(false);
      setRequiresEmailOtp(false);
      setOtpError('');
      setFormData(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    // Only verify if email has changed
    if (formData.email === originalEmail) {
      setShowOtpField(false);
      setIsOtpVerified(true);
      setRequiresEmailOtp(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsVerifying(true);
      setError(null);
      setOtpError('');
      
      const response = await fetch('/api/profile/request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data: ProfileRequestResponse = await response.json();
      console.log('Profile Request Response:', data);

      if (response.ok && data.status === 'success') {
        if (data.requires?.emailOtp) {
          setShowOtpField(true);
          setRequiresEmailOtp(true);
          if (data.debug?.email_debug_otp) {
            setDebugOtp(data.debug.email_debug_otp);
            console.log('Debug OTP:', data.debug.email_debug_otp);
          }
        } else {
          setShowOtpField(false);
          setIsOtpVerified(true);
          setRequiresEmailOtp(false);
        }
      } else {
        if (response.status === 422) {
          setError(data.message || 'Invalid email address or email already in use');
        } else {
          setError(data.message || 'Failed to send verification code');
        }
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow digits and limit to 4 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({
      ...prev,
      otp: digitsOnly
    }));
    setOtpError('');
    
    // Activate save button when 4 digits are entered
    if (digitsOnly.length === 4) {
      setIsOtpVerified(true);
    } else {
      setIsOtpVerified(false);
    }
  };

  const handleSave = async () => {
    // Check if email changed and requires OTP
    if (formData.email !== originalEmail && requiresEmailOtp && formData.otp.length !== 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      // Prepare FormData for multipart upload
      const updateFormData = new FormData();
      
      if (formData.userName !== profileData?.name) {
        updateFormData.append('name', formData.userName);
      }
      
      if (formData.email !== originalEmail) {
        updateFormData.append('email', formData.email);
        if (requiresEmailOtp && formData.otp) {
          updateFormData.append('emailOtp', formData.otp);
        }
      }
      
      if (avatarFile) {
        updateFormData.append('avatar', avatarFile);
      }

      const response = await fetch('/api/profile/update', {
        method: 'POST',
        credentials: 'include',
        body: updateFormData,
      });

      const data: ProfileUpdateResponse = await response.json();
      console.log('Profile Update Response:', data);

      if (response.ok && data.status === 'success') {
        setSuccessMessage(
          data.rewarded 
            ? `Profile updated successfully! You earned ${data.costCoins || 10} coins for setting your email for the first time.`
            : 'Profile updated successfully!'
        );
        if (data.rewarded && data.costCoins) {
          setRewardedCoins(data.costCoins);
        }
        setShowSuccessPopup(true);
      } else {
        if (response.status === 400) {
          setOtpError('Invalid or expired OTP. Please request a new one.');
          setError('Invalid or expired OTP');
        } else if (response.status === 422) {
          setError(data.message || 'Validation error. Please check your inputs.');
        } else {
          setError(data.message || 'Failed to update profile');
        }
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    router.back();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="content-container" style={{ backgroundColor: 'white', minHeight: '110vh', padding: 0, margin: '-15px' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <CircularProgress size={60} sx={{ color: '#FAC200' }} />
        </Box>
      </div>
    );
  }

  // Error state
  if (error && !profileData) {
    return (
      <div className="content-container" style={{ backgroundColor: 'white', minHeight: '110vh', padding: 0, margin: '-15px' }}>
        <Box sx={{ padding: '20px' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </div>
    );
  }

  const canSave = !requiresEmailOtp || (requiresEmailOtp && isOtpVerified) || formData.email === originalEmail;

  return (
    <div className="content-container" style={{ backgroundColor: 'white', minHeight: '110vh', padding: 0, margin: '-15px' }}>
      {/* Reward Banner */}
      {profileEdit?.eligibleForEmailReward && !originalEmail && (
        <Box sx={{
          backgroundColor: 'rgba(250, 194, 0, 0.1)',
          border: '2px dashed #FAC200',
          borderRadius: '12px',
          padding: '16px',
          margin: '20px',
          marginBottom: 0,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center' }}>
              <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box>
              <Typography sx={{ color: '#21175B', fontWeight: 600, fontSize: '14px' }}>
                Earn {profileEdit.costCoins} Coins!
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '12px' }}>
                Add your email for the first time and get rewarded
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Blue Header Section */}
      <Box sx={{ 
        backgroundColor: '#3C3CD2',
        padding: '35px 20px 60px 20px',
        color: 'white',
        position: 'relative',
        borderRadius: '0px 0px 20px 20px',
      }}>
        {/* Top Bar with Back */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => router.back()}>
            <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
              Back
            </Typography>
          </Box>
        </Box>

        {/* Profile Avatar with Plus Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Avatar
            src={avatarPreview || profileData?.avatarUrl || '/logoblue.svg'}
            alt="Profile"
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: 'white',
              border: 'none',
            }}
          />
          <IconButton
            onClick={handleAvatarClick}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 'calc(50% - 50px)',
              backgroundColor: '#FAC200',
              color: 'white',
              width: 32,
              height: 32,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#e6b000',
              }
            }}
          >
            <Add sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Form Section */}
      <Box sx={{ padding: '20px' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* User Name Field */}
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#21175B',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: 1
            }}>
              User Name
            </Typography>
            <TextField
              fullWidth
              value={formData.userName}
              onChange={(e) => handleInputChange('userName', e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#E0E0E0',
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  color: '#333',
                  padding: '12px 16px',
                }
              }}
            />
          </Box>

          {/* Email Field with Verify Button */}
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#21175B',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: 1
            }}>
              Email Address
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                variant="outlined"
                disabled={isVerifying}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#E0E0E0',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Rubik',
                    fontSize: '16px',
                    color: '#333',
                    padding: '12px 16px',
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleVerify}
                disabled={isVerifying || formData.email === originalEmail}
                sx={{
                  backgroundColor: '#FAC200',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  fontSize: '14px',
                  fontFamily: 'Rubik',
                  minWidth: '80px',
                  height: '48px',
                  '&:hover': {
                    backgroundColor: '#e6b000',
                  },
                  '&:disabled': {
                    backgroundColor: '#CCCCCC',
                  }
                }}
              >
                {isVerifying ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Verify'}
              </Button>
            </Box>
            <Typography variant="caption" sx={{ 
              color: '#999',
              fontFamily: 'Rubik',
              fontSize: '12px',
              marginTop: 0.5,
              display: 'block'
            }}>
              {formData.email === originalEmail 
                ? 'Email unchanged' 
                : 'We will send verification code to your email'}
            </Typography>
            {debugOtp && (
              <Typography variant="caption" sx={{ 
                color: '#FAC200',
                fontFamily: 'Rubik',
                fontSize: '12px',
                marginTop: 0.5,
                display: 'block',
                fontWeight: 600
              }}>
                Debug OTP: {debugOtp}
              </Typography>
            )}
          </Box>

          {/* OTP Field - Only show after verify button is clicked and email changed */}
          {showOtpField && formData.email !== originalEmail && (
            <Box>
              <Typography variant="body2" sx={{ 
                color: '#21175B',
                fontFamily: 'Rubik',
                fontSize: '16px',
                fontWeight: 500,
                marginBottom: 1
              }}>
                OTP
              </Typography>
              <TextField
                fullWidth
                type="text"
                value={formData.otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                variant="outlined"
                placeholder="Enter 4-digit OTP"
                error={!!otpError}
                helperText={otpError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: isOtpVerified ? '#4CAF50' : '#FAC200', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: isOtpVerified ? '#F8FFF8' : 'white',
                    '& fieldset': {
                      borderColor: isOtpVerified ? '#4CAF50' : otpError ? '#F44336' : '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: isOtpVerified ? '#4CAF50' : otpError ? '#F44336' : '#E0E0E0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isOtpVerified ? '#4CAF50' : otpError ? '#F44336' : '#E0E0E0',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Rubik',
                    fontSize: '16px',
                    color: '#333',
                    padding: '12px 16px',
                    letterSpacing: '0.2em',
                    textAlign: 'center',
                  }
                }}
              />
            </Box>
          )}

          {/* Mobile Number Field - Non-editable */}
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#666',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: 1
            }}>
              Mobile Number
            </Typography>
            <TextField
              fullWidth
              type="tel"
              value={formData.phone}
              variant="outlined"
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#F5F5F5',
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&.Mui-disabled fieldset': {
                    borderColor: '#E0E0E0',
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  color: '#666',
                  padding: '12px 16px',
                }
              }}
            />
          </Box>
        </Box>

        {/* Save Changes Button */}
        <Box sx={{ padding: '20px 0' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            disabled={!canSave || isSaving}
            sx={{
              backgroundColor: canSave ? '#FAC200' : '#CCCCCC',
              color: 'white',
              fontWeight: 600,
              borderRadius: '25px',
              py: 2,
              fontSize: '16px',
              fontFamily: 'Rubik',
              textTransform: 'none',
              boxShadow: canSave ? '0 4px 12px rgba(250, 194, 0, 0.3)' : 'none',
              cursor: canSave ? 'pointer' : 'not-allowed',
              '&:hover': {
                backgroundColor: canSave ? '#e6b000' : '#CCCCCC',
                boxShadow: canSave ? '0 6px 16px rgba(250, 194, 0, 0.4)' : 'none',
              },
              '&:active': {
                transform: canSave ? 'translateY(1px)' : 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: '#CCCCCC',
                color: '#999999',
              }
            }}
          >
            {isSaving ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} sx={{ color: 'white' }} />
                Saving...
              </Box>
            ) : (
              `Save Changes`
            )}
          </Button>
        </Box>
      </Box>

      {/* Success Popup */}
      {showSuccessPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3
          }}
          onClick={handleSuccessClose}
        >
          <Card
            onClick={(e) => e.stopPropagation()}
            sx={{
              background: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              maxWidth: { xs: '90%', sm: '400px', md: '450px' },
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              {/* Success Icon */}
              <Box
                sx={{
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  background: 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  position: 'relative',
                }}
              >
                <CheckCircle sx={{ fontSize: { xs: 50, sm: 60, md: 70 }, color: 'white' }} />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: '#4CAF50',
                  mb: 3,
                  fontFamily: 'Rubik'
                }}
              >
                Profile Updated Successfully!
              </Typography>

              {/* Message */}
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#616161',
                  mb: rewardedCoins ? 2 : 4,
                  fontFamily: 'Rubik',
                  lineHeight: 1.5
                }}
              >
                {successMessage || 'Your profile has been updated successfully!'}
              </Typography>

              {rewardedCoins && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 1,
                  mb: 4,
                  backgroundColor: 'rgba(250, 194, 0, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                }}>
                  <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center' }}>
                    <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography sx={{ color: '#FAC200', fontWeight: 700, fontSize: '16px' }}>
                    +{rewardedCoins} Coins Earned!
                  </Typography>
                </Box>
              )}

              {/* Close Button */}
              <Button
                onClick={handleSuccessClose}
                sx={{
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: 3,
                  py: 1.5,
                  px: 4,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  fontFamily: 'Rubik',
                  minWidth: { xs: '120px', sm: '140px', md: '160px' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#45A049',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Tab Bar */}
      <TabBar />
    </div>
  );
}
