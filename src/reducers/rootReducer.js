import { combineReducers } from 'redux';
import getReducer from './getReducer';
import graphReducer from './graphReducer';
import notificationReducer from './notificationReducer'

export default combineReducers({
    get: getReducer,
    graphData : graphReducer,
    notificationData: notificationReducer
});