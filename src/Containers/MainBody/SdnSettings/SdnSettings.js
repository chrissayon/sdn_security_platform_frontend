import React, { Component } from 'react';
import axios from 'axios';
import JsonPairs from '../../../Components/UI/JsonPairs/JsonPairs'
import Tables from '../../../Components/UI/Tables/Tables'

class Settings extends Component {
    state = {
        "Datapath ID"              : "Not Updated",
        "Manufacturer Description" : "Not Updated",
        "Software Description"     : "Not Updated",
        "Serial Number"            : "Not Updated",
        "Datapath Description"     : "Not Updated",
    }


    componentDidMount() {
        this.getData(); //Get data first time
        this.interval = setInterval(() => { //wait 5 seconds and rerun it
            this.getData();
        }, 20000);
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    getData() {
        axios.get('http://127.0.0.1:8000/sdn_communication/desc_stats/')
            .then((response) => {
                console.log(response)
                console.log(response.data)
                let hardwareDesc = {
                    "Datapath ID"              : response.data.id,
                    "Manufacturer Description" : response.data.mfr_desc,
                    "Software Description"     : response.data.sw_desc,
                    "Serial Number"            : response.data.serial_num,
                    "Datapath Description"     : response.data.dp_desc,
                }
                this.setState(hardwareDesc)

            })
    }


    render () {
        return (
            <React.Fragment>
                <Tables headerValue={ this.state } />
            </React.Fragment>
        )
    }
}

export default Settings;