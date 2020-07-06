import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  show: false,
};
const status = actionGenerator("SHOW_MODAL");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return { ...state, show: false };
    case status.success:
      return { ...state, show: action.payload };
    case status.failure:
      return { ...state, show: action.payload };
    default:
      return state;
  }
};