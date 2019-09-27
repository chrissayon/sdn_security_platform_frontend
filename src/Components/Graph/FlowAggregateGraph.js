import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


const FlowAggregateGraph = (props) => {
    // State used for graph data
    const [graphData , setGraphData] = React.useState(null)
    
    // Post fnuction for obtaining data from backend
    const flowAggPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/flow_agg_diff_graph/',{
            data: { 
                maxRecords: props.maxRecords
            },
        })
        .then((response) => {
            const extractedGraphData = response.data.map((arrayValue, index) => {
                    return ({
                        number: index,
                        packet_count: arrayValue.packet_count,
                        date : moment(arrayValue.created).format('h:mm:ss')
                    }) 
            })  
            setGraphData(
                extractedGraphData
            )
            // console.log(extractedGraphData)
            
        })
    }

    // Periodic function to run post data function
    React.useEffect(() => {
        const interval = setInterval(() => {
            flowAggPost()
        }, 5000);
        return () => {
          clearInterval(interval);
        };
    }, []);

    // Gets data when rendered
    React.useEffect(() => {
        flowAggPost()
    }, [props.maxRecords]);
    

    return (
        <LineChart width={600} height={400} data={graphData}>
            <Line type="monotone" dataKey="packet_count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" angle={-45} height={50} textAnchor="end"/>
            <YAxis />
        </LineChart>
    )
};

export default FlowAggregateGraph;