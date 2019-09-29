import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

export default function FlowConfiguration() {
    const classes = useStyles();
    
    //State for dropdown selection of stats
    const [values, setValues] = React.useState({
        statType: 'flow_stats',
    });

    const [portValue, setPortValues] = React.useState({
        portValue: 'All',
    });
    
    //State dictating how many records to return from the backend
    const [maxRecords, setMaxRecords] = React.useState(1)
    
    //State for whether View Logs Button has been clicked
    const [viewLogs, setViewLogs] = React.useState(false)

    //State for log data obtained from backend
    const [logData, setLogData] = React.useState({})

    //State for header to use in table
    const [header, setHeader] = React.useState(null)

    //State for body of logs
    const [body, setBody] = React.useState(null)

    // Handler for record text field compinent
    const handleRecordChange = event => {
        setMaxRecords(parseInt(event.target.value))
    }

    // Handler change for port selector 
    const handlePortValue = event => {
        setPortValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }
    
    // Handler for stat selection
    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    // Handler for log data from backend server
    const handleLogChange = responseData => {
        setLogData(responseData)
    }

    const flowStats = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/flow_stats/',{
            data: { 
                'maxRecords' : maxRecords,
                'filter' : 123917682137064,
            },
        })
        .then((response) => {
            console.log(response)
            handleLogChange(response.data)
            setHeader(
                <TableRow>
                    <TableCell>Row Number</TableCell>
                    <TableCell>Datapath ID</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>Table ID</TableCell>
                    <TableCell>Duration Sec</TableCell>
                    <TableCell>Duration NSec</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Idle Timeout</TableCell>
                    <TableCell>Hard Timeout</TableCell>
                    <TableCell>Flags</TableCell>
                    <TableCell>Cookies</TableCell>
                    <TableCell>Packet Count</TableCell>
                    <TableCell>Byte Count</TableCell>
                    <TableCell>Match</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell>Created</TableCell>
                </TableRow>
            )
            setBody(
                response.data.map((arrayValue, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{arrayValue.dpid}</TableCell>
                        <TableCell>{arrayValue.length}</TableCell>
                        <TableCell>{arrayValue.table_id}</TableCell>
                        <TableCell>{arrayValue.duration_sec}</TableCell>
                        <TableCell>{arrayValue.duration_nsec}</TableCell>
                        <TableCell>{arrayValue.priority}</TableCell>
                        <TableCell>{arrayValue.idle_timeout}</TableCell>
                        <TableCell>{arrayValue.hard_timeout}</TableCell>
                        <TableCell>{arrayValue.flags}</TableCell>
                        <TableCell>{arrayValue.cookie}</TableCell>
                        <TableCell>{arrayValue.packet_count}</TableCell>
                        <TableCell>{arrayValue.byte_count}</TableCell>
                        <TableCell>{arrayValue.match}</TableCell>
                        <TableCell>{arrayValue.actions}</TableCell>
                        <TableCell>{moment(arrayValue.created).format('DD/MM/YYYY h:mm:ss')}</TableCell>
                    </TableRow>
                ))
            )
        })
    }

    const logClicked = () => {
        setViewLogs(true)
        if(values.statType === 'flow_stats') {
            flowStats()
        }

  }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form autoComplete="off">
                    <FormControl >
                        <InputLabel shrink>
                            Statistic Type
                        </InputLabel>
                        <Select
                            value={values.statType}
                            onChange={handleChange}
                            inputProps={{
                                name: 'statType',
                                id: 'statTypeID',
                            }}
                            displayEmpty
                            name=""
                            className={classes.selectEmpty}
                        >
                            <MenuItem value={"flow_stats"}>View Flows</MenuItem>
                            <MenuItem value={"add_flows"}>Add Flows</MenuItem>
                            <MenuItem value={"edit_flows"}>Edit Flows</MenuItem>
                            <MenuItem value={"delete_flows"}>Delete Flows</MenuItem>
                        </Select>
                        <FormHelperText>Select action</FormHelperText>
                    </FormControl>
                </form>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-number"
                    label="Max Records"
                    helperText="Please input an integer"
                    margin="normal"
                    type="number"
                    onChange={handleRecordChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button 
                    variant="outlined" 
                    className={classes.formControl} 
                    onClick={logClicked}
                >
                    Confirm
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                        {
                            header
                        }
                    </TableHead>
                    <TableBody>
                        {
                            body
                        }
                        
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}