import { DESC_API, PORT_STATS_API, FLOW_STATS_API, FLOW_AGG_STATS_API } from '../actions/types';

const initialState = {
    descData : {},
    portData : {},
    flowData : {},
    flowAggData : {}
};


export default function(state = initialState, action) {
    switch(action.type) {
        case DESC_API:
            return {
                ...state,
                descData : action.payload
            }
        case FLOW_AGG_STATS_API:
            return {
                ...state,
                flowAggData: action.payload
            }
        case PORT_STATS_API:
            return {
                ...state,
                portData: action.payload
            }
        case FLOW_STATS_API:
            return {
                ...state,
                flowData: action.payload
            }
        default:
            return state;
    }
}