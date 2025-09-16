import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Menu as MenuComponent, MenuItem } from '@mui/material';
import { Notifications, AccountCircle, Menu, Logout } from '@mui/icons-material';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('ayurSetuAuth');
    handleMenuClose();
    navigate('/');
  };

  const getUserInfo = () => {
    const authData = localStorage.getItem('ayurSetuAuth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        return parsed.phoneNumber ? `+91 ${parsed.phoneNumber}` : 'User';
      } catch (error) {
        return 'User';
      }
    }
    return 'User';
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#2E7D32'
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src="/ayur setu.jpeg" 
            alt="Ayur Setu Logo" 
            style={{ height: '40px', marginRight: '12px' }}
          />
          <Typography variant="h6" component="div">
            Ayur Setu Portal
          </Typography>
        </Box>
        
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        
        <MenuComponent
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem disabled>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {getUserInfo()}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </MenuComponent>
      </Toolbar>
    </AppBar>
  );
}

export default Header;