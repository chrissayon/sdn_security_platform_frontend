import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis
} from "recharts";
import axios from 'axios'

const TABLE_LIST_1 = [
  { x: 10, y: 180 },
  { x: 20, y: 200 },
  { x: 50, y: 380 },
  { x: 70, y: 50 },
  { x: 90, y: 200 },
  { x: 210, y: 50 }
];
const TABLE_LIST_2 = [
  { x: 10, y: 600 },
  { x: 50, y: 1000 },
  { x: 60, y: 800 },
  { x: 65, y: 450 },
  { x: 80, y: 350 },
  { x: 90, y: 450 },
  { x: 110, y: 615 },
  { x: 140, y: 300 },
  { x: 240, y: 400 },
  { x: 320, y: 200 }
];

export default class Chart extends Component {
    state = {
        list1: [...TABLE_LIST_1],
        list2: [...TABLE_LIST_2],
        portList : [
            // { "date": "2019-08-15T21:24:55.980415+10:00" , "y": 7000 },
            // { "date": "2019-08-16T21:24:55.980415+10:00" , "y": 8000 }
            { x: 5, y: 500 },
            { x: 10, y: 100}            
        ]
    };


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
        axios.get('http://127.0.0.1:8000/sdn_communication/port_stats/')
            .then((response) => {
                let graphData = this.state;
                // console.log(response)
                // graphData.portList.push({ x : 15, y: 30 })
                graphData.portList.push({ x : Math.random()*50, y: 500 })
                console.log(graphData)
                this.setState(graphData)
            })
    }

  render() {
    const { list1, list2, portList } = this.state;
    return (
      <ScatterChart
        width={600}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey={"x"} name="stature" unit="cm" />
        <YAxis type="number" dataKey={"y"} name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Median"
          data={list1}
          fill="#8884d8"
          line
          shape="circle"
        />
        <Scatter name="Hypo" data={list2} fill="red" line shape="circle" />
        <Scatter name="Hypo" data={portList} fill="yellow" line shape="circle" />
      </ScatterChart>
    );
  }
}
