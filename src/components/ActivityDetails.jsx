import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ActivityDetails = () => {
    const { activity_id } = useParams({});
    const [activity, setActivity] = useState();
    console.log('activity_id is ', activity_id)

    useEffect(() => {
        (async () => {
            const activityData = await fetch (`http://127.0.0.1:3030/activities/${activity_id}`).then(response => response.json());
            setActivity(activityData);
            console.log('activityData is ', activityData);
        })();
    },[setActivity, activity_id]);
    
    return(
        <>
            {!!activity ? (
                <>
                    <h2>{activity.title}</h2>
                    <h3>{activity.details}</h3>
                    {activity.is_complete ? (
                        <p>Complete? - Yes</p>
                    ) : (
                        <p>Complete? - No</p>
                    )}
                    {activity.is_billable ? (
                        <p>Billable? - Yes</p>
                    ) : (
                        <p>Billable? - No</p>
                    )}
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