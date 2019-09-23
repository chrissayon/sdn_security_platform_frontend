import React from 'react';
import clsx from 'clsx';

// Route Related
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

// CSS Related
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

// Notification Popup
import NotificationPopover from './NotificationPopUp/NotificationPopover'

//Body Related
import FlowTable from './Flow/FlowTable'
import PortTable from './Port/PortTable'
import SdnSettings from './SdnSettings/SdnSettings'
import FlowAggregateGraph from './FlowAggregate/FlowAggregateGraph'
import sdnGraph from '../../Components/Graph/Graph';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  title : {
    flexGrow: 1
  }
}));




const MainBody = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [notificationWindowOpen, setNotificationWindowOpen] = React.useState(false);
  
  const [buttonList] = React.useState([
        {
            name: 'SDN Settings',
            route: '/sdn-settings'
        },
        {
            name: 'Port Graph',
            route: '/port-graph'
        },
        {
            name: 'Port Table',
            route: '/port-table'
        },
        {
            name: 'Flow Aggregate Graph',
            route: '/flow-aggregate-graph'
        },
        {
            name: 'Flow Table',
            route: '/flow-table'
        },
        {
            name: 'Settings',
            route: '/settings'
        },
        {
            name: 'SDN Configuration',
            route: '/sdn-configuration'
        },
        {
          name: 'ML Configuration',
          route: '/ml-configuration'
        },
        {
          name: 'Notification Settings',
          route: '/notification-settings'
        },
        {
          name: 'Live Monitoring',
          route: '/live-monitoring'
        },
        {
          name: 'View Logs',
          route: '/view-logs'
        },
    ]);



  const handlerLink = (index) => {
    const urlLink = buttonList[index].route;
    // console.log(urlLink);
    console.log(props)
    props.history.push(urlLink);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
            SDN Security Platform
          </Typography>
          
          <NotificationPopover />
       
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        </div>
        <Divider />
        <List>
            {buttonList.map((text, index) => (
                <ListItem button onClick={() => handlerLink(index)} key={index}>
                <ListItemText primary={buttonList[index].name} />
                </ListItem>
            ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
          <Switch>                            
              <Route path={'/flow-table'} component={FlowTable}/>
              <Route path={'/port-table'} component={PortTable}/>
              <Route path={'/flow-aggregate-graph'} component={FlowAggregateGraph}/>
              <Route path={'/sdn-settings'} component={SdnSettings}/>
              <Route path={'/graphs'} component={sdnGraph}/>
              <Route exact path={'/'} component={null}/>
          </Switch>
        
      </main>
    </div>
  );
}

export default withRouter(MainBody);