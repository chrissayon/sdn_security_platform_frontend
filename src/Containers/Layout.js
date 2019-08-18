import React, { Component } from 'react';
import Header from '../Components/UI/Header';
import Footer from '../Components/UI/Footer';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody';


class Layout extends Component {
    render () {
        //const classes = useStyles();

        return (
            <React.Fragment>
                <Header style={{paddingDown: 10}}>SDN Security Platform</Header> 
                <MainBody />            
            </React.Fragment>
        )
    }
};

export default Layout;