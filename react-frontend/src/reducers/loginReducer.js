const defaultState = {
  token: null,
};

export default function access_token(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.value;
    case "LOGIN_FAILURE":
      return action.value;
    default:
      return state;
  }
}