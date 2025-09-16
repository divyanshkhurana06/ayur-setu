import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Fade,
  Slide,
  Zoom,
  IconButton,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip
} from '@mui/material';
import {
  Security,
  Visibility,
  Speed,
  Nature,
  VerifiedUser,
  TrendingUp,
  QrCode,
  LocalShipping,
  Analytics,
  Dashboard as DashboardIcon,
  Inventory,
  AccountTree,
  ArrowForward,
  Timeline,
  Assessment,
  Scanner,
  TrackChanges,
  Insights
} from '@mui/icons-material';

function DashboardHome() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getUserInfo = () => {
    const authData = localStorage.getItem('ayurSetuAuth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        return parsed.phoneNumber || 'User';
      } catch (error) {
        return 'User';
      }
    }
    return 'User';
  };

  const quickActions = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Analytics Dashboard',
      description: 'View comprehensive analytics and insights about your herb supply chain',
      action: 'View Dashboard',
      path: '/app/dashboard'
    },
    {
      icon: <Scanner sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Scan QR Codes',
      description: 'Quickly scan QR codes to track herb batches and verify authenticity',
      action: 'Open Scanner',
      path: '/app/qr-scanner'
    },
    {
      icon: <TrackChanges sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Track Batches',
      description: 'Monitor and track herb batches throughout the supply chain',
      action: 'Track Batches',
      path: '/app/batch-tracking'
    },
    {
      icon: <AccountTree sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Supply Chain Flow',
      description: 'Visualize and analyze the complete supply chain flow',
      action: 'View Flow',
      path: '/app/supply-chain'
    },
    {
      icon: <Assessment sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Quality Analytics',
      description: 'Analyze quality metrics and trends across your operations',
      action: 'View Analytics',
      path: '/app/quality-analytics'
    }
  ];

  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Blockchain Security',
      description: 'Your data is secured with immutable blockchain technology',
      stats: '100% Secure'
    },
    {
      icon: <Visibility sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Complete Traceability',
      description: 'Track every step from farm to pharmacy',
      stats: 'End-to-End'
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Quality Verified',
      description: 'All herbs are quality certified and authenticated',
      stats: 'Certified'
    },
    {
      icon: <Nature sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Sustainable Practices',
      description: 'Promoting eco-friendly herb cultivation',
      stats: 'Eco-Friendly'
    }
  ];

  const recentActivity = [
    { action: 'New batch scanned', time: '2 hours ago', type: 'scan' },
    { action: 'Quality report generated', time: '4 hours ago', type: 'report' },
    { action: 'Supply chain updated', time: '6 hours ago', type: 'update' },
    { action: 'Analytics refreshed', time: '8 hours ago', type: 'analytics' }
  ];

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflowX: 'hidden',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: '#2E7D32', 
                  mr: 3,
                  fontSize: '1.5rem'
                }}
              >
                {getUserInfo().charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}
                >
                  Welcome to Ayur Setu
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#666',
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                  Hello {getUserInfo()}, manage your herbal supply chain with confidence
                </Typography>
              </Box>
            </Box>
            
            <Paper sx={{ p: 3, mb: 4, backgroundColor: 'rgba(46, 125, 50, 0.05)' }}>
              <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'bold', mb: 2 }}>
                🌿 Your Ayur Setu Portal
              </Typography>
              <Typography variant="body1" sx={{ color: '#424242', lineHeight: 1.6 }}>
                Access all your blockchain-powered herbal traceability tools in one place. 
                Track, verify, and analyze your supply chain with complete transparency and security.
              </Typography>
            </Paper>
          </Box>
        </Fade>

        {/* Quick Actions */}
        <Fade in={true} timeout={1200}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#1B5E20',
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Quick Actions
            </Typography>
            
            <Grid container spacing={3}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Zoom in={true} timeout={800 + index * 200}>
                    <Card
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 30px rgba(46, 125, 50, 0.2)'
                        }
                      }}
                      onClick={() => navigate(action.path)}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {action.icon}
                          <ArrowForward sx={{ ml: 'auto', color: '#2E7D32' }} />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            color: '#1B5E20',
                            mb: 1
                          }}
                        >
                          {action.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#666',
                            lineHeight: 1.5,
                            mb: 2
                          }}
                        >
                          {action.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: '#2E7D32',
                            color: '#2E7D32',
                            '&:hover': {
                              borderColor: '#1B5E20',
                              color: '#1B5E20',
                              backgroundColor: 'rgba(46, 125, 50, 0.05)'
                            }
                          }}
                        >
                          {action.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Features Overview */}
        <Slide direction="up" in={true} timeout={1400}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#1B5E20',
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Platform Features
            </Typography>
            
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 3,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 25px rgba(46, 125, 50, 0.15)'
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#1B5E20',
                        mb: 1
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        lineHeight: 1.5,
                        mb: 2
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Chip 
                      label={feature.stats} 
                      sx={{ 
                        backgroundColor: 'rgba(46, 125, 50, 0.1)', 
                        color: '#2E7D32',
                        fontWeight: 'bold'
                      }} 
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        {/* Recent Activity */}
        <Fade in={true} timeout={1600}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#1B5E20',
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Recent Activity
            </Typography>
            
            <Paper elevation={2} sx={{ borderRadius: 3 }}>
              {recentActivity.map((activity, index) => (
                <Box key={index}>
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        mr: 3,
                        flexShrink: 0
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
                        {activity.action}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {activity.time}
                      </Typography>
                    </Box>
                    <Insights sx={{ color: '#2E7D32' }} />
                  </Box>
                  {index < recentActivity.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default DashboardHome;
