export const getCategories = (preState={
    categories:null
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'get_categories':
            let newstate = {...preState};
            newstate.categories = payload;
            return newstate
        default:
            return preState
    }
   
}