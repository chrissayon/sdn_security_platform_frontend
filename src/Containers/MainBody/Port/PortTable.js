import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Tables from '../../../Components/UI/Tables/Tables'
import { connect } from 'react-redux'
import { portStatsRequest } from '../../../actions/apiRequests'

class PortTable extends Component {
    componentDidMount() {
        // Port stats API request
        this.props.portStatsRequest();
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render () {
        return (
            <React.Fragment>
                {this.props.get.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h1>Port Table {data.id}</h1>
                            <Tables key={index} headerValue={data} />
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        )
    }
}

// Posts.propTypes = {
//     descRequest: PropTypes.funcisRequired,
//     posts: PropTypes.array.isRequired
// }

const mapStateToProps = state => ({
    get: state.get.portData
});

export default connect(mapStateToProps, { portStatsRequest })(PortTable);