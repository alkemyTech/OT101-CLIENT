import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { useSelector } from 'react-redux';
import RouteProtection from './components/RouteProtection';
import routes from './routes';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
function App() {
  const { isTokenVerified } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {!isTokenVerified ? (
        <Box sx={{ height: '100vh', display: 'flex' }}>
          <CircularProgress sx={{ mx: 'auto', my: 'auto', display: 'block'}} size={64} />
        </Box>
      ) : (
        <Routes>
          {routes.map(({ path, element, protect, roles }) => (
            <Route
              path={path}
              element={protect ? <RouteProtection roles={roles}>{element}</RouteProtection> : element}
            />
          ))}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;