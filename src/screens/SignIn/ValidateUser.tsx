// libs
import React, { useState } from 'react';
import { ToastAndroid, View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { NavigationScreenComponent } from 'react-navigation';
// redux
import { addToken, removeToken } from 'store/actions/actionAuth';
// components
import { Button, TextBox } from 'components';
import axios from 'utilities/AxiosInstance';
// styles
import styles from './styles';
/**
 * @interface IValidateUser
 */
interface IValidateUser {
  navigation?: NavigationStackProp;
}
const ValidateUser: NavigationScreenComponent<any, IValidateUser> = (
  props: IValidateUser,
) => {
  const { navigation } = props;
  const userName = navigation?.getParam('userName', '');
  const [validationCode, setValidationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  /**
   * @name validateUser
   * @description validate user to sign in
   */
  const validateUser = async () => {
    setLoading(true);
    const bodyData = {
      username: userName,
      password: validationCode,
    };
    try {
      const response = await axios.post('/user/auth-token', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setLoading(false);
        await AsyncStorage.setItem('token', response.data.token);
        navigation?.navigate('HomePage');
      } else {
        ToastAndroid.show('Error in request', 5000);
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Error in fetch data ' + error.response.status, 5000);
    }
  };
  return (
    <View style={styles.usernameContainer}>
      <View style={styles.inputStyle}>
        <Text style={styles.titleStyle}>Enter password</Text>
        <TextBox
          onChange={(value) => setValidationCode(value)}
          placeholderText="Enter validation code"
        />
      </View>
      <Button
        active={validationCode !== ''}
        loading={loading}
        type="block"
        title="Sign in"
        onClick={validateUser}
      />
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
