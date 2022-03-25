// libs
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
// components
import axios from '../../../utilities/ AxiosInstance';
import {
  MovieListItem,
  IMovieItemData,
} from '../../../components/MovieListItem';
import { IMovieResponse, IResponseDTO } from '../HomePage';
// styles
import styles from './styles';
import { colors } from '../../../utilities/styles/variables';

/**
 * @interface ICategoryMovie
 */
interface ICategoryMovie {
  category: any;
}

const limitNum = 20; //number of moview in each page
const ITEM_HEIGHT = 170;

const CategoryMovie: React.FC<ICategoryMovie> = (props: ICategoryMovie) => {
  const categoryName = useRef<string>('');
  const [movieData, setMovieData] = useState<IMovieResponse>({});
  const [hasMore, setHasMore] = useState(false);
  const offset = useRef(1);
  const mountStatus = useRef(true);

  useEffect(() => {
    categoryName.current = props.category.categoryItem;
    renderToGetData();
    return () => (mountStatus.current = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @name renderToGetData
   * @description get movies data from IMD service
   */
  const renderToGetData = async () => {
    try {
      const responseData: IResponseDTO = await axios.get(
        `/movie/?tags=${categoryName.current}&limit=${limitNum}&offset=${offset.current}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (responseData.status === 200) {
        mountStatus.current && setMovieData(responseData.data);
      } else {
        ToastAndroid.show('Error in request', 5000);
      }
    } catch (error) {
      ToastAndroid.show(`Error in fetch data ${error.response.status}`, 5000);
    }
  };

  /**
   * @name isEmpty
   * @param inputObj
   */
  function isEmpty(inputObj: Object) {
    return (
      Object.keys(inputObj).length === 0 && inputObj.constructor === Object
    );
  }

  /**
   * @name renderItem
   * @param param0
   */
  const renderMovieItem = (movieItemData: IMovieItemData) => {
    return <MovieListItem movieItemData={movieItemData} />;
  };

  /**
   * @name onEndReach
   * @async
   * @description onEndReach trigger when scroll reach to end and get next page
   */
  const onEndReach = async () => {
    setHasMore(true);
    if (movieData.count > offset.current + limitNum) {
      offset.current = offset.current + limitNum;
      await renderToGetData();
    }
    setHasMore(false);
  };

  /**
   * @name pullToRefresh
   * @description pullToRefresh trigger to get previous page of data
   */
  const pullToRefresh = () => {
    if (offset.current >= limitNum) {
      offset.current = offset.current - limitNum;
      renderToGetData();
    }
  };

  return (
    <View style={styles.homeContainer}>
      <View>
        {!isEmpty(movieData) && !movieData.count ? (
          <Text>There is no movie in this category</Text>
        ) : null}
      </View>
      <FlatList
        data={movieData.results}
        renderItem={renderMovieItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.1}
        maxToRenderPerBatch={4}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={pullToRefresh}
            colors={[colors.activeBlue]}
            tintColor={colors.activeBlue}
            size={40}
          />
        }
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
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
