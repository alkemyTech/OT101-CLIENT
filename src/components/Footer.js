import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useSelector } from 'react-redux';

const iconsType = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  phone: LocalPhoneIcon,
  email: MailOutlineIcon,
};
//DELETE THIS WHEN IMPLEMENT SOCIALS TO /organizations/1/public endpoint
const tempSocials = [
  { url: 'mailto:mail@mail.com', icon: 'email' },
  { url: 'http://facebook.com', icon: 'facebook' },
  { url: 'http://instagram.com', icon: 'instagram' },
  { url: 'tel:+5491161141500', icon: 'phone' },
];

const Footer = ({ routes }) => {
  const organization = useSelector((state) => state.organization);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', padding: 1 }}>
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
                <img src={organization?.logo} alt="Logotipo Somos Más" />
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
                    <MenuItem key={path} to={path} component={Link}>
                      {name}
                    </MenuItem>
                  )
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* Replace tempSocials with organization.socials */}
              {tempSocials.map((social) => {
                const Icon = iconsType[social.icon];
                return (
                  <MenuItem>
                    <a href={social.url}>
                      <Icon sx={{ margin: 1, color: 'white' }} />
                    </a>
                  </MenuItem>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
