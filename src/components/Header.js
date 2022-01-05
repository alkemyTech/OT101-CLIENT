import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';


const Header = ({ routes = [{ name: 'home', path: '/' }] }) => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const organization = useSelector((state) => state.organization);
  const user = useSelector((state) => state.user);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{bgcolor: '#E5DCB7'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <img src={organization?.data?.image} width='130px' height='110px' alt="Logotipo Somos Más" />
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
            {
              user.isLogged === true?
              <Stack direction="row" spacing={2}>
                <UserMenu />
              </Stack>:
              <Button component={Link} to='/login'>
                <AccountCircleIcon 
                  sx={{ color: '#898989', width: '50px' }}
                />
              </Button> 
              }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
