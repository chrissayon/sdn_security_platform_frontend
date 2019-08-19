import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'


class SideButtons extends Component {    
    state = {
        //Button list for buttons
        buttonList: [
            {
                name: 'SDN Settings',
                key: 0,
                route: '/sdn-settings'
            },
            {
                name: 'Port Graph',
                key: 1,
                route: '/port-graph'
            },
            {
                name: 'Port Table',
                key: 2,
                route: '/port-table'
            },
            {
                name: 'Flow Aggregate Graph',
                key: 3,
                route: '/flow-aggregate-graph'
            },
            {
                name: 'Flow Table',
                key: 4,
                route: '/flow-table'
            },
            {
                name: 'Settings',
                key: 5,
                route: '/settings'
            }
        ]
    }

    handlerLink = (index) => {
        const urlLink = this.state.buttonList[index].route;
        console.log(urlLink);
        
        this.props.history.push(urlLink);
    }

    render () {
        console.log(this.props)

        return (
            <div>
                {this.state.buttonList.map((element, index) => 
                    <Button 
                        onClick={() => this.handlerLink(index)}
                        variant="contained" 
                        style={{textAlign: "center", width: "100%"}} 
                        key={index}>{this.state.buttonList[index].name}</Button>)}
            </div>
        )
    }
}

export default withRouter(SideButtons);