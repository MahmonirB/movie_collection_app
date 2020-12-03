//libs
import React from 'react';
import {Text, View} from 'react-native';
// styles
import styles from './styles';

/**
 * @name IMovieData
 */
export interface IMovieData {
  id?: number;
  title?: string;
  dateOfRelease?: string;
  director?: string;
  rating?: number;
}
/**
 * @interface IMovieItemData
 */
export interface IMovieItemData {
  item: IMovieData;
}
/**
 * @name IMovieListItem
 */
interface IMovieListItem {
  movieItemData: IMovieItemData;
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
MovieListItem.defaultProps = {
  movieItemData: {
    item: {
      title: 'unkhnown',
      dateOfRelease: 'date',
      director: 'unkhnown director',
      rating: 0,
    },
  },
};
export default MovieListItem;
