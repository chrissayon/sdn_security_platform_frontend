import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideButtons from './SideButtons/SideButtons'

import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: 10,
        
    },
    // grid: {
    //     paddingLeft: 5
    // },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

//Main body of the page
class MainBody extends Component {
    render () {
        const { classes } = this.props;

        return (
            <Grid container style={{paddingLeft: 10, paddingRight: 10}} spacing={3}>
                <Grid item xs={4}>
                    {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    <SideButtons />
                </Grid>
                {/* {[0, 1, 2].map(value => (
                     <Grid container key={value} item>
                        <Paper className={classes.paper} />
                    </Grid>))} */}
                <Grid item xs={8}>
                    <Paper className={classes.paper}>xs=9</Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(MainBody);
