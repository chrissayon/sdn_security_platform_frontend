import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

const buttonList = ['SDN Settings', 'View Graph','Settings'];

class SideButtons extends Component {    
    state = {
        buttonList: [
            {
                name: 'SDN Settings',
                key: 0,
                route: '/sdn-settings'
            },
            {
                name: 'View Graph',
                key: 1,
                route: '/graphs'
            },
            {
                name: 'Settings',
                key: 2,
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
                {buttonList.map((element, index) => 
                    <Button 
                        onClick={() => this.handlerLink(index)}
                        variant="contained" 
                        style={{textAlign: "center", width: "100%"}} 
                        key={index}>{element}</Button>)}
            </div>
        )
    }
}

export default withRouter(SideButtons);