import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  QrCodeScanner,
  Inventory,
  AccountTree,
  Analytics,
  Home,
} from '@mui/icons-material';

const drawerWidth = 250;

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/app/home' },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/app/dashboard' },
  { text: 'QR Scanner', icon: <QrCodeScanner />, path: '/app/qr-scanner' },
  { text: 'Batch Tracking', icon: <Inventory />, path: '/app/batch-tracking' },
  { text: 'Supply Chain', icon: <AccountTree />, path: '/app/supply-chain' },
  { text: 'Quality Analytics', icon: <Analytics />, path: '/app/quality-analytics' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fafafa',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e8f5e8',
                  '&:hover': {
                    backgroundColor: '#e8f5e8',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#2E7D32' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ color: location.pathname === item.path ? '#2E7D32' : 'inherit' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
