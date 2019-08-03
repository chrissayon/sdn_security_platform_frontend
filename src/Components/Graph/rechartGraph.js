import React, { Component } from 'react';
import axios from 'axios';

import { LineChart, Line, CartesianGrid } from 'recharts';



class renderLineChart extends Component {
    
    componentDidMount() {
        this.getData(); //Get data first time
        this.interval = setInterval(() => { //wait 5 seconds and rerun it
           // this.getData();
            console.log('Executing every 5 seconds')
        }, 5000);
    }

    getData() {
        axios.get('http://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                console.log(response)
            })
    }
    
    render () {
        return (
            null
            // <LineChart width={200} height={200} data={data}>
            //     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            //     <CartesianGrid stroke="#ccc " />
            // </LineChart>
        )
    }
};

export default renderLineChart;