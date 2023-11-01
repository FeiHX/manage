export const getCategories = (preState={
    categories:null
},action) => {
    // console.log(action)
    let {type,payload} = action;
    switch (type) {
        case 'get_categoriess':
            let newstate = {...preState};
            newstate.categories = payload;
            return newstate
        default:
            return preState
    }
   
}