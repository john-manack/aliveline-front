import { Button } from '@material-ui/core';

const DeleteNote = ({handleReload, reload, note_id}) => {
    
    const _handleDelete = async (e) => {
        const submitResponse = await fetch ('https://still-tundra-55405.herokuapp.com/activities/deleteNote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                note_id
            })
        }).then((response) => response);

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    const _handleClick = () => {
        window.confirm('Are you sure you want to delete this note?') ? _handleDelete() : handleReload(false)
    };


    return (
        <>
            <Button onClick={_handleClick}>X</Button>
        </>
    )
}

export default DeleteNote;