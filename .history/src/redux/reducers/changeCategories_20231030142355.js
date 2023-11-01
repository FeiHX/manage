export const changeCategories = (preState=
    {roles:[]}
,action) => {
  // console.log(action)
  let {type,payload} = action;
  switch (type) {
      case 'change_Categories':
          let newstate = {...preState};
          newstate.roles = payload;
          return newstate
      default:
          return preState
  }
 
}