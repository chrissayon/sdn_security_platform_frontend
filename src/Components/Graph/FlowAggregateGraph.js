import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 800}];


const FlowAggregateGraph = (props) => {
    const [graphData , setGraphData] = React.useState(null)

    const flowAggPost = () => {
        axios.post('http://127.0.0.1:8000/sdn_communication/flow_agg_diff_graph/',{
            data: { 
                maxRecords: 7
            },
        })
        .then((response) => {
            console.log(response.data)
            setGraphData(
                response.data.map((arrayValue, index) => ({
                    number: index,
                    packet_count: arrayValue.packet_count,
                    byte_count: arrayValue.byte_count,
                    created : moment(arrayValue.created).format('DD/MM/YYYY h:mm:ss')
                }))
            )
        })
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
           
          console.log("In Set")
        }, 5000);
        return () => {
          clearInterval(interval);
        };
    }, []);
    

    return (
        <LineChart width={600} height={300} data={graphData}>
            <Line type="monotone" dataKey="byte_count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="packet_count" />
            <YAxis />
        </LineChart>
    )
};

export default FlowAggregateGraph;