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

export default function SimpleSelect() {
    const classes = useStyles();
    
    //State for dropdown selection of stats
    const [values, setValues] = React.useState({
        statType: 'flow_aggregate',
    });

    const [portValue, setPortValues] = React.useState({
        portValue: 'All',
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

    // React.useEffect(() => {
    //     console.log(logData)
    // }, [logData])

    const flowAggPost = () => {
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
                    <TableCell>Row Number</TableCell>
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
                        <TableCell>{moment(arrayValue.created).format('DD/MM/YYYY h:mm:ss')}</TableCell>
                    </TableRow>
                ))
            )
        })
    }

    const flowAggDiffPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/flow_agg_diff/',{
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
                    <TableCell>Row Number</TableCell>
                    <TableCell>Packet Count</TableCell>
                    <TableCell>Byte Count</TableCell>
                    <TableCell>Time Interval</TableCell>
                    <TableCell>Date Created</TableCell>
                </TableRow>
            )
            setBody(
                response.data.map((arrayValue, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{arrayValue.packet_count}</TableCell>
                        <TableCell>{arrayValue.byte_count}</TableCell>
                        <TableCell>{arrayValue.time_interval}</TableCell>
                        <TableCell>{moment(arrayValue.created).format('DD/MM/YYYY h:mm:ss')}</TableCell>
                    </TableRow>
                ))
            )
        })
    }

    const portPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/port_stats/',{
            data: { 
                'maxRecords' : maxRecords,
                'startDateYear' : startDate.getFullYear(),
                'startDateMonth' : startDate.getMonth() + 1,
                'startDateDay' : startDate.getDate(),
                'endDateYear' : endDate.getFullYear(),
                'endDateMonth' : endDate.getMonth() + 1,
                'endDateDay' : endDate.getDate(),
                'port_no' : portValue.portValue,
            },
        })
        .then((response) => {
            // console.log(response)
            handleLogChange(response.data)
            setHeader(
                <TableRow>
                    <TableCell>Row Number</TableCell>
                    <TableCell>Port Number</TableCell>
                    <TableCell>TX Packet</TableCell>
                    <TableCell>TX Bytes</TableCell>
                    <TableCell>TX Drop</TableCell>
                    <TableCell>TX Errors</TableCell>
                    <TableCell>RX Packets</TableCell>
                    <TableCell>RX Bytes</TableCell>
                    <TableCell>RX Drop</TableCell>
                    <TableCell>RX Errors</TableCell>
                    <TableCell>RX CRC Error</TableCell>
                    <TableCell>RX Over Error</TableCell>
                    <TableCell>RX Frame Error</TableCell>
                    <TableCell>Date Created</TableCell>
                </TableRow>
            )
            console.log(response.data)
            setBody(
                response.data.map((arrayValue, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{arrayValue.port_no}</TableCell>
                        <TableCell>{arrayValue.tx_packets}</TableCell>
                        <TableCell>{arrayValue.tx_bytes}</TableCell>
                        <TableCell>{arrayValue.tx_dropped}</TableCell>
                        <TableCell>{arrayValue.tx_errors}</TableCell>
                        <TableCell>{arrayValue.rx_packets}</TableCell>
                        <TableCell>{arrayValue.rx_bytes}</TableCell>
                        <TableCell>{arrayValue.rx_dropped}</TableCell>
                        <TableCell>{arrayValue.rx_errors}</TableCell>
                        <TableCell>{arrayValue.rx_crc_err}</TableCell>
                        <TableCell>{arrayValue.rx_over_err}</TableCell>
                        <TableCell>{arrayValue.rx_frame_err}</TableCell>
                        <TableCell>{arrayValue.created}</TableCell>
                        <TableCell>{moment(arrayValue.created).format('DD/MM/YYYY h:mm:ss')}</TableCell>
                    </TableRow>
                ))
            )
        })
    }

    const portDiffPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/port_diff/',{
            data: { 
                'maxRecords' : maxRecords,
                'startDateYear' : startDate.getFullYear(),
                'startDateMonth' : startDate.getMonth() + 1,
                'startDateDay' : startDate.getDate(),
                'endDateYear' : endDate.getFullYear(),
                'endDateMonth' : endDate.getMonth() + 1,
                'endDateDay' : endDate.getDate(),
                'port_no' : portValue.portValue,
            },
        })
        .then((response) => {
            // console.log(response)
            handleLogChange(response.data)
            setHeader(
                <TableRow>
                    <TableCell>Row Number</TableCell>
                    <TableCell>Port Number</TableCell>
                    <TableCell>TX Packet</TableCell>
                    <TableCell>TX Bytes</TableCell>
                    <TableCell>TX Drop</TableCell>
                    <TableCell>TX Errors</TableCell>
                    <TableCell>RX Packets</TableCell>
                    <TableCell>RX Bytes</TableCell>
                    <TableCell>RX Drop</TableCell>
                    <TableCell>RX Errors</TableCell>
                    <TableCell>RX CRC Error</TableCell>
                    <TableCell>RX Over Error</TableCell>
                    <TableCell>RX Frame Error</TableCell>
                    <TableCell>Time Interval</TableCell>
                    <TableCell>Date Created</TableCell>
                </TableRow>
            )
            console.log(response.data)
            setBody(
                response.data.map((arrayValue, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{arrayValue.port_no}</TableCell>
                        <TableCell>{arrayValue.tx_packets}</TableCell>
                        <TableCell>{arrayValue.tx_bytes}</TableCell>
                        <TableCell>{arrayValue.tx_dropped}</TableCell>
                        <TableCell>{arrayValue.tx_errors}</TableCell>
                        <TableCell>{arrayValue.rx_packets}</TableCell>
                        <TableCell>{arrayValue.rx_bytes}</TableCell>
                        <TableCell>{arrayValue.rx_dropped}</TableCell>
                        <TableCell>{arrayValue.rx_errors}</TableCell>
                        <TableCell>{arrayValue.rx_crc_err}</TableCell>
                        <TableCell>{arrayValue.rx_over_err}</TableCell>
                        <TableCell>{arrayValue.rx_frame_err}</TableCell>
                        <TableCell>{arrayValue.time_interval}</TableCell>
                        <TableCell>{arrayValue.created}</TableCell>
                        <TableCell>{moment(arrayValue.created).format('DD/MM/YYYY h:mm:ss')}</TableCell>
                    </TableRow>
                ))
            )
        })
    }

    const logClicked = () => {
        // console.log(values)
        // console.log(formatDate(startDate))
        // console.log(formatDate(endDate))
        // console.log(maxRecords)
        setViewLogs(true)
        console.log(values.statType)
        if(values.statType === 'flow_aggregate') {
            flowAggPost()
        } else if (values.statType === 'flow_aggregate_diff') {
            flowAggDiffPost()
        } else if (values.statType === 'port_stats') {
            portPost()
        } else if (values.statType === 'port_diff') {
            console.log('entered')
            portDiffPost()
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

                       
                        <MenuItem value={"flow_aggregate"}>Flow Aggregate Statistics</MenuItem>
                        <MenuItem value={"flow_aggregate_diff"}>Flow Aggregate Difference Statistics</MenuItem>
                        
                        <MenuItem value={"port_stats"}>Port Statistics</MenuItem>
                        <MenuItem value={"port_diff"}>Port Difference Statistics</MenuItem>
                        {/* <MenuItem value={"flow_stats"}>Flow Statistics</MenuItem> */}
                            
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
                <Button 
                    variant="outlined" 
                    className={classes.formControl} 
                    onClick={logClicked}
                >
                    View Logs
                </Button>
               
                <FormControl >
                    <InputLabel shrink>
                        Statistic Type
                    </InputLabel>
                    <Select
                        value={portValue.portValue}
                        onChange={handlePortValue}
                        inputProps={{
                            name: 'portValue',
                            id: 'portValueID',
                        }}
                        displayEmpty
                        name=""
                        // className={classes.selectEmpty}
                    >
                        <MenuItem value="All">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={"1"}>Port 1</MenuItem>
                        <MenuItem value={"2"}>Port 2</MenuItem>
                        <MenuItem value={"3"}>Port 3</MenuItem>
                        <MenuItem value={"LOCAL"}>Port LOCAL</MenuItem>
                      </Select>
                    <FormHelperText>Select desired data</FormHelperText>
                </FormControl>
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