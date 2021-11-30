import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Footer = ({
  logo = '',
  links = [{ name: 'home', url: '/' }, { name: 'about us', url: 'about' }, { name: 'contact', url: 'contact' }],
  socials = { mail: 'mail@mail.com', facebook: 'http://facebook.com', instagram: 'http://instagram.com', phone: '+5491161141500' }
}) => {

  let navigate = useNavigate();

  const handleMenuClick = (page) => {
    navigate(page);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', padding: 1 }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={logo}
                alt="Logotipo Somos Más"
                onClick={() => handleMenuClick('/')}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {
                links.map((link, index) => (
                  <MenuItem onClick={() => handleMenuClick(link.url)} key={index}>{link.name}</MenuItem>
                ))
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <MenuItem>
                <a href={`mailto:${socials.mail}`}>
                  <MailOutlineIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
              <MenuItem>
                <a href={socials.facebook}>
                  <FacebookIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
              <MenuItem>
                <a href={socials.instagram}>
                  <InstagramIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
              <MenuItem>
                <a href={`tel:${socials.phone}`}>
                  <LocalPhoneIcon sx={{ margin: 1, color: 'white' }} />
                </a>
              </MenuItem>
            </Box>
          </Grid>
        </Grid>
      </Toolbar >
    </AppBar >
  );
};

export default Footer;