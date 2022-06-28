// Libraries/Frameworks
import React from 'react';
import { Route } from 'react-router-dom';
// Our code
import Welcome from '../components/Welcome/Welcome.jsx';
import Home from '../components/Home/Home.jsx';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Welcome />} />
      <Route path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
