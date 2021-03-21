import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './components/Home'
import ActivitiesList from './components/ActivitiesList';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
