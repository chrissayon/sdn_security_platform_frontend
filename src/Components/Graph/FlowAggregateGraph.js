import React, { Component } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
  
const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

class FlowAggregateGraph extends Component {
    state = {
        portList : [
            { x: 0, y: 0 }
        ]
    }

    componentDidMount() {
        this.getData(); //Get data first time
        this.interval = setInterval(() => { //wait 5 seconds and rerun it
            this.getData();
        }, 5000);
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    getData() {
        axios.get('http://127.0.0.1:8000/sdn_communication/flow_agg_stats/')
            .then((response) => {
                let graphData = this.state;
                console.log(response)
                console.log(response.data.byte_count)
                graphData.portList.push({ x: response.data.last_modified, y: response.data.byte_count})
                console.log(graphData)
            })
    }
    
    
    render () {
        return (
        <LineChart
            width={500}
            height={300}
            data={this.state.portList}
            margin={{top: 5, right: 30, left: 20, bottom: 5,}}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
        </LineChart>
        )
    }
};

export default FlowAggregateGraph;