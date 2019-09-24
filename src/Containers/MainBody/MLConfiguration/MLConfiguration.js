import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'


class MLConfiguration extends Component {
    state = {
        inputMlThreshold : "",
        mlThreshold : "",
    }

    setIP = (event) => {
        this.setState({
            inputMlThreshold : event.target.value
        });
    }

    setMlThreshold = () => {
        let self = this;
        axios.post('http://127.0.0.1:8000/sdn_communication/update_ml_threshold/',{
            data: { ml_threshold : this.state.inputMlThreshold },
        })
        .then((response) => {
            console.log(response)
            self.setState({mlThreshold: response.data.ml_threshold})
        })
    }

    getMlThreshold = () => {
        axios.get('http://127.0.0.1:8000/sdn_communication/update_ml_threshold/')
        .then((response) => {
            console.log(response)
            this.setState({mlThreshold: response.data.ml_threshold})
        })
    }

    componentDidMount() {
        this.getMlThreshold();
    }
    

    render () {
        return (
            <React.Fragment>
                <Grid container spacing={10} >
                    <Grid item  >
                        <TextField
                            id="standard-name"
                            label="Set ML Threshold"
                            value={this.state.inputMlThreshold}
                            onChange = {this.setIP}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item  >
                        <TextField
                            id="standard-name"
                            label="ML Threshold Value"
                            value={this.state.mlThreshold}
                            onChange = {this.setIP}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    
                </Grid>
                <Button variant="outlined" onClick={this.setMlThreshold}>
                    Set Machine Learning Threshold
                </Button>
            </React.Fragment>
        )
    }
}

export default MLConfiguration;