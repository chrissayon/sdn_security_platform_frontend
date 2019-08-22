import { DESC_API } from './types';
import axios from 'axios'

export const descRequest = () => dispatch => {
    axios.get('http://127.0.0.1:8000/sdn_communication/desc_stats/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: DESC_API,
            payload: data
        }))
}

export const portStatsRequest = () => dispatch => {
    axios.get('http://127.0.0.1:8000/sdn_communication/port_stats/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: DESC_API,
            payload: data
        }))
}

export const flowStatsRequest = () => dispatch => {
    axios.get('http://127.0.0.1:8000/sdn_communication/port_stats/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: DESC_API,
            payload: data
        }))
}

export const flowAggStatsRequest = () => dispatch => {
    axios.get('http://127.0.0.1:8000/sdn_communication/flow_agg_diff/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: DESC_API,
            payload: data
        }))
}