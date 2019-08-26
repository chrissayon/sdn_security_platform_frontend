import { combineReducers } from 'redux';
import getReducer from './getReducer';
import graphReducer from './graphReducer';

export default combineReducers({
    get: getReducer,
    graphData : graphReducer,
});