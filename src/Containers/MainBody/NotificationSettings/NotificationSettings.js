import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const NotificationSettings = () => {
    return (
        <React.Fragment>
            <TextField
                id="standard-name"
                label="Email Address"
                value={"sample@domain.com"}
                margin="normal"
            />
            <Button variant="outlined">
                Set Email Address
            </Button>
        </React.Fragment>
    )
}

export default NotificationSettings