import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
    const { user, isAuthenticated } = useAuth0();
    console.log('user is ', user);
    
    return (

        <div>
            {JSON.stringify(user, null, 2)}
        </div>
    )
}

export default UserProfile
