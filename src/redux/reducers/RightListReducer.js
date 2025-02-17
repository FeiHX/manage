export const RightListReducer = (preState={
    rightlist:[]
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'change_rightlist':
            let newstate = {...preState};
            newstate.rightlist = payload;
            return newstate
        default:
            return preState
    }
   
}