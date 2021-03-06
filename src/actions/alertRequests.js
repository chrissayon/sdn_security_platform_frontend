import { NOTIFICATION_ALERT } from './types';
import axios from 'axios'

export const notificationRequests = () => dispatch => {
    axios.get('http://127.0.0.1:8000/sdn_communication/attack_notification/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: NOTIFICATION_ALERT,
            payload: data
        }))
}