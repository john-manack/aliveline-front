import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './components/Home'
import ActivitiesList from './components/ActivitiesList';
import { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import './App.css';

function App() {
  const [reload, setReload] = useState(false);

  const handleReload = (status) => {
      setReload(status);
  }

  return (
    
    <Router>
      <div className="App">
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/activities'>Activities</Link>
            <Link to='/about'>About</Link>
          </nav>
        </div>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/activities'>
            <ActivitiesList reload={reload} handleReload={handleReload}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
