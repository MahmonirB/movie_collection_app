import { ADD_TOKEN, REMOVE_TOKEN } from '../actions/types';

const initialState = {
  token: '',
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};
