import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import IndexRouter from './router/IndexRouter.js'
import {persistor, store}from './redux/store.js'
import Login from './views/login/Login';
import News from './views/news/News';
import Detail from './views/news/Detail'
import NewsSandBox from './views/sandbox/NewsSandBox.js'
import { Routes, Route, HashRouter } from 'react-router-dom';
export default function App() {
    return (
        <Provider store={store}>
             <PersistGate  persistor={persistor}>
                <HashRouter>
                    <IndexRouter></IndexRouter>
                </HashRouter> 
             </PersistGate>
         </Provider>  
    )
    // return (
    //     <Routes>
    //         {/* <Route path='/invalid/route' element={<Login description={['/api/users','/otherlogin','临时登录','']}/>}/>
    //         <Route path="/*" element={<News/>}/>
    //         <Route path="/detail" element={<Detail />} /> */}
    //         <Route path="/login" element={<Login description={['/api/users','/otherlogin','临时登录','']}/>}/>
    //         <Route path="/otherlogin" element={<Login description={['/api/users/otherlogin','/login','返回登录','此页面登录JWT失效时间为60秒']}></Login>}/>
    //         <Route path="/news" element={<News/>}/>
    //         <Route path="/detail/:id" element={<Detail/>}/>
    //         <Route path="/*" element={<NewsSandBox/>}></Route>
    //     </Routes>



    // )
};
