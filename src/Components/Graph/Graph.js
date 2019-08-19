import React, { Component } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class MovingChart extends Component {
  randomDataArray(nb_elem) {
    var data_bar = [];
    for (var i = 0; i < nb_elem; i++) {
      data_bar.push({
        name: "core " + i,
        freq: Math.round(Math.random() * 1000),
        freq2: Math.round(Math.random() * 1000)
      });
    }
    return data_bar;
  }

  constructor(props) {
    super(props);
    this.state = {
      nb_bar: props.nb_bar,
      data: this.randomDataArray(props.nb_bar)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      data: this.randomDataArray(this.props.nb_bar)
    });
  }

  render() {
    return (
      <BarChart
        width={750}
        height={740}
        data={this.state.data}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="freq" fill="#8884d8" />
        <Bar dataKey="freq2" fill="#8214d8" />
      </BarChart>
    );
  }
}

export default MovingChart;
;
