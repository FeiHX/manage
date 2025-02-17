export const CurrentUserReducer = (preState={
    roleId:null,username:null,region:null,role:null
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'change_currentuser':
            let newstate = {...preState};
            newstate.roleId = payload.roleId;
            newstate.username = payload.username;
            newstate.region = payload.region;
            newstate.role = payload.role;
            return newstate
        default:
            return preState
    }
   
}