import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import FlowAggregateGraph from '../../../Components/Graph/FlowAggregateGraph'
import PortGraph from '../../../Components/Graph/PortGraph'

import axios from 'axios'

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginRight: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LiveMonitoring() {
    const classes = useStyles();
    
    const [graphPoint, setGraphPoint] = React.useState(5);
    const [graphRender, setGraphRender] = React.useState(null)
    const [graphChange, setGraphChange] = React.useState(null)

    const handleGraphPoint = (event) => {
        setGraphPoint(parseInt(event.target.value))
    }
    
    const portButtonClicked = () => {
        setGraphChange("portGraph")
    }

    const portAggregateButtonClicked = () => {
        setGraphChange("portAggregateGraph")
    }

    const flowAggregateButtonClicked = () => {
        setGraphChange("flowAggregateGraph")
    }

    const handleGraphChange = () => {
        if(graphChange === "portGraph")
            setGraphRender(<PortGraph maxRecords={graphPoint} />)
        else if(graphChange === "flowAggregateGraph")
            setGraphRender(<FlowAggregateGraph maxRecords={graphPoint}/>)
    }

    React.useEffect(() => {
        handleGraphChange()
        console.log(graphChange)
    }, [graphChange, graphPoint]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <ButtonGroup
                    fullWidth 
                    variant="contained"
                    color="primary"
                    aria-label="full-width contained primary button group"
                >
                    <Button onClick={portButtonClicked} >Port Graph</Button>
                    <Button>Port Aggregate Graph</Button>
                    <Button onClick={flowAggregateButtonClicked}>Flow Aggregate Graph</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-number"
                    label="Graph Point Number"
                    helperText="Please input an integer"
                    margin="normal"
                    type="number"
                    value={graphPoint}
                    onChange={handleGraphPoint}
                />
            </Grid>
            <Grid item xs={12}>
                {graphRender}
            </Grid>
        </Grid>
    );
}