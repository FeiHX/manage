export const RoleIdReducer = (preState={
    roleId:null,username:null
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'change_roleId_username':
            let newstate = {...preState};
            newstate.roleId = payload.roleId;
            newstate.username = payload.username;
            // console.log(newstate);
            return newstate
        default:
            return preState
    }
   
}