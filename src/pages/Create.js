import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { KeyboardArrowRightRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

export default function Create() {
    const classes = useStyles()
    const navigate = useNavigate;
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [category, setCategory] = useState('todos')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setTitleError(false)
        setDetailsError(false)

        if (title === '') {
            setTitleError(true)
        }
        if (details === '') {
            setDetailsError(true)
        }
        if (title && details) {
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({ title, details, category })
            }).then(() => navigate('/'))
        }
    }

    return (
        <Container>
            <Typography
                variant='h6'
                color='textSecondary'
                component='h2'
                gutterBottom
            >
                Create a New Note
            </Typography>

            <form 
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit}
            >
                <TextField 
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.field}
                    label='Note Title'
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    error={titleError}
                />
                <TextField 
                    onChange={(e) => setDetails(e.target.value)}
                    className={classes.field}
                    label='Details'
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    error={detailsError}
                />
                <FormControl className={classes.field}>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                        <FormControlLabel value='money' control={<Radio />} label='Money' />
                        <FormControlLabel value='todos' control={<Radio />} label='Todos' />
                        <FormControlLabel value='reminders' control={<Radio />} label='Reminders' />
                        <FormControlLabel value='work' control={<Radio />} label='Work' />
                    </RadioGroup>
                </FormControl>
                <Button
                    type='submit'
                    color='secondary'
                    variant='contained'
                    endIcon={<KeyboardArrowRightRounded />}
                >
                    Submit
                </Button>
            </form>

        </Container>
    )
}