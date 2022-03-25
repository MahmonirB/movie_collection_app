// libs
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  View,
  Text,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenComponent } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
// components
import axios from '../../utilities/ AxiosInstance';
import { SearchBox, MovieListItem } from '../../components';
import { removeToken } from '../../store/actions/actionAuth';
import { IMovieItemData, IMovieData } from '../../components/MovieListItem';
// styles
import styles from './styleSheet';
import { colors } from '../../utilities/styles/variables';
import useDebounce from '../../hooks/useDebounce';

/**
 * @interface IMovieResponse
 */
export interface IMovieResponse {
  count?: number;
  results?: Array<IMovieData>;
}

/**
 * @interface IResponseDTO
 */
export interface IResponseDTO {
  data: IMovieResponse;
  status: number;
}

/**
 * @interface IAuth
 */
interface IAuth {
  token: string;
}

/**
 * @interface IHomePage
 */
interface IHomePage {
  navigation?: NavigationStackProp;
  removeToken: () => {};
  auth?: IAuth;
}

const limitNum = 20; // number of page data in each retrive
const ITEM_HEIGHT = 170; // movie item height

const HomePage: NavigationScreenComponent<any, IHomePage> = (
  props: IHomePage,
) => {
  const { navigation } = props;
  const [movieData, setMovieData] = useState<IMovieResponse>({});
  const [searchText, setSearchText] = useState<string>('');
  const [hasMore, setHasMore] = useState(false);
  const offset = useRef(1);

  const debouncedSearchText = useDebounce(searchText, 700);

  useEffect(() => {
    offset.current = 1;
    renderToGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  /**
   * @name renderToGetData
   * @description get movies data from IMD service
   */
  const renderToGetData = async () => {
    try {
      const responseData = await axios.get(
        `/movie/?limit=${limitNum}&offset=${offset.current}&search=${searchText}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (responseData?.status && responseData?.status === 200) {
        setMovieData(responseData.data);
      } else {
        ToastAndroid.show('Error in request', 5000);
      }
    } catch (error) {
      ToastAndroid.show(`Error in fetch data ${error.response.status}`, 5000);
    }
  };

  /**
   * @name exitAccout
   */
  async function exitAccout() {
    props.removeToken();
    await AsyncStorage.removeItem('token');
    navigation?.replace('MainSignPage');
  }

  /**
   * @name renderItem
   * @param param0
   */
  const renderItemFunction = (movieItemData: IMovieItemData) => (
    <MovieListItem key={movieItemData.item.id} movieItemData={movieItemData} />
  );

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
      <View style={styles.searchContainer}>
        <SearchBox onChange={(searchedValue) => setSearchText(searchedValue)} />
      </View>
      <FlatList
        data={movieData.results}
        renderItem={renderItemFunction}
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
      <View style={styles.footerStyle}>
        <TouchableHighlight
          onPress={() => navigation?.navigate('MapScreen')}
          underlayColor="white"
          style={styles.menuItemStyle}
        >
          <>
            <Icon name="map" size={20} />
            <Text>Map Screen</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation?.navigate('CategoryList')}
          underlayColor="white"
          style={styles.menuItemStyle}
        >
          <>
            <Icon name="pocket" size={20} />
            <Text>Categories List</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="white"
          onPress={exitAccout}
          style={styles.menuItemStyle}
        >
          <>
            <Icon name="log-out" size={20} />
            <Text>Exit</Text>
          </>
        </TouchableHighlight>
      </View>
    </View>
  );
};
HomePage.navigationOptions = () => ({
  header: null,
});
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    removeToken: () => {
      dispatch(removeToken());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
