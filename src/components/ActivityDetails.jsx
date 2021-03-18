import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ToggleComplete from './ToggleComplete';
import ToggleBillable from './ToggleBillable';

const ActivityDetails = ({reload, handleReload}) => {
    const { activity_id } = useParams({});
    const [activity, setActivity] = useState();

    useEffect(() => {
        (async () => {
            const activityData = await fetch (`http://127.0.0.1:3030/activities/${activity_id}`).then(response => response.json());
            setActivity(activityData);
            console.log('activityData is ', activityData);
        })();
    },[reload, activity_id]);
    
    return(
        <>
            {!!activity ? (
                <>
                    <h2>{activity.title}</h2>
                    <h3>{activity.details}</h3>
                    <ToggleComplete is_complete={activity.is_complete} handleReload={handleReload} reload={reload}/>
                    <ToggleBillable is_billable={activity.is_billable} handleReload={handleReload} reload={reload}/>
                    <p>Notes:</p>
                    <ul>
                        {activity.notes.map((note, index) => (
                            <li key={index}>
                                {note.note_entry}
                            </li>
                        ))}
                    </ul>
                    <p>Hours Log:</p>
                    <ul>
                        {activity.hours.map((hour, index) => (
                            <li key={index}>
                                {hour.hours_entry} hour(s) - {hour.hours_description}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Getting Activity Info...</p>
            )}
        </>
    )
}

export default ActivityDetails;