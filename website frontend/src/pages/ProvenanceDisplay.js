import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  LocationOn,
  Person,
  Science,
  Factory,
  Store,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';

function ProvenanceDisplay() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [herbData, setHerbData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch herb data
    setTimeout(() => {
      setHerbData({
        batchId: batchId,
        herbName: 'Ashwagandha Root Powder',
        species: 'Withania somnifera',
        status: 'Ready for Consumer',
        qualityScore: 4.8,
        collection: {
          location: 'Rishikesh, Uttarakhand',
          coordinates: '30.0869°N, 78.2676°E',
          collector: {
            name: 'Rajesh Kumar',
            experience: '15 years',
            rating: 4.9,
            avatar: '/api/placeholder/64/64'
          },
          date: '2024-01-15',
          weather: 'Clear, 22°C',
          altitude: '372m'
        },
        processing: {
          facility: 'Green Valley Processing Unit',
          method: 'Sun-dried for 48 hours',
          temperature: '40°C',
          date: '2024-01-20',
          operator: 'Priya Sharma'
        },
        testing: {
          lab: 'Ayush Quality Labs',
          moisture: '12%',
          pesticides: 'None detected',
          heavyMetals: 'Within limits',
          dnaVerified: true,
          date: '2024-01-22',
          certificate: 'AQL-2024-001234'
        },
        manufacturing: {
          facility: 'Himalayan Herbs Pvt Ltd',
          batch: 'HH-ASH-2024-001',
          date: '2024-01-25',
          expiryDate: '2026-01-25',
          packagingDate: '2024-01-26'
        },
        sustainability: {
          organicCertified: true,
          fairTrade: true,
          carbonFootprint: 'Low',
          waterUsage: 'Minimal'
        }
      });
      setLoading(false);
    }, 1000);
  }, [batchId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography>Loading provenance data...</Typography>
      </Box>
    );
  }

  if (!herbData) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Batch not found
        </Typography>
        <Button onClick={() => navigate('/qr-scanner')} sx={{ mt: 2 }}>
          Try Another Batch
        </Button>
      </Box>
    );
  }

  const timelineData = [
    {
      title: 'Collection',
      date: herbData.collection.date,
      icon: <LocationOn />,
      color: '#4CAF50',
      details: `Collected by ${herbData.collection.collector.name} in ${herbData.collection.location}`
    },
    {
      title: 'Processing',
      date: herbData.processing.date,
      icon: <Factory />,
      color: '#2196F3',
      details: `Processed at ${herbData.processing.facility}`
    },
    {
      title: 'Lab Testing',
      date: herbData.testing.date,
      icon: <Science />,
      color: '#FF9800',
      details: `Tested at ${herbData.testing.lab}`
    },
    {
      title: 'Manufacturing',
      date: herbData.manufacturing.date,
      icon: <Store />,
      color: '#9C27B0',
      details: `Manufactured by ${herbData.manufacturing.facility}`
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/qr-scanner')}
        sx={{ mb: 2, color: '#2E7D32' }}
      >
        Back to Scanner
      </Button>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)', color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              🌿 {herbData.herbName}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              {herbData.species} • Batch #{herbData.batchId}
            </Typography>
          </Grid>
          <Grid item sx={{ ml: 'auto' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {herbData.qualityScore}
              </Typography>
              <Typography variant="body2">Quality Score</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2 }}>
          <Chip 
            icon={<CheckCircle />} 
            label={herbData.status} 
            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Collection Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32', display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} />
                Collection Details
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">Location</Typography>
                <Typography variant="body1">{herbData.collection.location}</Typography>
                <Typography variant="body2" color="textSecondary">{herbData.collection.coordinates}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: '#2E7D32' }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {herbData.collection.collector.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {herbData.collection.collector.experience} experience • Rating: {herbData.collection.collector.rating}/5
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Collection Date</Typography>
                  <Typography variant="body1">{new Date(herbData.collection.date).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Weather</Typography>
                  <Typography variant="body1">{herbData.collection.weather}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Lab Test Results */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32', display: 'flex', alignItems: 'center' }}>
                <Science sx={{ mr: 1 }} />
                Lab Test Results
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">Moisture Content</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                      {herbData.testing.moisture} ✅
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">Pesticides</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                      {herbData.testing.pesticides} ✅
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">Heavy Metals</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                      {herbData.testing.heavyMetals} ✅
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">DNA Verification</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                      {herbData.testing.dnaVerified ? 'Verified' : 'Pending'} ✅
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">Certificate ID</Typography>
                <Typography variant="body1">{herbData.testing.certificate}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              📅 Journey Timeline
            </Typography>
            
            <Timeline>
              {timelineData.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    {new Date(item.date).toLocaleDateString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: item.color }}>
                      {item.icon}
                    </TimelineDot>
                    {index < timelineData.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.details}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>

        {/* Sustainability Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              🌱 Sustainability & Certifications
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item>
                <Chip 
                  label="Organic Certified" 
                  color="success" 
                  variant={herbData.sustainability.organicCertified ? "filled" : "outlined"}
                />
              </Grid>
              <Grid item>
                <Chip 
                  label="Fair Trade" 
                  color="primary" 
                  variant={herbData.sustainability.fairTrade ? "filled" : "outlined"}
                />
              </Grid>
              <Grid item>
                <Chip 
                  label={`Carbon Footprint: ${herbData.sustainability.carbonFootprint}`} 
                  color="success" 
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip 
                  label={`Water Usage: ${herbData.sustainability.waterUsage}`} 
                  color="info" 
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProvenanceDisplay;
