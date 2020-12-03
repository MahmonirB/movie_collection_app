// libs
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  View,
  Text,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationScreenComponent} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
// components
import axios from '../../utilities/ AxiosInstance';
import SearchBox from '../../components/SearchBox';
import {addToken, removeToken} from '../../store/actions/actionAuth';
import MovieListItem, {
  IMovieItemData,
  IMovieData,
} from '../../components/MovieListItem';
// styles
import styles, {underlayColor} from './styleSheet';

/**
 * @interface IHomePage
 */
interface IHomePage {
  navigation?: NavigationStackProp;
  removeToken: () => {};
  auth?: any;
}

const HomePage: NavigationScreenComponent<any, IHomePage> = (
  props: IHomePage,
) => {
  const {navigation} = props;
  const [movieData, setMovieData] = useState<Array<IMovieData>>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    renderToGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  /**
   * @name renderToGetData
   * @description get movies data from IMD service
   */
  const renderToGetData = () => {
    setHasMore(true);
    try {
      axios
        .get(`/movie/?limit=${limit}&search=${searchText}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((responseData) => {
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
  /**
   * @name exitAccout
   */
  async function exitAccout() {
    props.removeToken();
    await AsyncStorage.removeItem('token');
    navigation?.replace('MainSignPage');
  }
  return (
    <View style={styles.homeContainer}>
      <View style={styles.searchContainer}>
        <SearchBox onChange={(searchedValue) => setSearchText(searchedValue)} />
      </View>
      <FlatList
        data={movieData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={renderToGetData}
        onEndReachedThreshold={0.7}
      />
      <View>{hasMore && <ActivityIndicator color="blue" size={30} />}</View>
      <View style={styles.footerStyle}>
        <TouchableHighlight
          onPress={() => navigation?.navigate('CategoryList')}
          underlayColor={underlayColor}
          style={styles.menuItemStyle}>
          <>
            <Icon name="pocket" size={20} />
            <Text>Categories List</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight onPress={exitAccout} style={styles.menuItemStyle}>
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
    addToken: (tokenNumber: string) => {
      dispatch(addToken(tokenNumber));
    },
    removeToken: () => {
      dispatch(removeToken());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
