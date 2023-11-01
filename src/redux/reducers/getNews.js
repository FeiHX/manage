export const getNews = (preState={
    news:null
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'get_news':
            let newstate = {...preState};
            newstate.news = payload;
            return newstate
        default:
            return preState
    }
   
}