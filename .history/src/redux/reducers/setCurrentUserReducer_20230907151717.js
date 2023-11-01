export const setCurrentUserReducer = (preState={
    roleId:null,username:null,region:null,role:null
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'set_current_roleId_username_region':
            let newstate = {...preState};
            newstate.roleId = payload.roleId;
            newstate.username = payload.username;
            newstate.region = payload.region;
            // console.log(newstate);
            return newstate
        default:
            return preState
    }
   
}