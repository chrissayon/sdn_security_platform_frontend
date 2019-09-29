import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import NotificationIcon from '@material-ui/icons/Notifications'
import { connect } from 'react-redux';
import { notificationRequests } from '../../../actions/alertRequests'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function NotificationPopover(props) {
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);

function handleClick(event) {
    setAnchorEl(event.currentTarget);
    // dispatch({ type: notificationRequests })
    props.notificationRequests();
};

function handleClose() {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

console.log(props.notifications);
let checking = (props.notifications.machineLearningTriggered === undefined)
console.log(checking)

return (
    <React.Fragment>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleClick}
        >
            <NotificationIcon />
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
            { 
                props.notifications.machineLearningTriggered === undefined ? (
                    null
                ) : (
                    <Typography className={classes.typography}>{props.notifications.machineLearningTriggered[0].attack_type}</Typography>
                    //<Typography className={classes.typography}>Notifications</Typography>
                )
            }
        </Popover>
    </React.Fragment>
);
}

const mapStateToProps = function(state) {
    return {
        notifications: state.notificationData
    }
}
  
  //export default NotificationPopover;
export default connect(mapStateToProps,{notificationRequests})(NotificationPopover);