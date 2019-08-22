import React, { Component } from 'react';
import Header from '../Components/UI/Header';
import Footer from '../Components/UI/Footer';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody';

import { Provider } from 'react-redux';
import store from '../store'

class Layout extends Component {
    render () {
        //const classes = useStyles();

        return (
            <Provider store = {store}>
                <React.Fragment>
                    <Header style={{paddingDown: 10}}>SDN Security Platform</Header> 
                    <MainBody />            
                </React.Fragment>
            </Provider>
        )
    }
};

export default Layout;