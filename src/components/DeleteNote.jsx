import { Button } from '@material-ui/core';

const DeleteNote = ({handleReload, reload, note_id}) => {
    
    const _handleDelete = async (e) => {
        const submitResponse = await fetch ('http://127.0.0.1:3030/activities/deleteNote', {
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