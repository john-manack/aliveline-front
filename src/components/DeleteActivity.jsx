import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const DeleteActivity = ({handleReload, reload, activity_id}) => {
    const history = useHistory();


    const _handleDelete = async (e) => {
        const submitResponse = await fetch ('http://127.0.0.1:3030/activities/deleteActivity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                activity_id
            })
        }).then((response) => response);

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true);
            history.push('/activities');
        }
    }

    const _handleClick = () => {
        window.confirm('Are you sure you want to delete this activity? This action cannot be undone.') ? _handleDelete() : handleReload(false)
    };


    return (
        <div>
            <Button onClick={_handleClick} color="secondary">Delete Activity</Button>
        </div>
    )
}

export default DeleteActivity
