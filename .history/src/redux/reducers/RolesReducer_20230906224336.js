export const RolesReducer = (preState=
      {roles:[]}
,action) => {
    // console.log(action)
    let {type,payload} = action;
    switch (type) {
        case 'change_roles':
            let newstate = {...preState};
            newstate.roles = payload;
            return newstate
        default:
            return preState
    }
   
}