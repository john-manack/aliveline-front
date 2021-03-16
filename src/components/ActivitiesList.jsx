import React from 'react';
import AcitityDetails from './ActivityDetails';
import { Route, Link } from 'react-router-dom';

const ActivitiesList = () => {
    return(
        <>
            <Route>
                <p>This will be a list of activities</p>
            </Route>
            <Route>
                <AcitityDetails />
            </Route>
        </>
    )
}

export default ActivitiesList;