import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Error404 from './components/Error404';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* returns the Erorr404 component in case the path does't exist */}
        <Route path='*' element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
