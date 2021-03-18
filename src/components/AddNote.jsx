import { useState } from 'react';
import { useParams } from 'react-router-dom';

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
                        {note.note_entry}
                    </li>
                ))}
            </ul>
            <form onSubmit={_handleSubmit}>
                <input 
                    type="text" 
                    name="note_entry"
                    value={newNoteEntry}
                    onChange={_handleNewNoteEntry}
                    placeholder="new note here"
                    required
                    />
                <button type="submit">Add Note</button>
            </form>
        </>
    )
}

export default AddNote;