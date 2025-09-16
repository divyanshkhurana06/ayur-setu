import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import DashboardHome from './pages/DashboardHome';
import Dashboard from './pages/Dashboard';
import QRScanner from './pages/QRScanner';
import BatchTracking from './pages/BatchTracking';
import SupplyChainFlow from './pages/SupplyChainFlow';
import QualityAnalytics from './pages/QualityAnalytics';
import ProvenanceDisplay from './pages/ProvenanceDisplay';

import 'reactflow/dist/style.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
    },
    secondary: {
      main: '#66BB6A',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const isAuthenticated = () => {
    const authData = localStorage.getItem('ayurSetuAuth');
    if (!authData) return false;
    
    try {
      const parsed = JSON.parse(authData);
      return parsed.isAuthenticated === true;
    } catch (error) {
      return false;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReactFlowProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/app/*" element={
              <ProtectedRoute>
                <div className="app">
                  <Header />
                  <Sidebar />
                  
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/home" element={<DashboardHome />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/qr-scanner" element={<QRScanner />} />
                      <Route path="/batch-tracking" element={<BatchTracking />} />
                      <Route path="/supply-chain" element={<SupplyChainFlow />} />
                      <Route path="/quality-analytics" element={<QualityAnalytics />} />
                      <Route path="/provenance/:batchId" element={<ProvenanceDisplay />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ReactFlowProvider>
    </ThemeProvider>
  );
}

export default App;
