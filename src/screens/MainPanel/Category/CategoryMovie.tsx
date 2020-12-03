// libs
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, ToastAndroid, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {connect} from 'react-redux';
// components
import axios from '../../../utilities/ AxiosInstance';
import MovieListItem, {
  IMovieItemData,
  IMovieData,
} from '../../../components/MovieListItem';
// styles
import styles from './styles';

/**
 * @interface ICategoryMovie
 */
interface ICategoryMovie {
  category: any;
}

const CategoryMovie: React.FC<ICategoryMovie> = (props: ICategoryMovie) => {
  const categoryName = useRef<string>('');
  const [movieData, setMovieData] = useState<Array<IMovieData>>([]);
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    categoryName.current = props.category.categoryItem;
    renderToGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * @name renderToGetData
   * @description get movies data from IMD service
   */
  const renderToGetData = () => {
    setHasMore(true);
    try {
      axios
        .get(`/movie/?tags=${categoryName.current}&limit=${limit}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((responseData) => {
          console.log(responseData.data);
          setMovieData(responseData.data.results);
          setLimit(limit + 20);
          setHasMore(false);
        })
        .catch((error) => {
          ToastAndroid.show(
            `Error in fetch data ${error.response.status}`,
            5000,
          );
        });
    } catch (error) {
      setHasMore(false);
      ToastAndroid.show('Network Error in fetch data', 5000);
    }
  };
  /**
   * @name renderItem
   * @param param0
   */
  const renderMovieItem = (movieItemData: IMovieItemData) => {
    return <MovieListItem movieItemData={movieItemData} />;
  };
  return (
    <View style={styles.homeContainer}>
      <FlatList
        data={movieData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={renderToGetData}
        onEndReachedThreshold={0.7}
      />
      <View>{hasMore && <ActivityIndicator color="blue" size={30} />}</View>
    </View>
  );
};
const mapStateToProps = (state: any) => {
  return {
    category: state.category,
  };
};
export default connect(mapStateToProps)(CategoryMovie);
