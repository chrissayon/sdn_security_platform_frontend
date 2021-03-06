import React from 'react';
import clsx from 'clsx';

// Network Related
import axios from 'axios';

// Date Realted
import moment from 'moment';

// Route Related
import { Route,  Switch , withRouter } from 'react-router-dom';

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

// Icon Realted
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import BuildIcon from '@material-ui/icons/Build';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ListAllIcon from '@material-ui/icons/ListAlt';
import ComputerIcon from '@material-ui/icons/Computer';
import NotificationIcon from '@material-ui/icons/Notifications'
import CompareArrows from '@material-ui/icons/CompareArrows'

// Notification Popup
import NotificationPopover from './NotificationPopUp/NotificationPopover';

// Body Related
import FlowTable from './Flow/FlowTable';
import PortTable from './Port/PortTable';
import FlowAggregateGraph from './FlowAggregate/FlowAggregateGraph';
import sdnGraph from '../../Components/Graph/Graph';

// Menus/Body Related
import SdnSettings from './SdnSettings/SdnSettings';
import AlarmThreshold from './AlarmThreshold/AlarmThreshold';
import AlarmInformation from './AlarmInformation/AlarmInformation'
import NotificationSetting from '../MainBody/NotificationSettings/NotificationSettings';
import ViewLogs from '../MainBody/ViewLogs/ViewLogs';
import LiveMonitoring from '../MainBody/LiveMonitoring/LiveMonitoring';
import FlowConfiguration from './FlowConfiguration/FlowConfiguration';

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
  
  // Holds the button list on the sidebar
  const [buttonList] = React.useState([
      {
          name: 'SDN Settings',
          route: '/sdn-settings',
          icon: <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>
      },
      {
        name: 'Flow Configuration',
        route: '/flow-configuration',
        icon: <ListItemIcon><CompareArrows /></ListItemIcon>
    },
      {
        name: 'Alarm Information',
        route: '/alarm-information',
        icon: <ListItemIcon><NotificationIcon /></ListItemIcon>
      },
      {
        name: 'Alarm Thresholds',
        route: '/alarm-thresholds',
        icon: <ListItemIcon><BuildIcon /></ListItemIcon>
      },
      // {
      //   name: 'Notification Settings',
      //   route: '/notification-settings',
      //   icon: <ListItemIcon><EventNoteIcon /></ListItemIcon>
      // },
      {
        name: 'Live Monitoring',
        route: '/live-monitoring',
        icon: <ListItemIcon><ComputerIcon /></ListItemIcon>
      },
      {
        name: 'View Logs',
        route: '/view-logs',
        icon: <ListItemIcon><ListAllIcon /></ListItemIcon>
      },
  ]);

  //Changes the URL link when a button is pressed
  const handlerLink = (index) => {
    const urlLink = buttonList[index].route;
    // console.log(urlLink);
    props.history.push(urlLink);
  };

  //Handles when drawer opens
  function handleDrawerOpen() {
    setOpen(true);
  };

  //Handles when drawer is closed
  function handleDrawerClose() {
    setOpen(false);
  };

  
  return (
    <div className={classes.root}>
      {/* Top bar menu */}
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
          
         {/* Sidebar */}
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
                { buttonList[index].icon } 
                  {/* { console.log(buttonList[index].icon) } */}
                
                <ListItemText primary={buttonList[index].name} />
              </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route path={'/sdn-settings'} component={SdnSettings}/>
            <Route path={'/alarm-thresholds'} component={AlarmThreshold} />
            <Route path={'/notification-settings'} component={NotificationSetting} />
            <Route path={'/view-logs'} component={ViewLogs} />
            <Route path={'/live-monitoring'} component={LiveMonitoring} />
            <Route path={'/alarm-information'} component={AlarmInformation} />
            <Route path={'/flow-configuration'} component={FlowConfiguration} />
            <Route exact path={'/'} component={null}/>
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(MainBody);