import { useParams } from 'react-router-dom';

const ToggleBillable = ({is_billable, handleReload, reload}) => {
    const { activity_id } = useParams();

    const _handleClick = async (e) => {
        e.preventDefault();
        const toggleResponse = await fetch('http://127.0.0.1:3030/activities/modifyIsBillable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                boolean: !is_billable,
                activity_id
            }),
        }).then((response) => response);

        if (toggleResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        } 
    }
    
    return (
        <>
            <p>Billable? - {is_billable ? 'Yes' : 'No'}</p>
            <button type="button" onClick={_handleClick}>Toggle Billable</button>
        </>    
    )
}

export default ToggleBillable;