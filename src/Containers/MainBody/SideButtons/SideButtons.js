import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const buttonList = ['SDN Settings', 'View Graph','Settings'];

class SideButtons extends Component {    
    state = {
        buttonList: {
            SDNSettings: {
                key: 0,
                route: '/SDNSetting'
            },
            ViewGraph: {
                key: 1,
                route: '/ViewGraph'
            },
            Settings: {
                key: 2,
                route: '/People'
            },
        }
    }

    render () {
        return (
            <div>
                {buttonList.map((element, index) => 
                    <Button 
                        variant="contained" 
                        style={{textAlign: "center", width: "100%"}} key={index}>{element}</Button>)}
            </div>
        )
    }
}

export default SideButtons;