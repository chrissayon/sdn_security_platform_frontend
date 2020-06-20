import React, { Component } from 'react';
import axios from 'axios';
import {
    LineChart, Line, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

let xValue = 0;

class FlowAggregateGraph extends Component {
    state = {
        portList : [
            // // { "date": "2019-08-15T21:24:55.980415+10:00" , "y": 7000 },
            // // { "date": "2019-08-16T21:24:55.980415+10:00" , "y": 8000 }
            // { x: 5, y: 9000 },
            // { x: 10, y: 10000}
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

    shouldComponentUpdate(nextProps, nextState){
        return this.state != nextState
    }


    getData() {
        axios.get('http://10.0.1.10:8000/sdn_communication/flow_agg_stats/')
            .then((response) => {
                let graphData = this.state;
                xValue += 5;
                graphData.portList.push({
                    //time: response.data.last_modified, 
                    time: xValue, 
                    byte_count: response.data.byte_count 
                })
                // console.log(graphData)
                this.setState(
                    graphData
                )
            })
    }
    
    
    render () {
        console.log(this.state)
        return (
        <ResponsiveContainer key={xValue} width="99%" height="99%">
            <LineChart width={630} height={250} data={this.state.portList}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <Tooltip />
                <Line type="monotone" dataKey="byte_count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis dataKey="byte_count"/>
            </LineChart>
        </ResponsiveContainer>
        )
    }
};

export default FlowAggregateGraph;