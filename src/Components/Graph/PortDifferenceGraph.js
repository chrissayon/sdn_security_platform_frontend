import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    graphBox: {
        height: 500,
        marginBottom: theme.spacing(10)
    },
    gridBox: {
        height: 300,
    }

  }));

const PortGraph = (props) => {
    const classes = useStyles();

    const [graphData1 , setGraphData1] = React.useState({})
    const [graphData2 , setGraphData2] = React.useState({})
    const [graphData3 , setGraphData3] = React.useState({})
    const [graphDataLocal , setGraphDataLocal] = React.useState({})

    const portPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/port_diff_graph/',{
            data: { 
                maxRecords: props.maxRecords
            },
        })
        .then((response) => {
            // console.log(response.data)
            //Graph 1 Write
            const responseData1 = response.data.filter((arrayValue) => {
                return arrayValue.port_no === "1"
            })  
            const extractedGraphData1 = responseData1.map((arrayValue, index) => {
                return ({
                    rx_bytes: arrayValue.rx_bytes,
                    tx_bytes: arrayValue.tx_bytes,
                    date: moment(arrayValue.created).format('h:mm:ss')
                })
            })
            setGraphData1(extractedGraphData1)

            //Graph 2 Write
            const responseData2 = response.data.filter((arrayValue) => {
                return arrayValue.port_no === "2"
            })  
            const extractedGraphData2 = responseData2.map((arrayValue, index) => {
                return ({
                    rx_bytes: arrayValue.rx_bytes,
                    tx_bytes: arrayValue.tx_bytes,
                    date: moment(arrayValue.created).format('h:mm:ss')
                })
            })
            setGraphData2(extractedGraphData2)

            //Graph 3 Write
            const responseData3 = response.data.filter((arrayValue) => {
                return arrayValue.port_no === "3"
            })  
            const extractedGraphData3 = responseData3.map((arrayValue, index) => {
                return ({
                    rx_bytes: arrayValue.rx_bytes,
                    tx_bytes: arrayValue.tx_bytes,
                    date: moment(arrayValue.created).format('h:mm:ss')
                })
            })
            setGraphData3(extractedGraphData3)

            //Graph Local Write
            const responseDataLocal = response.data.filter((arrayValue) => {
                return arrayValue.port_no === "LOCAL"
            })  
            const extractedGraphDataLocal = responseDataLocal.map((arrayValue, index) => {
                return ({
                    rx_bytes: arrayValue.rx_bytes,
                    tx_bytes: arrayValue.tx_bytes,
                    date: moment(arrayValue.created).format('h:mm:ss')
                })
            })
            setGraphDataLocal(extractedGraphDataLocal)
            
        })
    }

    //Periodically do post requests every 5 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            portPost()
            console.log(props.maxRecords)
        }, 10000);
        return () => {
          clearInterval(interval);
        };
    }, [props.maxRecords]);
    
    //Render upon initialization
    React.useEffect(() => {
        portPost()
    }, [props.maxRecords]);

    return (
        <Grid container >
            <Grid item xs={12} className={classes.graphBox}>
                <h1>Port 1</h1>
                {/* <ResponsiveContainer> */}
                    <LineChart width={600} height={400} data={graphData1}>
                        <Line type="monotone" dataKey="rx_bytes" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis 
                            dataKey="date" 
                            angle={-45} 
                            height={50} 
                            textAnchor="end"
                            label={{ 
                                value: 'Time', 
                                position: 'insideBottomRight',
                                dy: 5,
                                offset: 0
                            }}
                        />
                        <YAxis 
                            label={{ 
                                value: 'RX Bytes', 
                                angle: -90, 
                                position: 'insideLeft' 
                            }}
                        />
                        <Tooltip />
                    </LineChart>
                {/* </ResponsiveContainer> */}
            </Grid>
            <Grid item xs={12} className={classes.graphBox}>
                <h1>Port 2</h1>
                {/* <ResponsiveContainer> */}
                    <LineChart width={600} height={400} data={graphData2}>
                        <Line type="monotone" dataKey="rx_bytes" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis 
                            dataKey="date" 
                            angle={-45} 
                            height={50} 
                            textAnchor="end"
                            label={{ 
                                value: 'Time', 
                                position: 'insideBottomRight',
                                dy: 5,
                                offset: 0
                            }}
                        />
                        <YAxis 
                            label={{ 
                                value: 'RX Bytes', 
                                angle: -90, 
                                position: 'insideLeft' 
                            }}
                        />
                        <Tooltip />
                    </LineChart>
                {/* </ResponsiveContainer> */}
            </Grid>
            <Grid item xs={12} className={classes.graphBox}>
                <h1>Port 3</h1>
                {/* <ResponsiveContainer> */}
                    <LineChart width={600} height={400} data={graphData3}>
                        <Line type="monotone" dataKey="rx_bytes" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis 
                            dataKey="date" 
                            angle={-45} 
                            height={50} 
                            textAnchor="end"
                            label={{ 
                                value: 'Time', 
                                position: 'insideBottomRight',
                                dy: 5,
                                offset: 0
                            }}
                        />
                        <YAxis 
                            label={{ 
                                value: 'RX Bytes', 
                                angle: -90, 
                                position: 'insideLeft' 
                            }}
                        />
                        <Tooltip />
                    </LineChart>
                {/* </ResponsiveContainer> */}
            </Grid>
        </Grid>
    )
};

export default PortGraph;