import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import DeleteHours from './DeleteHours.jsx'

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
                        {hours.hours_entry} {hours.hours_entry === 1 ? 'hour' : 'hours'} - {hours.hours_description} <DeleteHours handleReload={handleReload} reload={reload} hours_id={hours.id}/>
                    </li>
                ))}
            </ul>
            <form onSubmit={_handleSubmit}>
                <TextField 
                    id="standard-required"
                    name="hours_entry"
                    value={newHoursTime}
                    onChange={_handleNewHoursTime}
                    placeholder="How many hours?"
                    required
                    />
                <TextField 
                    id="standard-required"
                    name="hours_description"
                    value={newHoursDetail}
                    onChange={_handleNewHoursDetail}
                    placeholder="Hours detail here"
                    required
                />
                <Button size="small" color="primary" type="submit">Log Hours</Button>
            </form>
        </>
    )
}

export default AddHours;