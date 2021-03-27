import { useState } from 'react';
import { Button, TextField, Select, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddActivity = ({handleReload, reload, handleClose }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [isBillable, setIsBillable] = useState(true);
    const { user } = useAuth0();
    
    const _handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const _handleDetailsChange = e => {
        setDetails(e.target.value);
    }

    const _handleBillableChange = e => {
        setIsBillable(e.target.value);
    }

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/activities/addActivity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                details,
                is_billable: isBillable,
                user_sub: user.sub
            })
        }).then((response) => response);
        setTitle('');
        setDetails('');
        setIsBillable(true);

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    return (
        <>
            <p>Create a new activity</p>
            <form className={classes.root} validate autoComplete="off" onSubmit={_handleSubmit}>
                <label>
                    <TextField 
                        name="title" 
                        value={title} 
                        onChange={_handleTitleChange} 
                        required
                        id="standard-required"
                        label="Activity title"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </label>
                <br/>
                <label>
                    <TextField 
                        id="filled-multiline-static"
                        name="detail" 
                        value={details} 
                        onChange={_handleDetailsChange} 
                        label="Activity details"
                        multiline
                        rows={2}
                    />
                </label>
                <br/>
                <InputLabel id="demo-simple-select-label">
                    <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isBillable}
                        onChange={_handleBillableChange} 
                        defaultValue={1}
                    >
                        <MenuItem value={true}>Billable</MenuItem>
                        <MenuItem value={false}>Non-billable</MenuItem>
                    </Select>
                </InputLabel>
                <br/>
                <Button  size="small" type="submit" variant="outlined" color="primary" disableElevation onClick={handleClose}>Add Activity</Button>
            </form>
        </>
    )
}

export default AddActivity;