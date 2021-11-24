import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
