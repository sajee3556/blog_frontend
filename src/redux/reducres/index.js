import {combineReducers} from 'redux';
import ContentReducer from './ContentReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    UserReducer : UserReducer,
    ContentReducer : ContentReducer
});
