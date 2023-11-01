import React from 'react'
// import IndexRouter from './router/IndexRouter'
import { BrowserRouter} from 'react-router-dom'
import NewsSandBox from './views/sandbox/NewsSandBox'
import Redirect from './router/Redirect'
import LoginRoute from './router/LoginRoute'
import { Provider } from 'react-redux'
// import store from './redux/store'

import rootReducer from './redux/reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore,applyMiddleware} from 'redux'
import setAuthorizationToken from './utils/setAuthorizationToken';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'
import NewsRoute from './router/NewsRoute'
import DetailRoute from './router/DetailRoute'
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['LoadingReducer'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = legacy_createStore(persistedReducer,composeWithDevTools(applyMiddleware(logger,thunk)));
const persistor = persistStore(store)
// localStorage.jwtToken && setAuthorizationToken(localStorage.jwtToken)

export default function App() {
  function AuthComponent({children}) {
    const isLogin = localStorage.getItem('jwtToken')
    console.log(isLogin)
    return isLogin?children:<Redirect to='/login'></Redirect>
}
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
              <LoginRoute></LoginRoute>
              {/* <NewsRoute></NewsRoute>
              <DetailRoute></DetailRoute> */}
              {/* <NewsSandBox></NewsSandBox> */}
              <AuthComponent><NewsSandBox></NewsSandBox></AuthComponent>
          </BrowserRouter>
        </PersistGate>
    </Provider>  
      
   
    
  )
}
