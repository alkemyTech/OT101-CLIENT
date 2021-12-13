import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import RouteProtection from './components/RouteProtection';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { publicRoutes, backofficeRoutes } from './routes';
import PublicLayout from './components/PublicLayout';

function App() {
  const { isTokenVerified } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {!isTokenVerified ? (
        <Box sx={{ height: '100vh', display: 'flex' }}>
          <CircularProgress sx={{ mx: 'auto', my: 'auto', display: 'block' }} size={64} />
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<PublicLayout routes={publicRoutes} />}>
            {publicRoutes.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))}
          </Route>
          <Route path="/backoffice">
            {backofficeRoutes.map(({ path, element, roles }) => (
              <Route path={path} element={<RouteProtection roles={roles}>{element}</RouteProtection>} />
            ))}
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
