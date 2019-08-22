import { FETCH_POSTS, NEW_POST } from './types';
import axios from 'axios'

export const fetchPosts = () => dispatch => {
    console.log('fetching')

    axios.get('http://127.0.0.1:8000/sdn_communication/desc_stats/')
        .then((response) => response.data)
        .then(data => dispatch({
            type: FETCH_POSTS,
            payload: data
        }))
}