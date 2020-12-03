// libs
import React, {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import styles from './styles';
import {NavigationStackProp} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {addToken, removeToken} from '../../store/actions/actionSet';
import {NavigationScreenComponent} from 'react-navigation';
// components
import axios from '../../utilities/ AxiosInstance';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

/**
 * @interface IValidateUser
 */
interface IValidateUser {
  navigation?: NavigationStackProp;
}
const ValidateUser: NavigationScreenComponent<any, IValidateUser> = (
  props: IValidateUser,
) => {
  const {navigation} = props;
  const userName = navigation?.getParam('userName', '');
  const [validationCode, setValidationCode] = useState<string>('');
  /**
   * @name validateUser
   * @description validate user to sign in
   */
  const validateUser = () => {
    const bodyData = {
      username: userName,
      password: validationCode,
    };
    try {
      axios
        .post('/user/auth-token', bodyData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(async (response: any) => {
          await AsyncStorage.setItem('token', response.data.token);
          navigation?.navigate('HomePage');
        })
        .catch((error: any) => {
          ToastAndroid.show(error, 5000);
        });
    } catch (error) {}
  };
  return (
    <View style={styles.usernameContainer}>
      <View style={styles.inputStyle}>
        <TextBox
          onChange={(value) => setValidationCode(value)}
          placeholderText="Enter validation code"
        />
      </View>
      <Button type="block" title="Next" onClick={validateUser} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidateUser);
