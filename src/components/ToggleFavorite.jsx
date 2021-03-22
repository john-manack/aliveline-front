import { useParams } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/icons/Check';

const ToggleFavorite = ({is_favorite, handleReload, reload}) => {
    const { activity_id } = useParams();

    const _handleClick = async (e) => {
        e.preventDefault();
        const toggleResponse = await fetch('http://127.0.0.1:3030/activities/modifyIsFavorite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                boolean: !is_favorite,
                activity_id
            }),
        }).then((response) => response);

        if (toggleResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        } 
    }
    
    return (
        <>
            <p>Favorite? - {is_favorite ? 'Yes' : 'No'}</p>
            <ToggleButton value="check" type="button" selected={is_favorite} onClick={_handleClick} size="small"><CheckIcon/></ToggleButton>
        </>    
    )
}

export default ToggleFavorite
