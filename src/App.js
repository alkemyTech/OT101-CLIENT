<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
=======
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
>>>>>>> 57fdb4c5ee810a8979c70668343323efd3c6401c
import './App.css';
import About from './components/About';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Contribute from './components/Contribute';
import Error404 from './components/Error404';
import Home from './components/Home';
import News from './components/News';
import Testimonials from './components/Testimonials';

import About from './components/About';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Contribute from './components/Contribute';
import Error404 from './components/Error404';
import Home from './components/Home';
import Loading from './components/Loading';
import News from './components/News';
import Testimonials from './components/Testimonials';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200)
  })
  return (
    <BrowserRouter>
    {
      isLoading===true?
      <Loading />
      :
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/activities' element={<Activities/>} />
        <Route path='/news' element={<News/>} />
        <Route path='/testimonials' element={<Testimonials/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/contribute' element={<Contribute/>} />
        {/* returns the Erorr404 component in case the path does't exist */}
        <Route path='*' element={<Error404/>} />
      </Routes>
    }
    </BrowserRouter>
  );
}

export default App;
