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
    paddingRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    
    //State for dropdown selection of stats
    const [values, setValues] = React.useState({
        statType: '',
    });

    //State for start and enddate information
    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate, setEndDate] = React.useState(new Date('2020-08-18T21:11:54'));
    
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

    // Handler for start date component
    const handleStartDateChange = date => {
        setStartDate(date);
    };

    // Handler for end date component
    const handleEndDateChange = date => {
        setEndDate(date);
    };

    // Handler for record text field compinent
    const handleRecordChange = event => {
        setMaxRecords(parseInt(event.target.value))
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

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // React.useEffect(() => {
    //     console.log(logData)
    // }, [logData])

    const logClicked = () => {
        // console.log(values)
        // console.log(formatDate(startDate))
        // console.log(formatDate(endDate))
        // console.log(maxRecords)
        setViewLogs(true)

    if(values.statType === 'flow_aggregate'){
        axios.post('http://127.0.0.1:8000/sdn_communication/flow_agg_stats/',{
            data: { 
                'maxRecords' : maxRecords,
                'startDateYear' : startDate.getFullYear(),
                'startDateMonth' : startDate.getMonth() + 1,
                'startDateDay' : startDate.getDate(),
                'endDateYear' : endDate.getFullYear(),
                'endDateMonth' : endDate.getMonth() + 1,
                'endDateDay' : endDate.getDate(),
            },
        })
        .then((response) => {
            // console.log(response)
            handleLogChange(response.data)
            setHeader(
                <TableRow>
                    <TableCell>Cell Number</TableCell>
                    <TableCell>Packet Count</TableCell>
                    <TableCell>Byte Count</TableCell>
                    <TableCell>Date Created</TableCell>
                </TableRow>
            )
            setBody(
                response.data.map((arrayValue, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{arrayValue.packet_count}</TableCell>
                        <TableCell>{arrayValue.byte_count}</TableCell>
                        <TableCell>{arrayValue.created}</TableCell>
                    </TableRow>
                ))
            )
            // setBody(
            //     viewLogs.map(row => (
            //         <TableRow>
            //             <TableCell>row.</TableCell>
            //         </TableRow>
            //     ))
            // )
            // console.log(logData)
            

        })
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
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"flow_aggregate"}>Flow Aggregate Statistics</MenuItem>
                        <MenuItem value={"port_stats"}>Port Statistics</MenuItem>
                        <MenuItem value={"flow stats"}>Flow Statistics</MenuItem>
                        <MenuItem value={"attack_notifications"}>Attack Notifications</MenuItem>
                        <MenuItem value={"flow_aggregate_diff"}>Flow Aggregate Difference Statistics</MenuItem>
                        <MenuItem value={"port_difference"}>Port Difference Statistics</MenuItem>
                    </Select>
                    <FormHelperText>Select desired data</FormHelperText>
                </FormControl>
                </form>
            </Grid>
            
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                    className={classes.formControl}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
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
                <Button variant="outlined" onClick={logClicked}>
                    View Logs
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