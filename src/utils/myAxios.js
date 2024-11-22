import axios from "axios";
import { Base64 } from "js-base64";
import { notification } from "antd";

const Axios = axios.create()
//请求拦截器
Axios.interceptors.request.use(
    (config) => {
        const _encoded = Base64.encode(`${localStorage.jwToken}`)
        config.headers.Authorization = localStorage.jwToken && 'Bearer ' + `${_encoded}`;
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)
//响应拦截器
Axios.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        notification.info({
            message: `${error.response.data}`,
            description: `即将重定向至登录页`,
            placement: 'bottomRight',
            duration:3,
        })
        window.location.hash="/login"
        localStorage.removeItem('jwToken');
        localStorage.removeItem('expiresIn')
        return Promise.reject(error);
    }
)

export default Axios;
