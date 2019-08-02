
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from '../Components/UI/Header';
import Footer from '../Components/UI/Footer';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody'
import sdnGraph from '../Components/Graph/Graph';


class Layout extends Component {
    render () {
        //const classes = useStyles();

        return (
            <React.Fragment>
            
                <Header>SDN Security Platform</Header> 
                <Sidebar />

                <MainBody />

                {/* <BrowserRouter>
                    <p>h2</p>
                    <Route exact path='/' component={sdnGraph}/>
                </BrowserRouter> */}
            
            </React.Fragment>
        )
    }
};

export default Layout;