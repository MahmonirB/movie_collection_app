// libs
import React from 'react';
import {View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
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
  return <View />;
};
export default HomePage;
