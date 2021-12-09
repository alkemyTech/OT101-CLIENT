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
import BackofficeNews from './pages/BackofficeNews';
import { useSelector } from 'react-redux';
import Register from './pages/Register';

function App() {
  const { isTokenVerified } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {!isTokenVerified ? (
        <Loading />
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
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
