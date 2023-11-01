export const RoleIdReducer = (preState={
    roleId:null,username:null,region
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'set_current_roleId_username_region':
            let newstate = {...preState};
            newstate.roleId = payload.roleId;
            newstate.username = payload.username;
            // console.log(newstate);
            return newstate
        default:
            return preState
    }
   
}