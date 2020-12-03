import {CATEGORY_ITEM} from '../actions/types';

const initialState = {
  categoryItem: '',
};
export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_ITEM:
      return {
        ...state,
        categoryItem: action.categoryItem,
      };
    default:
      return state;
  }
};
