import React from 'react';
import { AppBar, Toolbar, Button, Box,Typography } from '@mui/material';
import logo from '../assets/images/logo.png'; // Importing logo from asset


// import { Image } from '@mui/icons-material'; // Importing Image component

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ margin: 0, padding: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ padding: '0 !important', margin: 0, minHeight: 'auto !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: 0, margin: 0 }}>
          <img src={logo.src} alt="Logo" style={{ width: '168px', height: '42px' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
          <Button variant="outlined" sx={{ width: '101', height: '42px',margin: 0, padding: '0  20%', color: 'inherit', borderColor: 'currentColor',borderRadius:'5px', fontWeight:'bold' }}>
          <Typography variant="h7" >Login</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
