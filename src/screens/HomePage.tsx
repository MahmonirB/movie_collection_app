// libs
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
// components
import SearchBox from '../components/SearchBox';
import MovieListItem, {IMovieData} from '../components/MovieListItem';
// styles
import styles from './styleSheet';

/**
 * @interface IHomePage
 */
interface IHomePage {
  navigation?: NavigationStackProp;
}

const HomePage: React.FC<IHomePage> = (props: IHomePage) => {
  const {navigation} = props;
  const [movieData, setMovieData] = useState<Array<IMovieData>>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    renderToGetData();
  }, []);
  const renderToGetData = () => {};
  /**
   * @name renderItem
   * @param param0
   */
  const renderMovieItem = (movieItemData: IMovieData) => {
    console.log(movieItemData);
    return <MovieListItem movieItemData={movieItemData} />;
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <SearchBox onChange={(searchedValue) => setSearchText(searchedValue)} />
      {/* <ScrollView> */}
      <FlatList
        data={[
          {id: '1', title: 'aa', dateOfRelease: '12/3', director: 'samadi'},
          {id: '2', title: 'aa', dateOfRelease: '12/3', director: 'samadi'},
          {id: '3', title: 'aa', dateOfRelease: '12/3', director: 'samadi'},
        ]}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
export default HomePage;
