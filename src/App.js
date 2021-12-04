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
import useAuth from './hooks/useAuth';

function App() {
  const { isLoading, isTokenVerified } = useAuth();
  
  return (
    <BrowserRouter>
      {!isTokenVerified && isLoading ? (
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
          {/* returns the Erorr404 component in case the path does't exist */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
