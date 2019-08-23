import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Tables from '../../../Components/UI/Tables/Tables'
import { connect } from 'react-redux'
import { flowStatsRequest } from '../../../actions/apiRequests'

class FlowTable extends Component {
    componentDidMount() {
        this.props.flowStatsRequest();
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render () {
        console.log(this.props.get)
        return (
                this.props.get.map((data, header) => {
                    return (
                        <React.Fragment key={header}>
                            <h1>Flow Table {data.id}</h1>
                            <Tables headerValue={data} />
                        </React.Fragment>
                    )
                })
        )
    }
}

// Posts.propTypes = {
//     descRequest: PropTypes.funcisRequired,
//     posts: PropTypes.array.isRequired
// }

const mapStateToProps = state => ({
    get: state.get.flowData
});

export default connect(mapStateToProps, { flowStatsRequest })(FlowTable);