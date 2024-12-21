export const ChatMessageReducer = (preState={
    chatmessagelist:[]
},action) => {
    
    let {type,payload} = action;
    switch (type) {
        case 'change_chatmessagelist':
            let newstate = {...preState};
            newstate.chatmessagelist = payload;
            return newstate
        default:
            return preState
    }
   
}