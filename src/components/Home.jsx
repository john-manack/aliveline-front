import React from 'react';
import './component-styles/Home.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';


const Home = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return(
        <div className="Home">
            <h1>aliveline</h1>
            <h3>the crunchtime manager for accountants</h3>
            {isAuthenticated ? <h4>Welcome Back John!</h4> : <h4>Hmm... it looks like you need to sign in <br/><Link onClick={() => loginWithRedirect()}>Click Here to Login or Sign Up</Link> </h4>}
        </div>
    )
}

export default Home;