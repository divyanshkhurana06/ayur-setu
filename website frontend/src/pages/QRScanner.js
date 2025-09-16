import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { QrCodeScanner, Search } from '@mui/icons-material';

function QRScanner() {
  const [scannedData, setScannedData] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError('');
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Simulate QR code detection after 3 seconds
      setTimeout(() => {
        const mockBatchId = 'ABC123456';
        setScannedData(mockBatchId);
        setSuccess(`QR Code scanned successfully! Batch ID: ${mockBatchId}`);
        setIsScanning(false);
        
        // Stop camera
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        // Navigate to provenance page after 2 seconds
        setTimeout(() => {
          navigate(`/provenance/${mockBatchId}`);
        }, 2000);
      }, 3000);
      
    } catch (err) {
      setError('Camera access denied or not available');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleManualSearch = () => {
    if (manualInput.trim()) {
      setSuccess(`Searching for batch: ${manualInput}`);
      setTimeout(() => {
        navigate(`/provenance/${manualInput}`);
      }, 1000);
    } else {
      setError('Please enter a valid batch ID');
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup camera on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold', textAlign: 'center' }}>
        QR Code Scanner
      </Typography>
      
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
        Scan the QR code on your herb product to view its complete traceability information
      </Typography>

      {/* QR Scanner Section */}
      <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
          📱 Camera Scanner
        </Typography>
        
        <Box sx={{ 
          width: '100%', 
          height: '300px', 
          border: '2px dashed #2E7D32',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          backgroundColor: '#f9f9f9',
          position: 'relative'
        }}>
          {isScanning ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '6px'
                }}
              />
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '10px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <CircularProgress size={20} sx={{ color: 'white' }} />
                <Typography variant="body2">Scanning for QR code...</Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <QrCodeScanner sx={{ fontSize: 60, color: '#2E7D32', mb: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Click "Start Scanning" to use your camera
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {!isScanning ? (
            <Button
              variant="contained"
              onClick={startScanning}
              startIcon={<QrCodeScanner />}
              sx={{ backgroundColor: '#2E7D32' }}
            >
              Start Scanning
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={stopScanning}
              sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
            >
              Stop Scanning
            </Button>
          )}
        </Box>
      </Paper>

      {/* Manual Input Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
          ⌨️ Manual Entry
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Don't have a camera? Enter the batch ID manually
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Enter Batch ID"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="e.g., ABC123456"
            variant="outlined"
            sx={{
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
            variant="contained"
            onClick={handleManualSearch}
            startIcon={<Search />}
            sx={{ backgroundColor: '#2E7D32', minWidth: '120px' }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {/* Sample QR Codes */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
          🧪 Try Sample Batches
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Test the system with these sample batch IDs
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['ABC123456', 'DEF789012', 'GHI345678'].map((batchId) => (
            <Button
              key={batchId}
              variant="outlined"
              size="small"
              onClick={() => navigate(`/provenance/${batchId}`)}
              sx={{ 
                borderColor: '#2E7D32', 
                color: '#2E7D32',
                '&:hover': {
                  backgroundColor: '#e8f5e8',
                  borderColor: '#2E7D32',
                }
              }}
            >
              {batchId}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Status Messages */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mt: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
    </div>
  );
}

export default QRScanner;
