export const RoleListReducer = (
  preState = {
    rolelist: []
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "change_rolelist":
      let newstate = { ...preState };
      newstate.rolelist = payload;
      return newstate;
    default:
      return preState;
  }
};
