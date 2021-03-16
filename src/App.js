import React from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import ActivitiesList from './components/ActivitiesList';

function App() {
  return (
    <Router>
      <div >
        <h1>Aliveline</h1>
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
