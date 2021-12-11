import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import RouteProtection from './components/RouteProtection';
import routes from './routes';

function App() {
  const { isTokenVerified } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {!isTokenVerified ? (
        <Loading />
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
