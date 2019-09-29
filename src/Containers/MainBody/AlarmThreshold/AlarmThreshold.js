import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'


class AlarmThreshold extends Component {
    state = {
        inputMlThreshold : "",
        mlThreshold : "",
        inputPortThreshold: "",
        portThreshold: "",
        inputPortDiffTheshold: "",
        portDiffTheshold: "",
        inputFlowAggThreshold: "",
        flowAggThreshold: "",
        inputFlowAggDiffThreshold: "",
        flowAggDiggThreshold: "",

    }

    setML = (event) => {
        this.setState({
            inputMlThreshold : parseFloat(event.target.value)
        });
    }

    setPort = (event) => {
        this.setState({
            inputPortThreshold : parseInt(event.target.value)
        });
    }

    setPortDiff = (event) => {
        this.setState({
            inputPortDiffTheshold : parseInt(event.target.value)
        });
    }

    setFlowAgg = (event) => {
        this.setState({
            inputFlowAggThreshold : parseInt(event.target.value)
        });
    }

    setFlowAggDiff = (event) => {
        this.setState({
            inputFlowAggDiffThreshold : parseInt(event.target.value)
        });
    }

    setMlThreshold = () => {
        let self = this;
        axios.post('http://127.0.0.1:8000/sdn_communication/update_ml_threshold/',{
            data: { 
                ml_threshold : this.state.inputMlThreshold,
                port_threshold : this.state.inputPortThreshold,
                port_diff_threshold : this.state.inputPortDiffTheshold,
                flow_aggregate_threshold : this.state.inputFlowAggThreshold,
                flow_aggregate_difference_threshold : this.state.inputFlowAggDiffThreshold,
            },
        })
        .then((response) => {
            // console.log(response)
            self.setState({
                mlThreshold: response.data.ml_threshold,
                portThreshold : response.data.port_threshold,
                portDiffTheshold : response.data.port_diff_threshold,
                flowAggThreshold : response.data.flow_aggregate_threshold,
                flowAggDiggThreshold : response.data.flow_aggregate_difference_threshold,
            })
        })
    }

    getMlThreshold = () => {
        axios.get('http://127.0.0.1:8000/sdn_communication/update_ml_threshold/')
        .then((response) => {
            console.log(response)
            this.setState({
                inputMlThreshold: response.data.ml_threshold,
                inputPortThreshold : response.data.port_threshold,
                inputPortDiffTheshold : response.data.port_diff_threshold,
                inputFlowAggThreshold : response.data.flow_aggregate_threshold,
                inputFlowAggDiffThreshold : response.data.flow_aggregate_difference_threshold,

                mlThreshold: response.data.ml_threshold,
                portThreshold : response.data.port_threshold,
                portDiffTheshold : response.data.port_diff_threshold,
                flowAggThreshold : response.data.flow_aggregate_threshold,
                flowAggDiggThreshold : response.data.flow_aggregate_difference_threshold,
            })
        })
    }

    componentDidMount() {
        this.getMlThreshold();
    }
    

    render () {
        return (
            <React.Fragment>
                <Grid container spacing={10} >
                    <Grid item xs={12} >
                        <TextField
                            style={{marginRight: 200}}
                            id="standard-name"
                            label="Set Port Threshold"
                            value={this.state.inputMlThreshold}
                            onChange = {this.setML}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="standard-name"
                            label="Current ML Threshold"
                            value={this.state.mlThreshold}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            style={{marginRight: 200}}
                            id="standard-name"
                            label="Set Port Threshold"
                            value={this.state.inputPortThreshold}
                            onChange = {this.setPort}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="standard-name"
                            label="Current Port Threshold"
                            value={this.state.portThreshold}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid> 
                    <Grid item xs={12} >
                        <TextField
                            style={{marginRight: 200}}
                            id="standard-name"
                            label="Set Port Difference Threshold"
                            value={this.state.inputPortDiffTheshold}
                            onChange = {this.setPortDiff}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="standard-name"
                            label="Current Port Difference Threshold"
                            value={this.state.portDiffTheshold}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid> 
                    <Grid item xs={12} >
                        <TextField
                            style={{marginRight: 200}}
                            id="standard-name"
                            label="Set Flow Aggregate Threshold"
                            value={this.state.inputFlowAggThreshold}
                            onChange = {this.setFlowAgg}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="standard-name"
                            label="Current Flow Aggregate Threshold"
                            value={this.state.flowAggThreshold}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid> 
                    <Grid item xs={12} >
                        <TextField
                            style={{marginRight: 200}}
                            id="standard-name"
                            label="Set Flow Aggregate Difference Threshold"
                            value={this.state.inputFlowAggDiffThreshold}
                            onChange = {this.setFlowAggDiff}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="standard-name"
                            label="Current ML Threshold Value"
                            value={this.state.flowAggDiggThreshold}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>                     
                </Grid>
                <Button variant="outlined" onClick={this.setMlThreshold} xs={12}>
                    Set Threshold Values
                </Button>
            </React.Fragment>
        )
    }
}

export default AlarmThreshold;

