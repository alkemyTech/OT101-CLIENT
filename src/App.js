import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import FadeIn from './components/FadeIn';
//import RouteProtection from './components/RouteProtection';
import { publicRoutes, backofficeRoutes } from './routes';
import PublicLayout from './components/PublicLayout';
import Backoffice from './pages/Backoffice';


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicLayout routes={publicRoutes} />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={<FadeIn>{element}</FadeIn>} />
          ))}
        </Route>
        { /* Code to use when login process is functional
        <Route
          path="/backoffice"
          element={
            <RouteProtection roles={['user', 'admin']}>
              <FadeIn><Backoffice routes={backofficeRoutes} /></FadeIn>
            </RouteProtection>
          }
        >
          {backofficeRoutes.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={<RouteProtection roles={roles}><FadeIn>{element}</FadeIn></RouteProtection>}
            />
          ))}
        </Route>
        */ }
        <Route path="/backoffice" element={<Backoffice routes={backofficeRoutes} />}>
          {backofficeRoutes.map(({ path, element, roles }) => (
            <Route key={path} path={path} element={<FadeIn>{element}</FadeIn>} />
          ))}
        </Route>
      </Routes>
    </AnimatePresence>
  );

}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App
