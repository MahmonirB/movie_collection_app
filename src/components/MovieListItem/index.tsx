//libs
import React from 'react';
import {Text, View} from 'react-native';
// styles
import styles from './styles';
// utility
import {colors} from '../../utilities/styles/variables';

/**
 * @name IMovieData
 */
export interface IMovieData {
  id: string;
  title: string;
  dateOfRelease: string;
  director: string;
}
/**
 * @name IMovieListItem
 */
interface IMovieListItem {
  movieItemData: IMovieItemData;
}
interface IMovieItemData {
  item: IMovieData;
}
const MovieListItem: React.FC<IMovieListItem> = (props: IMovieListItem) => {
  const {movieItemData} = props;
  return (
    <View style={styles.listItemStyle}>
      <Text style={styles.titleStyle}>{movieItemData.item.title}</Text>
      <Text style={styles.subTitle}>
        Release date: {movieItemData.item.dateOfRelease}
      </Text>
      <Text style={styles.subTitle}>
        Director: {movieItemData.item.director}
      </Text>
    </View>
  );
};
export default MovieListItem;
