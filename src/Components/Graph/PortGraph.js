import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



const PortGraph = () => {
    const [graphData1 , setGraphData1] = React.useState({})
    const [graphData2 , setGraphData2] = React.useState({})
    const [graphData3 , setGraphData3] = React.useState({})
    const [graphDataLocal , setGraphDataLocal] = React.useState({})

    const portPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/port_graph/',{
            data: { 
                maxRecords: 7
            },
        })
        .then((response) => {
            // console.log(response.data)
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
            
        })
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            portPost()
        }, 5000);
        return () => {
          clearInterval(interval);
        };
    }, []);
    

    return (
        <LineChart width={600} height={300} data={graphData1}>
            <Line type="monotone" dataKey="rx_bytes" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" angle={-45} textAnchor="end"/>
            <YAxis />
        </LineChart>
    )
};

export default PortGraph;