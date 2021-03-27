import { useParams } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/icons/Check';

const ToggleComplete = ({is_complete, handleReload, reload}) => {
    const { activity_id } = useParams();

    const _handleClick = async (e) => {
        e.preventDefault();
        const toggleResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/activities/modifyIsComplete`, {
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
            <ToggleButton value="check" type="button" selected={is_complete} onClick={_handleClick} size="small"><CheckIcon/></ToggleButton>
        </>    
    )
}

export default ToggleComplete;