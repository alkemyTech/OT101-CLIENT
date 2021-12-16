import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import RouteProtection from './components/RouteProtection';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { publicRoutes, backofficeRoutes } from './routes';
import PublicLayout from './components/PublicLayout';
import Backoffice from './pages/Backoffice';

function App() {
	const { isTokenVerified } = useSelector(state => state.user)
  
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
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          { /* Code to use when login process is functional
          <Route
            path="/backoffice"
            element={
              <RouteProtection roles={['user', 'admin']}>
                <Backoffice routes={backofficeRoutes} />
              </RouteProtection>
            }
          >
            {backofficeRoutes.map(({ path, element, roles }) => (
              <Route
                key={path}
                path={path}
                element={<RouteProtection roles={roles}>{element}</RouteProtection>}
              />
            ))}
          </Route>
          */ }
          <Route path="/backoffice" element={<Backoffice routes={backofficeRoutes} />}>
            {backofficeRoutes.map(({ path, element, roles }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App
