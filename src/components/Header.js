import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Container } from '@mui/material';
import logoSomosMas from '../assets/LOGO-SOMOS MAS.png'

const Header = ({ logo = logoSomosMas, routes = [{ name: 'home', path: '/' }] }) => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{bgcolor: '#E5DCB7'}}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <img src={logo} width='130px' height='110px' alt="Logotipo Somos Más" />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.map(
                ({ name, path, protect }) =>
                  !protect &&
                  name && (
                    <MenuItem
                      key={name}
                      onClick={handleCloseNavMenu}
                      to={path}
                      component={Link}
                      sx={{ color: location.pathname === path ? 'black' : '#474747', fontFamily: 'Signika'}}
                    >
                      {name}
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {routes.map(
              ({ name, path, protect }) =>
                !protect &&
                name && (
                  <Button
                    key={name}
                    sx={{ color: location.pathname === path ? 'black' : '#898989', fontFamily: 'Signika' }}
                    to={path}
                    LinkComponent={Link}
                  >
                    {name}
                  </Button>
                )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
