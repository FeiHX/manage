import { combineReducers} from 'redux'
import  auth  from './auth.js'
import { CollApsedReducer } from './CollapsedReducer';
import { LoadingReducer } from './LoadingReducer';
import { setCurrentUserReducer } from './setCurrentUserReducer.js';
import { CurrentRightsReducer } from './CurrentRightsReducer.js';
import { RolesReducer } from './RolesReducer.js';
import { UserListReducer } from './UserListReducer.js';
import { getNews } from './getNews.js';
import {getC}
const rootReducer = combineReducers({
    auth,
    CollApsedReducer,
    LoadingReducer,
    setCurrentUserReducer,
    CurrentRightsReducer,
    RolesReducer,
    getNews,
    getCategor
    
})
export default rootReducer
