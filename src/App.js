import React from 'react';
import './App.css';
import Layout from './Containers/Layout'

import { createMuiTheme } from '@material-ui/core/styles' //Create new muit heme
import { ThemeProvider } from '@material-ui/styles'; //Changing the themes of the components

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});


function App() {
  return (
    <React.Fragment>
      <Layout/>
    </React.Fragment>
  );
}

export default App;
