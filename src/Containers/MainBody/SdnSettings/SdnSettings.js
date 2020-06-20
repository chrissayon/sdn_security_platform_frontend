import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tables from '../../../Components/UI/Tables/Tables'
import DescriptionTables from '../../../Components/UI/Tables/DescriptionTables'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { descRequest } from '../../../actions/apiRequests'
import axios from 'axios'


class SdnSettings extends Component {
    state = {
        inputControllerIP : "",
        controllerIP : "",
    }

    setIP = (event) => {
        this.setState({
            inputControllerIP : event.target.value
        });
    }

    setControllerAddress = () => {
        let self = this;
        axios.post('http://10.0.1.10:8000/sdn_communication/update_controller_IP/',{
            data: { controllerIP : this.state.inputControllerIP },
        })
        .then((response) => {
            console.log(response)
            self.setState({controllerIP: response.data.controllerIP})
        })
    }

    getControllerAddress = () => {
       
        
        axios.get('http://10.0.1.10:8000/sdn_communication/update_controller_IP/')
        .then((response) => {
            console.log(response)
            this.setState({controllerIP: response.data.controllerIP})
        })
    }

    componentDidMount() {
        this.props.descRequest();
        this.getControllerAddress();
    }
    

    render () {
        console.log(this.state.controllerIP)
        return (
            <React.Fragment>
                <Grid container spacing={10} >
                    <Grid item  >
                        <TextField
                            id="standard-name"
                            label="Set New Address"
                            value={this.state.inputControllerIP}
                            onChange = {this.setIP}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item  >
                        <TextField
                            id="standard-name"
                            label="Controller Address"
                            value={this.state.controllerIP}
                            onChange = {this.setIP}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    
                </Grid>
                <Button variant="outlined" onClick={this.setControllerAddress}>
                    Set Controller Address
                </Button>
                <DescriptionTables headerValue={ this.props.get } />
            </React.Fragment>
        )
    }
}

// Posts.propTypes = {
//     descRequest: PropTypes.funcisRequired,
//     posts: PropTypes.array.isRequired
// }

const mapStateToProps = state => ({
    get: state.get.descData
});

export default connect(mapStateToProps, { descRequest })(SdnSettings);