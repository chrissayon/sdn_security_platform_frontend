import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import axios from 'axios'
import NotificationIcon from '@material-ui/icons/Notifications'
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function NotificationPopover() {
    const classes = useStyles();

    // Used to inficate if to show notification
    const [anchorEl, setAnchorEl] = React.useState(null);

    // What to display on notification
    const [notifications, setNotifications] = React.useState("No alerts")

    // Data obtained from backend
    const [notificationData, setNotificationData] = React.useState(
        [{'id' : -1}]
    )

    // Used to inficate if button has been pressed when there were notifications
    const [notificationPressed, setNotificationPressed] = React.useState(true)

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
        setNotificationPressed(true);
    };

    function handleClose() {
        setAnchorEl(null);
    };
    
    // let endNotificationDate = new Date()
    // let startNotificationDate = new Date()

    let startNotificationDate = new Date()
    let endNotificationDate = new Date()
    endNotificationDate.setDate(endNotificationDate.getDate() + 1)
    

    // const notificationPost = () => {
    //     axios.post('http://127.0.0.1:8000/sdn_communication/attack_notification/',{
    //         data: { 
    //             'maxRecords' : 5,
    //             'startDateYear' : startNotificationDate.getFullYear(),
    //             'startDateMonth' : startNotificationDate.getMonth() + 1,
    //             'startDateDay' : startNotificationDate.getDate(),
    //             'endDateYear' : endNotificationDate.getFullYear(),
    //             'endDateMonth' : endNotificationDate.getMonth() + 1,
    //             'endDateDay' : endNotificationDate.getDate(),
    //             'filter' : 'All',
    //         },
    //     })
    //     .then((response) => {
    //         // console.log(response)
    //         if((response.data.length != 0) && (notificationData != response.data)) {
    //             setNotificationData(response.data)
    //             setNotifications("Alerts have been triggered: latest alert is " + response.data[0].attack_vector + "!")
    //             setNotificationPressed(false);
    //             console.log("Entered change")
    //         }
    //         console.log(response.data)
    //         console.log(notificationData)
    //     })
    // }

    React.useEffect(() => {
        const interval = setInterval(() => { 
            // notificationPost()
            axios.post('http://127.0.0.1:8000/sdn_communication/attack_notification/',{
            data: { 
                'maxRecords' : 5,
                'startDateYear' : startNotificationDate.getFullYear(),
                'startDateMonth' : startNotificationDate.getMonth() + 1,
                'startDateDay' : startNotificationDate.getDate(),
                'endDateYear' : endNotificationDate.getFullYear(),
                'endDateMonth' : endNotificationDate.getMonth() + 1,
                'endDateDay' : endNotificationDate.getDate(),
                'filter' : 'All',
            },})
            .then((response) => {
                // console.log(response)
                if((response.data.length !== 0) && (notificationData[0].id !== response.data[0].id)) {
                    setNotificationData(response.data)
                    setNotifications("Alerts have been triggered: latest alert is " + response.data[0].attack_vector + "!")
                    setNotificationPressed(false);
                }
            })
        }, 5000);
        return () => {
          clearInterval(interval);
        };
    }, [notificationData, notifications, notificationPressed]);


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleClick}
            >
                { 
                    notificationPressed === false ? 
                    <NotificationImportantIcon /> :
                    <NotificationIcon />
                }
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
            <Typography className={classes.typography}>{notifications}</Typography>
            </Popover>
        </React.Fragment>
    );
}

export default NotificationPopover;