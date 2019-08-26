import React, { Component } from 'react';
import axios from 'axios';
import {
    LineChart, Line, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux'
import { flowAggGraphRequest } from '../../../actions/graphapiRequests'

class FlowAggregateGraph extends Component {
    componentDidMount() {
        this.interval = setInterval(() => { //wait 5 seconds and rerun it
            this.props.flowAggGraphRequest();
        }, 5000);   
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render () {
        return (
        <ResponsiveContainer key={this.props.graphData.id} width="99%" height="99%">
            <LineChart width={630} height={250} data={this.props.graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <Tooltip />
                <Line type="monotone" dataKey="byte_count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="id" />
                <YAxis dataKey="byte_count"/>
            </LineChart>
        </ResponsiveContainer>
        )
    }
};

const mapStateToProps = state => ({
    graphData: state.graphData.flowAggGraphData
});

export default connect(mapStateToProps, { flowAggGraphRequest })(FlowAggregateGraph);