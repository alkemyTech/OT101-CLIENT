import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useSelector } from 'react-redux';


const Footer = ({ routes }) => {
  const organization = useSelector((state) => state.organization);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', padding: 1, bgcolor: '#AFAFAF' }}>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/">
                <img src={organization?.data?.image} alt={`Logotipo ${organization?.data?.name}`} />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {routes.map(
                ({ name, path, protect }) =>
                  !protect &&
                  name && (
                    <MenuItem key={path} to={path} component={Link} sx={{ fontFamily: 'Signika' }}>
                      {name}
                    </MenuItem>
                  )
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <MenuItem key={organization?.data?.facebook}>
                <a href={organization?.data?.facebook}>
                  <FacebookIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
              <MenuItem key={organization?.data?.instagram}>
                <a href={organization?.data?.instagram}>
                  <InstagramIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
              <MenuItem key={organization?.data?.linkedin}>
                <a href={organization?.data?.linkedin}>
                  <LinkedInIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
              <MenuItem key={organization?.data?.phone}>
                <a href={organization?.data?.phone}>
                  <LocalPhoneIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
