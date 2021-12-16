import Footer from './Footer';
import Header from './Header';
import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/organization/organizationSlice';
import { useEffect } from 'react';

export default function PublicLayout({ children, routes }) {
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return organization.isFetching ? (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <CircularProgress
        sx={{ mx: 'auto', my: 'auto', display: 'block' }}
        size={64}
      />
    </Box>
  ) : (
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
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {<Outlet />}
      </Container>
      <Footer routes={routes} />
    </Box>
  );
}
