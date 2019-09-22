import React, { Component } from 'react';
import MainBody from './MainBody/MainBody';

import { Provider } from 'react-redux';
import store from '../store'

class Layout extends Component {
    render () {
        //const classes = useStyles();
        return (
            <Provider store = {store}>
                <MainBody />      
            </Provider>
        )
    }
};

export default Layout;