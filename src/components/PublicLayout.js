import Footer from './Footer';
import Header from './Header';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from "react-router-dom";

export default function PublicLayout({ children, routes }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <Header routes={routes} />
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{<Outlet/>}</Container>
      <Footer />
    </Box>
  );
}
