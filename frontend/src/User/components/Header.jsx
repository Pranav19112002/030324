import React, { useState } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography color={'green'} variant="h6" component="div" sx={{ flexGrow: 1 , my: 2}}>
        <HealingIcon />
        Scanning Centre
      </Typography>
      <ul className="mobile-navigation">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/menu'}>Menu</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        <li>
          <Link to={'/contact'}>Contact</Link>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component="nav" sx={{ bgcolor: 'white' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: 'none' },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography color={'green'} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <HealingIcon />
              Scanning Centre
            </Typography>
            <Divider />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <ul className="navigation-menu">
                <li>
                  <Link to={'/'}>Home</Link>
                </li>
                <li>
                  <Link to={'/scans'}>Scans</Link>
                </li>
                <li>
                  <Link to={'/about'}>About</Link>
                </li>
                <li>
                  <Link to={'/contact'}>Contact</Link>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer variant="temporary" 
          open={mobileOpen} 
          onClose={handleDrawerToggle} 
          sx={{ display: { xs: 'block', sm: 'none' },
          "& .MuiDrawer-paper":{ boxSizing :"border-box",
           width: "240px", }, }}>
            {drawer}
          </Drawer>
        </Box>
        <Box>
        <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
