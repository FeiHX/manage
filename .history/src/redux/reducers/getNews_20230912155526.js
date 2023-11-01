export const getNews = (preState=[
    
],action) => {
    // console.log(action)
    let {type,payload} = action;
    switch (type) {
        case 'change_rights':
            let newstate = {...preState};
            newstate = payload;
            return newstate
        default:
            return preState
    }
   
}