// libs
import React, {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import styles from './styles';
import axios from '../../utilities/ AxiosInstance';
import {NavigationStackProp} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
// components
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

/**
 * @interface IValidateUser
 */
interface IValidateUser {
  navigation?: NavigationStackProp;
}
const ValidateUser: React.FC<IValidateUser> = (props: IValidateUser) => {
  const {navigation} = props;
  const userName = navigation?.getParam('userName', '');
  const [validationCode, setValidationCode] = useState<string>('');
  /**
   * @name validateUser
   * @description validate user to sign in
   */
  const validateUser = () => {
    try {
      axios
        .post(
          '/user/auth-token',
          {
            username: userName,
            password: validationCode,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
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
export default ValidateUser;
