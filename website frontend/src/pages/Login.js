import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Phone, Security, Login as LoginIcon } from '@mui/icons-material';
import otpService from '../services/otpService';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await otpService.resendOTP(phoneNumber);
      
      if (result.success) {
        setSuccess('OTP resent successfully!');
        startResendTimer();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await otpService.sendOTP(phoneNumber);
      
      if (result.success) {
        setOtpSent(true);
        setSuccess(result.message);
        startResendTimer();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to send OTP. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await otpService.verifyOTP(phoneNumber, otp);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          // Store login state
          localStorage.setItem('ayurSetuAuth', JSON.stringify({
            phoneNumber: phoneNumber,
            loginTime: new Date().toISOString(),
            isAuthenticated: true
          }));
          navigate('/app/home');
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 50%, #A5D6A7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          borderRadius: '16px',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img 
              src="/ayur setu.jpeg" 
              alt="Ayur Setu Logo" 
              style={{ height: '80px', marginBottom: '16px' }}
            />
            <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 'bold', mb: 1 }}>
              Ayur Setu
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Blockchain-based Herb Traceability
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            {!otpSent ? (
              <>
                <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
                  Login with Mobile Number
                </Typography>
                
                <TextField
                  fullWidth
                  label="Mobile Number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit mobile number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: '#2E7D32' }} />
                        <Typography sx={{ ml: 1, color: '#666' }}>+91</Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#2E7D32',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32',
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSendOTP}
                  disabled={isLoading || phoneNumber.length !== 10}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <Phone />}
                  sx={{
                    py: 1.5,
                    backgroundColor: '#2E7D32',
                    '&:hover': {
                      backgroundColor: '#1B5E20',
                    },
                    '&:disabled': {
                      backgroundColor: '#C8E6C9',
                    },
                  }}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                  Enter OTP
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: '#666' }}>
                  OTP sent to +91 {phoneNumber}
                </Typography>

                <TextField
                  fullWidth
                  label="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit OTP"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Security sx={{ color: '#2E7D32' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#2E7D32',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32',
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
                  sx={{
                    py: 1.5,
                    backgroundColor: '#2E7D32',
                    '&:hover': {
                      backgroundColor: '#1B5E20',
                    },
                    '&:disabled': {
                      backgroundColor: '#C8E6C9',
                    },
                  }}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </Button>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    fullWidth
                    variant="text"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isLoading}
                    sx={{
                      color: '#2E7D32',
                    }}
                  >
                    {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                      setError('');
                      setSuccess('');
                      setResendTimer(0);
                    }}
                    sx={{
                      color: '#666',
                    }}
                  >
                    Change Number
                  </Button>
                </Box>
              </>
            )}
          </Box>

          {/* Status Messages */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          {/* Instructions */}
          <Paper sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: '#ff9800' }}>
              🎭 Demo Mode Active:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Enter any 10-digit mobile number
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Use OTP: <strong>123456</strong> to login
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#666' }}>
              To enable real SMS, add valid Twilio credentials to .env file
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
