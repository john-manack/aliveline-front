import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './components/Home'
import ActivitiesList from './components/ActivitiesList';
import ActivityDetails from './components/ActivityDetails';


function App() {

  return (
    <Router>
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
          <ActivitiesList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
