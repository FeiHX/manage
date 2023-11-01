import axios from "axios"
import {Baseq}
const setAuthorizationToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Iwen ${token}`;

    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}
export default setAuthorizationToken