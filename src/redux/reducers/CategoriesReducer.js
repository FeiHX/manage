export const CategoriesReducer = (preState = {categories: null}, action) => {
    let {type,payload} = action;
    switch (type) {
        case 'change_categories':
            let newstate = {...preState};
            newstate.categories = payload;
            return newstate
        default:
            return preState
    }
}
