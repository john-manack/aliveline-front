import { useState } from 'react';

const AddActivity = ({handleReload}) => {
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
            handleReload(true)
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
            <select onChange={_handleBillableChange} required>
                <option disabled value={null} selected>Select One</option>
                <option value={true}>Billable</option>
                <option value={false}>Non-billable</option>
            </select>
            <br/>
            <button type="submit" >Add Activity</button>
        </form>
    )
}

export default AddActivity;