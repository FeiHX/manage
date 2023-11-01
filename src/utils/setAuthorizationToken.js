import axios from "axios"
import { Base64 } from "js-base64";
const setAuthorizationToken = (token) => {
    if(token){
        const _encoded = Base64.encode(`${token}`)
        
        axios.defaults.headers.common['Authorization'] = `Basic ${_encoded}`;

    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}
export default setAuthorizationToken