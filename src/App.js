import React from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import ActivitiesList from './components/ActivitiesList';

function App() {
  return (
    <Router>
      <div >
        <h1>Aliveline</h1>
        <h3>The accountant's tacklebox</h3>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </nav>
      </div>
      <Switch>
        <ActivitiesList />
      </Switch>
    </Router>
  );
}

export default App;
