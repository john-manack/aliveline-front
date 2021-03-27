import { Button } from '@material-ui/core';

const DeleteHours = ({handleReload, reload, hours_id}) => {
    
    const _handleDelete = async (e) => {
        const submitResponse = await fetch (`${process.env.REACT_APP_SERVER_URL}/activities/deleteHours`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hours_id
            })
        }).then((response) => response);

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    const _handleClick = () => {
        window.confirm('Are you sure you want to delete this hours entry?') ? _handleDelete() : handleReload(false)
    };


    return (
        <>
            <Button onClick={_handleClick}>X</Button>
        </>
    )
}

export default DeleteHours;
