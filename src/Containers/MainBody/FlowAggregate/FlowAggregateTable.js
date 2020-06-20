import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Tables from '../../../Components/UI/Tables/Tables'
import { connect } from 'react-redux'
import { flowAggStatsRequest } from '../../../actions/apiRequests'

class FlowAggTable extends Component {
    componentDidMount() {
        this.props.flowAggStatsRequest();
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    getData() {
        axios.get('http://10.0.1.10:8000/sdn_communication/desc_stats/')
            .then((response) => {
                //console.log(response)
                //console.log(response.data)
                let hardwareDesc = {
                    "Datapath ID"              : response.data.id,
                    "Manufacturer Description" : response.data.mfr_desc,
                    "Software Description"     : response.data.sw_desc,
                    "Serial Number"            : response.data.serial_num,
                    "Datapath Description"     : response.data.dp_desc,
                }
            })
    }


    render () {
        return (
            <React.Fragment>
                <Tables headerValue={ this.props.get } />
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