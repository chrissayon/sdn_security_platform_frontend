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

import FlowAggregateGraph from '../../../Components/Graph/FlowAggregateGraph';
import PortGraph from '../../../Components/Graph/PortGraph';
import PortDifferenceGraph from '../../../Components/Graph/PortDifferenceGraph';

import 'date-fns';
import Grid from '@material-ui/core/Grid';

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
    
    // State for amount of points to render on graph
    const [graphPoint, setGraphPoint] = React.useState(5);

    // Holds actual component to render on UI
    const [graphRender, setGraphRender] = React.useState(null);

    // State for which button has been pressed
    const [graphChange, setGraphChange] = React.useState(null);

    // Handles getting value from text field and putting it into graphs
    const handleGraphPoint = (event) => {
        setGraphPoint(parseInt(event.target.value));
    }
    
    const portButtonClicked = () => {
        setGraphChange("portGraph");
    }

    const portDifferenceButtonClicked = () => {
        setGraphChange("portDifferenceGraph");
    }

    const flowAggregateButtonClicked = () => {
        setGraphChange("flowAggregateGraph");
    }

    // Selects which graph to render
    const handleGraphChange = () => {
        if(graphChange === "portGraph")
            setGraphRender(<PortGraph maxRecords={graphPoint} />)
        else if(graphChange === "portDifferenceGraph")
            setGraphRender(<PortDifferenceGraph maxRecords={graphPoint} />)
        else if(graphChange === "flowAggregateGraph")
            setGraphRender(<FlowAggregateGraph maxRecords={graphPoint}/>)
    }

    // Forces a render when a button has been pressed or graph points have changed
    React.useEffect(() => {
        handleGraphChange();
        // console.log(graphChange);
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
                    <Button onClick={portDifferenceButtonClicked}>Port Difference Graph</Button>
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