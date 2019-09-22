import React, { Component } from 'react';
import clsx from 'clsx';

// Route Related
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

// CSS Related
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//Body Related
import FlowTable from './Flow/FlowTable'
import PortTable from './Port/PortTable'
import SdnSettings from './SdnSettings/SdnSettings'
import FlowAggregateGraph from './FlowAggregate/FlowAggregateGraph'
import sdnGraph from '../../Components/Graph/Graph';

const drawerWidth = 240;

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#212121',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));




class MainBody extends Component {
  state = {
    open: false,
    setOpen: false,
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
  ]}



  handlerLink = (index) => {
    const urlLink = this.state.buttonList[index].route;
    // console.log(urlLink);
    console.log(this.props)
  }

  handleDrawerOpen() {
    this.setState({setOpen: true})
  }

  handleDrawerClose() {
    this.setState({setOpen: false})
  }


  render () {
    // const theme = useTheme();

    return (
      <div className={root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(appBar, {
              [appBarShift]: this.state.open,
            })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(menuButton, {
                [hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap>
              SDN Security Platform
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(drawer, {
            [drawerOpen]: this.state.open,
            [drawerClose]: !this.state.open,
          })}
          classes={{
            paper: clsx({
              [drawerOpen]: this.state.open,
              [drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                <ChevronLeftIcon />
              </IconButton>
          </div>
          <Divider />
          <List>
              {this.state.buttonList.map((text, index) => (
                  <ListItem button onClick={() => this.handlerLink(index)} key={index}>
                  <ListItemText primary={this.state.buttonList[index].name} />
                  </ListItem>
              ))}
          </List>
        </Drawer>
        <main className={content}>
          <div className={toolbar} />
          <BrowserRouter>
            <Switch>                            
                <Route path={'/flow-table'} component={FlowTable}/>
                <Route path={'/port-table'} component={PortTable}/>
                <Route path={'/flow-aggregate-graph'} component={FlowAggregateGraph}/>
                <Route path={'/sdn-settings'} component={SdnSettings}/>
                <Route path={'/graphs'} component={sdnGraph}/>
                <Route exact path={'/'} component={null}/>
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    )
  };
}


export default withStyles(styles)(MainBody);