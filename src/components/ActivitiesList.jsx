import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ActivityDetails from './ActivityDetails';
import AddActivity from './AddActivity';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import './component-styles/ActivityList.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
            width: theme.spacing(25),
            height: theme.spacing(20),
        },
    },
}));

const ActivitiesList = ({reload, handleReload }) => {
    const classes = useStyles();
    const [activities, setActivities] = useState([]);
    const { url, path } = useRouteMatch();
    const { user, isAuthenticated} = useAuth0();
    const userActivities = activities.filter(activity => activity.user_sub === user.sub);
    console.log('activities are ', activities)
    console.log('userActivities are ', userActivities)

    useEffect(() => {
        (async () => {
            const activitiesData = await fetch('http://127.0.0.1:3030/activities').then(response => response.json());
            setActivities(activitiesData);
        })();
    },[reload])

    if (!isAuthenticated) return <p>You must be logged in to view this page.</p>

    return(
        <>
            <h1>User's Activities</h1>
            <hr/>
            <h2>Add new activity</h2>
            <AddActivity handleReload={handleReload} reload={reload}/>
            <hr/>
            <h2>List of Current Activities</h2>
                <Box display="flex" flexDirection ="row" flexWrap="wrap" alignItems="center" justifyContent="center">
                    {userActivities.map((activity, index) => (
                        <Box key={index} order={index} className="activity">
                            <div className={classes.root}>
                                <Paper elevation={3} >
                                    <h3>{activity.is_complete ? <span style={{textDecoration:'line-through red'}}>{activity.title}</span> : activity.title}</h3>
                                    <p>Complete? {activity.is_complete ? 'Yes' : 'No'}</p>
                                    <Link to={`${url}/${activity.id}`}>See Details</Link>
                                </Paper>
                            </div>
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