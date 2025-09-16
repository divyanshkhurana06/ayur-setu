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
  useMediaQuery
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
  Phone,
  KeyboardArrowDown,
  PlayArrow
} from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Blockchain Security',
      description: 'Immutable records ensure complete transparency and trust in the herb supply chain'
    },
    {
      icon: <Visibility sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Complete Traceability',
      description: 'Track every herb from farm to pharmacy with detailed provenance information'
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Quality Assurance',
      description: 'Verified quality certifications and lab reports for authentic Ayurvedic herbs'
    },
    {
      icon: <QrCode sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'QR Code Scanning',
      description: 'Instant access to herb information through simple QR code scanning'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Smart Analytics',
      description: 'Real-time insights and analytics for supply chain optimization'
    },
    {
      icon: <Nature sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Sustainable Practices',
      description: 'Promoting eco-friendly and sustainable herb cultivation practices'
    }
  ];

  const benefits = [
    {
      title: 'For Consumers',
      points: ['Verify herb authenticity', 'Access complete history', 'Ensure quality standards', 'Build trust in products']
    },
    {
      title: 'For Suppliers',
      points: ['Streamline operations', 'Reduce fraud', 'Improve efficiency', 'Build brand reputation']
    },
    {
      title: 'For Regulators',
      points: ['Easy compliance tracking', 'Real-time monitoring', 'Automated reporting', 'Enhanced oversight']
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: `linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234CAF50" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <img 
                      src="/ayur setu.jpeg" 
                      alt="Ayur Setu Logo" 
                      style={{ 
                        height: '80px', 
                        marginRight: '16px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(46, 125, 50, 0.3)'
                      }} 
                    />
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                      }}
                    >
                      Ayur Setu
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 3,
                      color: '#1B5E20',
                      fontWeight: 500,
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    Blockchain-Powered Botanical Traceability
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 4,
                      color: '#424242',
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                  >
                    Revolutionizing Ayurvedic herb supply chains with transparent, 
                    secure, and verifiable tracking from farm to pharmacy.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGetStarted}
                      startIcon={<PlayArrow />}
                      sx={{
                        background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 25px rgba(46, 125, 50, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1B5E20, #2E7D32)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(46, 125, 50, 0.4)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Get Started
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => scrollToSection('features')}
                      sx={{
                        borderColor: '#2E7D32',
                        color: '#2E7D32',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: '#1B5E20',
                          color: '#1B5E20',
                          backgroundColor: 'rgba(46, 125, 50, 0.05)'
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} timeout={1200}>
                <Box
                  sx={{
                    position: 'relative',
                    transform: `translateY(${scrollY * 0.1}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(46, 125, 50, 0.1)'
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                        🌿 Herb Journey Visualization
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      {['🌱 Farm', '🏭 Processing', '🔬 Lab', '📦 Packaging', '🚚 Distribution', '🏪 Retail'].map((step, index) => (
                        <Zoom key={step} in={true} timeout={800 + index * 200}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: index % 2 === 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                              minWidth: '80px'
                            }}
                          >
                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                              {step}
                            </Typography>
                          </Box>
                        </Zoom>
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
        
        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer'
          }}
          onClick={() => scrollToSection('features')}
        >
          <IconButton
            sx={{
              color: '#2E7D32',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)'
                },
                '40%': {
                  transform: 'translateY(-10px)'
                },
                '60%': {
                  transform: 'translateY(-5px)'
                }
              }
            }}
          >
            <KeyboardArrowDown sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 8, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#1B5E20',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Why Choose Ayur Setu?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#666',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Experience the future of herbal supply chain management with cutting-edge blockchain technology
              </Typography>
              <Divider sx={{ mt: 3, mb: 4, width: '100px', mx: 'auto', borderWidth: 2, borderColor: '#4CAF50' }} />
            </Box>
          </Fade>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={true} timeout={800 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 30px rgba(46, 125, 50, 0.2)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: '#1B5E20',
                          mb: 2
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.6
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#1B5E20',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Benefits for Everyone
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#666',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Ayur Setu brings value to every stakeholder in the herbal supply chain
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide direction="up" in={true} timeout={800 + index * 300}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                      border: '1px solid rgba(46, 125, 50, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 30px rgba(46, 125, 50, 0.15)'
                      }
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        color: '#2E7D32',
                        mb: 3,
                        textAlign: 'center'
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Box sx={{ pl: 0 }}>
                      {benefit.points.map((point, pointIndex) => (
                        <Box key={pointIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: '#4CAF50',
                              mr: 2,
                              flexShrink: 0
                            }}
                          />
                          <Typography variant="body1" sx={{ color: '#424242' }}>
                            {point}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Ready to Transform Your Supply Chain?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                Join the revolution in herbal traceability. Register now and experience 
                the power of blockchain-based transparency.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                startIcon={<Phone />}
                sx={{
                  backgroundColor: 'white',
                  color: '#2E7D32',
                  px: 6,
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Register with Mobile Number
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
