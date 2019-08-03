import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const buttonList = ['SDN Settings', 'View Graph','Settings'];

class SideButtons extends Component {    
    
    render () {
        return (
            <div>
                {buttonList.map((element, index) => 
                    <Button style={{textAlign: "center"}} key={index}>{element}</Button>)}
            </div>
        )
    }
}

export default SideButtons;