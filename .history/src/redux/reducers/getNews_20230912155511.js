export const getNews = (preState={
    rights:[]
},action) => {
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