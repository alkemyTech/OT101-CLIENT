import Footer from './Footer';
import Header from './Header';
import routes from '../routes';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

export default function PublicLayout({ children }) {
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
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 10 }}>{children}</Container>
      <Footer />
    </Box>
  );
}
