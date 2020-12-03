// libs
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import {addToken, removeToken} from '../../store/actions/actionSet';
import {NavigationStackProp} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
// assets
import logo from '../../../assets/images/logo.png';
// styles
import styles from '../styleSheet';

/**
 * @interface IAuthPage
 */
interface IAuthPage {
  navigation?: NavigationStackProp;
}
const AuthPage: React.FC<IAuthPage> = (props: IAuthPage) => {
  const {navigation} = props;
  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * @name checkAuthentication
   * @description navigate to proper rout
   */
  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      if (token == null || token === '') {
        navigation?.navigate('MainSignPage');
      } else {
        navigation?.navigate('HomePage');
      }
    }, 2000);
  };
  return (
    <View style={styles.mainContainer}>
      <Image resizeMode="contain" source={logo} style={styles.logoStyle} />
    </View>
  );
};
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
