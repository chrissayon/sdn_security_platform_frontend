import React,  { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#212121'
      },
      secondary: purple,
    },
    status: {
      danger: 'orange',
    },
  });


const header = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography>
                        {props.children}
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default header;