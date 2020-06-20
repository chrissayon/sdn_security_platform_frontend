import { FLOW_AGG_GRAPH_API, PORT_GRAPH_API } from './types';
import axios from 'axios'

export const flowAggGraphRequest = () => dispatch => {
    axios.get('http://10.0.1.10:8000/sdn_communication/flow_agg_diff/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: FLOW_AGG_GRAPH_API,
            payload: data
        }))
}

export const portGraphRequest = () => dispatch => {
    axios.get('http://10.0.1.10:8000/sdn_communication/port_diff/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: PORT_GRAPH_API,
            payload: data
        }))
}