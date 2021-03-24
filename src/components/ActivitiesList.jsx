import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ActivityDetails from './ActivityDetails';
import AddActivity from './AddActivity';
import Modal from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import './component-styles/ActivityList.css';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
            width: theme.spacing(28),
            height: theme.spacing(20),
        },
    },
}));

const ActivitiesList = ({reload, handleReload }) => {
    const classes = useStyles();
    const [activities, setActivities] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const { url, path } = useRouteMatch();
    
    //Comment out below when testing, or app is not live
    const { user, isAuthenticated} = useAuth0();
    console.log('user info is', user)
    
    // Comment out below when not testing, or app is live
    // const user = {
    //     sub: "google-oauth2|106823713440282669958"
    // }
    // const isAuthenticated = true;
    

    useEffect(() => {
        (async () => {
            const activitiesData = await fetch('http://127.0.0.1:3030/activities').then(response => response.json());
            setActivities(activitiesData);
        })();
    },[reload])

    if (!isAuthenticated) return <p>You must be logged in to view this page.</p>

    const userActivities = activities.filter(activity => activity.user_sub === user.sub);

    return(
        <>
            <h1>Activities</h1>
            <br/>
            <button type="button" onClick={() => setShowAddModal(true)}>Add new activity</button>
            <Modal showModal={showAddModal} handleClose={() => setShowAddModal(false)}>
                <AddActivity handleReload={handleReload} reload={reload} handleClose={() => setShowAddModal(false)}/>
            </Modal>
            <br/>
            <h2>List of Current Activities</h2>
                <Box display="flex" flexDirection ="row" flexWrap="wrap" alignItems="center" justifyContent="center">
                    {userActivities.map((activity, index) => (
                        <Box key={index} order={index} className="activity">
                            <div className={classes.root}>
                                <Paper elevation={3} >
                                    <h3>{activity.is_complete ? <span style={{textDecoration:'line-through red'}}>{activity.title}</span> : activity.title}</h3>
                                    <Link to={`${url}/${activity.id}`} onClick={() => setShowDetailModal(true)}>See Details</Link>
                                    <br/>
                                    <div>
                                        {activity.is_favorite ? <StarRoundedIcon fontSize='large' style={{color: 'gold'}}/> : <StarBorderRoundedIcon fontSize='large' />}
                                        {activity.is_billable ? <AttachMoneyIcon fontSize='large' /> : <MoneyOffIcon fontSize='large' style={{color: 'red'}}/>}
                                    </div>
                                </Paper>
                            </div>
                        </Box>
                    ))}
                </Box>
            <Route exact path={path}>
            </Route>
            <Route path={`/activities/:activity_id`}>
                <Modal showModal={showDetailModal} handleClose={() => setShowDetailModal(false)}>
                    <ActivityDetails reload={reload} handleReload={handleReload}/>
                </Modal>
            </Route>
        </>
    )
}

export default ActivitiesList;