import { useState } from 'react';
import { Button } from '@material-ui/core';

const AddActivity = ({handleReload, reload}) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [isBillable, setIsBillable] = useState(true);
    
    const _handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const _handleDetailsChange = e => {
        setDetails(e.target.value);
    }

    const _handleBillableChange = e => {
        setIsBillable(e.target.value);
    }

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch('http://127.0.0.1:3030/activities/addActivity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                details,
                is_billable: isBillable,
            })
        }).then((response) => response);
        setTitle('');
        setDetails('');
        setIsBillable(true);

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    return (
        <form onSubmit={_handleSubmit}>
            <label>
                <input 
                    type="text" 
                    name="title" 
                    value={title} 
                    onChange={_handleTitleChange} 
                    placeholder='Activity Title' 
                    required
                />
            </label>
            <br/>
            <label>
                <input 
                    type="text" 
                    name="title" 
                    value={details} 
                    onChange={_handleDetailsChange} 
                    placeholder='Activity Details'
                    size='50'
                    required
                />
            </label>
            <br/>
            <select onChange={_handleBillableChange} required defaultValue={1}>
                <option disabled value={1}>Select One</option>
                <option value={true}>Billable</option>
                <option value={false}>Non-billable</option>
            </select>
            <br/>
            <Button  size="small" type="submit" variant="outlined" color="primary" disableElevation >Add Activity</Button>
        </form>
    )
}

export default AddActivity;