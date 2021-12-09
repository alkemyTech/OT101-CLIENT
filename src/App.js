import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import About from './pages/About';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import Contribute from './pages/Contribute';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Loading from './components/Loading';
import News from './pages/News';
import Testimonials from './pages/Testimonials';
import BackofficeContacts from './pages/BackofficeContacts';
import { useSelector } from 'react-redux';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';

const routes = [
  { name: 'Inicio', path: '/', element: <Home /> },
  { name: 'Sobre nosotros', path: '/about', element: <About /> },
  { name: 'Actividades', path: '/activities', element: <Activities /> },
  { name: 'Novedades', path: '/news', element: <News /> },
  { name: 'Testimonios', path: '/testimonials', element: <Testimonials /> },
  { name: 'Contacto', path: '/contact', element: <Contact /> },
  { name: 'Contribuir', path: '/contribute', element: <Contribute /> },
  { path: '/backoffice/contacts', element: <Contact />, hidden: true },
  { path: '/register', element: <Register />, hidden: true  },
  { path: '*', element: <Error404 />, hidden: true },
];

function App() {
  const { isTokenVerified } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {!isTokenVerified ? (
        <Loading />
      ) : (
        <>
          <Header routes={routes} />

          <Routes>
            {routes.map(({ path, element }) => (
              <Route {...{ path, element }} />
            ))}
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
