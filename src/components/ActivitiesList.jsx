import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ActivityDetails from './ActivityDetails';
import AddActivity from './AddActivity';
import Modal from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button } from '@material-ui/core';
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
            const activitiesData = await fetch(`${process.env.REACT_APP_SERVER_URL}/activities`).then(response => response.json());
            setActivities(activitiesData);
        })();
    },[reload])

    if (!isAuthenticated) return <p>You must be logged in to view this page.</p>

    const userActivities = activities.filter(activity => activity.user_sub === user.sub);

    return(
        <div className="activity-page">
            <h1>activities</h1>
            <p>Hi {user.given_name}! Your activities are below....<br/>pop one open to see the details, or add a new activity</p>
            <Button type="button" onClick={() => setShowAddModal(true)} variant="outlined">Add new activity</Button>
            <Modal showModal={showAddModal} handleClose={() => setShowAddModal(false)}>
                <AddActivity handleReload={handleReload} reload={reload} handleClose={() => setShowAddModal(false)}/>
            </Modal>
            <br/>
                <Box display="flex" flexDirection ="row" flexWrap="wrap" alignItems="center" justifyContent="center" margin="2.5rem">
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
        </div>
    )
}

export default ActivitiesList;