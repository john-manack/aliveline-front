import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const UserProfile = () => {
    const { user } = useAuth0();
    const [userProfile, setUserProfile] = useState('');
    
    return (
        <div>
            {JSON.stringify(user, null, 2)}
        </div>
    )
}

export default UserProfile
