import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button variant="contained" className={classes.button}>Button</Button>
    </React.Fragment>
  );
}

export default App;
