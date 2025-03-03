export const CategoriesReducer = (preState = { categories: [] }, action) => {
  let { type, payload } = action;
  switch (type) {
    case "change_categories":
      let newstate = { ...preState };
      newstate.categories = payload;
      return newstate;
    default:
      return preState;
  }
};
