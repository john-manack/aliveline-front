import { useParams } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/icons/Check';

const ToggleBillable = ({is_billable, handleReload, reload}) => {
    const { activity_id } = useParams();

    const _handleClick = async (e) => {
        e.preventDefault();
        const toggleResponse = await fetch('https://still-tundra-55405.herokuapp.com/activities/modifyIsBillable', {
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
            <ToggleButton value="check" type="button" selected={is_billable} onClick={_handleClick} size="small"><CheckIcon/></ToggleButton>
        </>    
    )
}

export default ToggleBillable;