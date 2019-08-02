import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Sidebar extends Component {
    state = {
        open: false
    }
    
    handlerSidebar = () => {
        let sidebarOpen = this.state.open;
        this.setState({open: !sidebarOpen})
        return
    }

    render () {
        const sideList = () => (
            <div>
                <List>
                    <ListItem button onClick={this.handlerSidebar}>
                        <ListItemText primary="app049ht934ngi34jfle" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <Button
                    onClick={this.handlerSidebar}>
                    Sidedraw
                </Button>

                <SwipeableDrawer 
                    open={this.state.open}
                    anchor="right">
                    {sideList('appble')}
                </SwipeableDrawer>
            </div>
        )
    }
}

export default Sidebar;