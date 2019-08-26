import { FLOW_AGG_GRAPH_API, PORT_GRAPH_API } from '../actions/types';

const initialState = {
    flowAggGraphData : [{}],
    portGraphData : [{}]
};


export default function(state = initialState, action) {
    switch(action.type) {
        case FLOW_AGG_GRAPH_API:
            return {
                ...state,
                flowAggGraphData: action.payload
            }
        case PORT_GRAPH_API:
            return {
                ...state,
                portGraphData: action.payload
            }
        default:
            return state;
    }
}