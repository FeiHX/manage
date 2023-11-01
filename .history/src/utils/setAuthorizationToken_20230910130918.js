import axios from "axios"
import { Base64 } from "js-base64";
const setAuthorizationToken = (token) => {
    if(token){
        const en
        axios.defaults.headers.common['Authorization'] = `Iwen ${token}`;

    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}
export default setAuthorizationToken