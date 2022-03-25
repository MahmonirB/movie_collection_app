// libs
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationScreenComponent } from 'react-navigation';
// components
import { Button } from 'components';
// styles
import styles from './styles';

/**
 * @interface IMainSignPage
 */
interface IMainSignPage {
  navigation?: NavigationStackProp;
}
const MainSignPage: NavigationScreenComponent<any, IMainSignPage> = (
  props: IMainSignPage,
) => {
  const { navigation } = props;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleLogin}>Join to search movie</Text>
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
MainSignPage.navigationOptions = () => ({
  header: null,
});
export default MainSignPage;
