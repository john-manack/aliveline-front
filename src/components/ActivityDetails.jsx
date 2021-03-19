import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ToggleComplete from './ToggleComplete';
import ToggleBillable from './ToggleBillable';
import AddNote from './AddNote';
import AddHours from './AddHours';
import { Box } from '@material-ui/core';
import './component-styles/ActivityDetails.css'

const ActivityDetails = ({reload, handleReload}) => {
    const { activity_id } = useParams({});
    const [activity, setActivity] = useState();

    useEffect(() => {
        (async () => {
            const activityData = await fetch (`http://127.0.0.1:3030/activities/${activity_id}`).then(response => response.json());
            setActivity(activityData);
        })();
    },[reload, activity_id]);
    
    return(
        <div className="details">
            {!!activity ? (
                <>
                    <h2>{activity.title}</h2>
                    <h3>{activity.details}</h3>
                    <Box display="flex" flexDirection ="row" flexWrap="wrap" alignItems="center" justifyContent="center">
                        <Box className="item">
                            <ToggleComplete is_complete={activity.is_complete} handleReload={handleReload} reload={reload}/>
                        </Box>
                        <Box className="item">
                            <ToggleBillable is_billable={activity.is_billable} handleReload={handleReload} reload={reload}/>
                        </Box>
                        <Box className="item">
                            <p>Notes:</p>
                            <AddNote notesArray={activity.notes} handleReload={handleReload} reload={reload}/>
                        </Box>
                        <Box className="item">
                            <p>Hours Log:</p>
                            <AddHours hoursArray={activity.hours} handleReload={handleReload} reload={reload}/>
                        </Box>
                    </Box>
                </>
            ) : (
                <p>Getting Activity Info...</p>
            )}
        </div>
    )
}

export default ActivityDetails;