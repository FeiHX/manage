import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import IndexRouter from './router/IndexRouter.js'
import {persistor, store}from './redux/store.js'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate  persistor={persistor}>
                <IndexRouter></IndexRouter>
            </PersistGate>
        </Provider>  
    )
};
