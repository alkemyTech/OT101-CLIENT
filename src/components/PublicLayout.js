import Footer from './Footer';
import Header from './Header';
import { LinearProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/organization/organizationSlice';
import { useEffect } from 'react';

export default function PublicLayout({ routes }) {
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

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
      { organization.isFetching && 
        <LinearProgress />
      }
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {<Outlet />}
      </Container>
      <Footer routes={routes} />
    </Box>
  );
}
