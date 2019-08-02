
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Header from '../Components/UI/Header'
import Footer from '../Components/UI/Footer'
import sdnGraph from '../Components/Graph/Graph'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  });

class Layout extends Component {
    render () {
        return (
            <React.Fragment>
                
                <ThemeProvider theme={theme}>
                    <Header>SDN Security Platform</Header> 
                </ThemeProvider>

                

                <BrowserRouter>
                    <p>h2</p>
                    <Route exact path='/' component={sdnGraph}/>
                </BrowserRouter>
            
            </React.Fragment>
        )
    }
};

export default Layout;