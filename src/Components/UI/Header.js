import React,  { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>
                    {props.children}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default header;