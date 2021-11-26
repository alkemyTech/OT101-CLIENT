import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Header = ({ logo = '', links = [{ name: 'home', url: '/' }] }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  let navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (page) => {
    navigate(page);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', padding: 1 }}>
        <img
          src={logo}
          alt="Logotipo Somos Más"
          onClick={() => handleMenuClick('/')}
        />
        <Box sx={{ display: 'flex' }}>
          {
            isMobile ?
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {
                    links.map((link, index) => (
                      <MenuItem onClick={() => handleMenuClick(link.url)} key={index}>{link.name}</MenuItem>
                    ))
                  }
                </Menu>
              </>
              :
              links.map((link, index) => (
                <MenuItem onClick={() => handleMenuClick(link.url)} key={index}>{link.name}</MenuItem>
              ))
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;