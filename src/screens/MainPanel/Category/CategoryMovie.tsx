// libs
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {NavigationStackProp} from 'react-navigation-stack';
import {NavigationScreenComponent} from 'react-navigation';

/**
 * @interface ICategoryMovie
 */
interface ICategoryMovie {
  navigation?: NavigationStackProp;
}
const CategoryMovie: NavigationScreenComponent<any, ICategoryMovie> = (
  props: ICategoryMovie,
) => {
  const {navigation} = props;
  return <View style={styles.usernameContainer}></View>;
};
export default CategoryMovie;
