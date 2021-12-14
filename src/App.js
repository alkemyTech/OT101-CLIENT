import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import Contribute from './pages/Contribute';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import News from './pages/News';
import Testimonials from './pages/Testimonials';
import BackofficeContacts from './pages/BackofficeContacts';
import BackofficeNews from './pages/BackofficeNews';
import { useSelector } from 'react-redux';
//import RouteProtection from './components/RouteProtection';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { publicRoutes, backofficeRoutes } from './routes';
import PublicLayout from './components/PublicLayout';
import Backoffice from './pages/Backoffice';

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
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/news" element={<News />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/backoffice/contacts" element={<BackofficeContacts />} />
          <Route path="/backoffice/news" element={<BackofficeNews />} />
          {/* returns the Erorr404 component in case the path does't exist */}
          <Route path="*" element={<Error404 />} />
          <Route path="/register" element={<Register />} />
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

export default App;
