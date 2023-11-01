export const UserListReducer = (preState={
    userList:null
},action) => {
    // console.log(action)
    let {type,payload} = action;
    switch (type) {
        case 'change_userList':
            let newstate = {...preState};
            newstate.userList = payload;
            return newstate
        default:
            return preState
    }
   
}