import {  } from '../actions/types';

const initialState = {
    
};

export default function(state = initialState, action) {
    switch(action.type) {
        case NOTIFICATION_ALERT:
            return {
                ...state,
                machineLearningTriggered : action.payload
            }
        default:
            return state;
    }
}