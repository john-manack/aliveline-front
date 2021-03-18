import { useParams } from 'react-router-dom';

const ToggleComplete = ({is_complete, handleReload, reload}) => {
    const { activity_id } = useParams();

    const _handleClick = async (e) => {
        e.preventDefault();
        const toggleResponse = await fetch('http://127.0.0.1:3030/activities/modifyIsComplete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                boolean: !is_complete,
                activity_id
            }),
        }).then((response) => response);

        if (toggleResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        } 
    }
    
    return (
        <>
            <p>Complete? - {is_complete ? 'Yes' : 'No'}</p>
            <button type="button" onClick={_handleClick}>Toggle Complete</button>
        </>    
    )
}

export default ToggleComplete;