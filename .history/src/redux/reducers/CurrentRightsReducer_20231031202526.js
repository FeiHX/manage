export const CurrentRightsReducer = (preState={
    rights:[]
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'change_rights':
            let newstate = {...preState};
            newstate.rights = payload;
            return newstate
        default:
            return preState
    }
   
}