import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Tables from '../../../Components/UI/Tables/Tables'
import { connect } from 'react-redux'
import { portStatsRequest } from '../../../actions/apiRequests'

class FlowTable extends Component {
    componentDidMount() {
        this.props.portStatsRequest();
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render () {
        console.log(this.props.get)
        return (
            <React.Fragment>
                {this.props.get.map((data) => {
                    return (
                        <React.Fragment>
                            <h1>Port Table {data.id}</h1>
                            <Tables headerValue={data} />
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

export default connect(mapStateToProps, { portStatsRequest })(FlowTable);