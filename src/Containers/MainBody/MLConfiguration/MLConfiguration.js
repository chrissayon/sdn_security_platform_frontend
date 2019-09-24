import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MLConfiguration = () => {
    return (
        <React.Fragment>
            <TextField
                id="standard-name"
                label="Machine Learning Threshold"
                value={"0-1"}
                margin="normal"
            />
            <Button variant="outlined">
                Set Threshold Result
            </Button>
        </React.Fragment>
    )
}

export default MLConfiguration