import {ADD_TOKEN, REMOVE_TOKEN} from './types';

export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    token: token,
  };
};
export const removeToken = () => {
  return {
    type: REMOVE_TOKEN,
  };
};
