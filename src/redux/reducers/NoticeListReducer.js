export const NoticeListReducer = (
  preState = {
    noticelist: []
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "change_noticelist":
      let newstate = { ...preState };
      newstate.noticelist = payload;
      return newstate;
    default:
      return preState;
  }
};
