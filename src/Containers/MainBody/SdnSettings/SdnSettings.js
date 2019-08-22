import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Tables from '../../../Components/UI/Tables/Tables'
import { connect } from 'react-redux'
import { fetchPosts } from '../../../actions/postActions'

class Settings extends Component {
    state = {
        "Datapath ID"              : "Not Updated",
        "Manufacturer Description" : "Not Updated",
        "Software Description"     : "Not Updated",
        "Serial Number"            : "Not Updated",
        "Datapath Description"     : "Not Updated",
    }


    componentDidMount() {
        this.props.fetchPosts();
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
                <Tables headerValue={ this.props.posts } />
            </React.Fragment>
        )
    }
}

// Posts.propTypes = {
//     fetchPosts: PropTypes.funcisRequired,
//     posts: PropTypes.array.isRequired
// }

const mapStateToProps = state => ({
    posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(Settings);