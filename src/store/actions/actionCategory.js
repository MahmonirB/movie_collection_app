import {CATEGORY_ITEM} from './types';

export const modifyCategoryItem = (categoryItem) => {
  return {
    type: CATEGORY_ITEM,
    categoryItem: categoryItem,
  };
};
