import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddHours = ({handleReload, hoursArray, reload}) => {
    const { activity_id } = useParams({});
    const [newHoursTime, setNewHoursTime] = useState('');
    const [newHoursDetail, setNewHoursDetail] = useState('');

    const _handleNewHoursTime = e => {
        setNewHoursTime(e.target.value);
    }

    const _handleNewHoursDetail = e => {
        setNewHoursDetail(e.target.value);
    }

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch ('http://127.0.0.1:3030/activities/addHours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hours_entry: newHoursTime,
                hours_description: newHoursDetail,
                activity_id, 
            })
        }).then((response) => response);
        setNewHoursTime('');
        setNewHoursDetail('');

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    return(
        <>
            <ul>
                {hoursArray.map((hours, index) => (
                    <li key={index}>
                        {hours.hours_entry} hour(s) - {hours.hours_description}
                    </li>
                ))}
            </ul>
            <form onSubmit={_handleSubmit}>
                <input 
                    type="text" 
                    name="hours_entry"
                    value={newHoursTime}
                    onChange={_handleNewHoursTime}
                    placeholder="How many hours?"
                    required
                    />
                <input 
                    type="text" 
                    name="hours_description"
                    value={newHoursDetail}
                    onChange={_handleNewHoursDetail}
                    placeholder="Hours detail here"
                    required
                />
                <button type="submit">Log Hours</button>
            </form>
        </>
    )
}

export default AddHours;