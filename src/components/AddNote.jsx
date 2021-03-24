import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import DeleteNote from './DeleteNote';

const AddNote = ({handleReload, notesArray, reload}) => {
    const { activity_id } = useParams({});
    const [newNoteEntry, setNewNoteEntry] = useState('');

    const _handleNewNoteEntry = e => {
        setNewNoteEntry(e.target.value);
    }

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch ('http://127.0.0.1:3030/activities/addNote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                note_entry: newNoteEntry,
                activity_id, 
            })
        }).then((response) => response);
        setNewNoteEntry('');

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    return(
        <>
            <ul>
                {notesArray.map((note, index) => (
                    <li key={index}>
                        <span>{note.note_entry}<DeleteNote handleReload={handleReload} reload={reload} note_id={note.id}/></span>
                    </li>
                ))}
            </ul>
            <form onSubmit={_handleSubmit}>
                <label>
                    <TextField 
                        id="standard-required"
                        name="note_entry"
                        value={newNoteEntry}
                        onChange={_handleNewNoteEntry}
                        placeholder="new note here"
                        required
                        />
                </label>
                <Button size="small" color="primary" type="submit">Add Note</Button>
            </form>
        </>
    )
}

export default AddNote;