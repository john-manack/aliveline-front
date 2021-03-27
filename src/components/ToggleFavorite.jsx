import { useParams } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import StarIcon from '@material-ui/icons/Star';


const ToggleFavorite = ({is_favorite, handleReload, reload}) => {
    const { activity_id } = useParams();

    const _handleClick = async (e) => {
        e.preventDefault();
        const toggleResponse = await fetch('https://still-tundra-55405.herokuapp.com/activities/modifyIsFavorite', {
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
            <ToggleButton value="check" type="button" selected={is_favorite} onClick={_handleClick} size="small" thumbSwitchedStyle={{ backgroundColor: 'green'}}><StarIcon/></ToggleButton>
        </>    
    )
}

export default ToggleFavorite
