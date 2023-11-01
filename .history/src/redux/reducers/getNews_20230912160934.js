export const getNews = (preState=[
    news:
],action) => {
    // console.log(action)
    let {type,payload} = action;
    switch (type) {
        case 'get_news':
            let newstate = {...preState};
            newstate = payload;
            return newstate
        default:
            return preState
    }
   
}