import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import ActivityDetails from './ActivityDetails';
import AddActivity from './AddActivity';
import { Box } from '@material-ui/core';
import './component-styles/ActivityList.css';

const ActivitiesList = ({reload, handleReload }) => {
    const [activities, setActivities] = useState([]);
    const { url, path } = useRouteMatch();

    useEffect(() => {
        (async () => {
            const activitiesData = await fetch('http://127.0.0.1:3030/activities').then(response => response.json());
            setActivities(activitiesData);
        })();
    },[reload])

    return(
        <>
            <h1>User's Activities</h1>
            <hr/>
            <h2>Add new activity</h2>
            <AddActivity handleReload={handleReload} reload={reload}/>
            <hr/>
            <h2>List of Current Activities</h2>
                <Box display="flex" flexDirection ="row" flexWrap="wrap" alignItems="center" justifyContent="center">
                    {activities.map((activity, index) => (
                        <Box key={index} order={index} className="activity">
                            <h3>{activity.title}</h3>
                            <p>{activity.details}</p>
                            <p>Complete? {activity.is_complete ? 'Yes' : 'No'}</p>
                            <Link to={`${url}/${activity.id}`}>See Details</Link>
                        </Box>
                    ))}
                </Box>
            <hr/>
            <Route exact path={path}>
                <p>Please select an activity for more details</p>
            </Route>
            <Route path={`/activities/:activity_id`}>
                <ActivityDetails reload={reload} handleReload={handleReload}/>
            </Route>
        </>
    )
}

export default ActivitiesList;