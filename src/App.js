import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from "react-loader-spinner";
import './App.css';

import About from './components/About';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Contribute from './components/Contribute';
import Error404 from './components/Error404';
import Home from './components/Home';
import News from './components/News';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <BrowserRouter>
      <Loader 
        type="TailSpin"
        color="#DB5752"
        height={100}
        width={100}
        timeout={2000} />
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
    </BrowserRouter>
  );
}

export default App;
