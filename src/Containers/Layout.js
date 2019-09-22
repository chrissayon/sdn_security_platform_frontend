import React, { Component } from 'react';
import MainBody from './MainBody/MainBody';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store'

class Layout extends Component {
    render () {
        //const classes = useStyles();
        return (
            <Provider store = {store}>
                <BrowserRouter>
                <MainBody />
                </BrowserRouter>      
            </Provider>
        )
    }
};

export default Layout;