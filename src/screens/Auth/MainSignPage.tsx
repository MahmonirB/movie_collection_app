// libs
import React from 'react';
import {View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
// components
import Button from '../../components/Button';
// styles
import styles from '../MainPanel/styleSheet';

/**
 * @interface IMainSignPage
 */
interface IMainSignPage {
  navigation?: NavigationStackProp;
}
const MainSignPage: React.FC<IMainSignPage> = (props: IMainSignPage) => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <Button
        type="block"
        title="Sign in"
        onClick={() => navigation?.navigate('EnterUserName')}
        style={styles.marginBottom}
      />
      <Button type="block" active={false} title="Sign up" onClick={() => {}} />
    </View>
  );
};
export default MainSignPage;
