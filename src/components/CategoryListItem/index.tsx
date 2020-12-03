//libs
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
// styles
import styles from './styles';

/**
 * @name ICategoryData
 */
export interface ICategoryData {
  id?: number;
  name: string;
}
/**
 * @interface ICategoryItemData
 */
export interface ICategoryItemData {
  item: ICategoryData;
}
/**
 * @name ICategoryListItem
 */
interface ICategoryListItem {
  CategoryItemData: ICategoryItemData;
  onClick: () => void;
}
const CategoryListItem: React.FC<ICategoryListItem> = (
  props: ICategoryListItem,
) => {
  const {CategoryItemData, onClick} = props;
  return (
    <TouchableOpacity onPress={onClick} style={styles.listItemStyle}>
      <Text style={styles.titleStyle}>{CategoryItemData.item.name}</Text>
    </TouchableOpacity>
  );
};
CategoryListItem.defaultProps = {
  onClick: () => {},
  CategoryItemData: {
    item: {
      name: 'unkhnown',
    },
  },
};
export default CategoryListItem;
