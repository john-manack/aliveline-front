import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import ActivityDetails from './ActivityDetails';

const ActivitiesList = ({reload}) => {
    const [activities, setActivities] = useState([]);
    const { url, path } = useRouteMatch();
    console.log('url is ', url)

    useEffect(() => {
        (async () => {
            const activitiesData = await fetch('http://127.0.0.1:3030/activities').then(response => response.json());
            setActivities(activitiesData);
        })();
    },[reload])

    return(
        <>
            <h1>User's Activities</h1>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>
                        <h3>{activity.title}</h3>
                        <p>{activity.details}</p>
                        <Link to={`${url}/${activity.id}`}>See Details</Link>
                    </li>
                ))}
            </ul>
            <hr/>
            <Route exact path={path}>
                <p>Please select an activity for more details</p>
            </Route>
            <Route path={`/activities/:activity_id`}>
                <ActivityDetails />
            </Route>
        </>
    )
}

export default ActivitiesList;