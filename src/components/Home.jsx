import React from 'react';
import './component-styles/Home.css';
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';
import UserProfile from './UserProfile';


const Home = () => {

    return(
        <div className="Home">
            <h1>aliveline</h1>
            <h3>a crunchtime manager for nerds</h3>
            <br/>
            <LoginButton />
            <LogoutButton/>
            <UserProfile/>
        </div>
    )
}

export default Home;