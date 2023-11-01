import { legacy_createStore,combineReducers } from 'redux';
import { CollApsedReducer } from './reducers/CollapsedReducer';
import { LoadingReducer } from './reducers/LoadingReducer';

const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer,
})


const store = legacy_createStore(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

//手写简易的createStore
let createKewinStore = function(reducer) {
    let list = [];
    let state = reducer(undefined,{});
    function subscribe(callback) {
        list.push(callback)
    }
    function dispatch(action) {
        state = reducer(state,action)
        for(let i in list) {
            list[i] && list[i]();
        }
    }
    function getState() {
        return state 
    }
    return{
        subscribe,dispatch,getState
    }
}
export default store