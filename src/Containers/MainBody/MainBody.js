import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideButtons from './SideButtons/SideButtons'

import sdnGraph from '../../Components/Graph/Graph';

import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        
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
            <BrowserRouter history={history}>
            <Grid container style={{paddingLeft: 10, paddingRight: 10}} spacing={3}>
                <Grid item xs={2}>
                    <SideButtons />
                </Grid>
                <Grid item xs={10} style={{width: "100%"}}>
                    
                        <Switch>
                            <Route path={'/sdn-settings'} component={null}/>
                            <Route path={'/graphs'} component={sdnGraph}/>
                            <Route exact path={'/'} component={null}/>
                        </Switch>
                </Grid>
            </Grid>
            
            </BrowserRouter>
        )
    }
}

export default withStyles(styles)(MainBody);
