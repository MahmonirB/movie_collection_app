// libs
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {NavigationStackProp} from 'react-navigation-stack';
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
  return (
    <View style={styles.usernameContainer}>
      <View style={styles.inputStyle}>
        <TextBox placeholderText="Enter validation code" />
      </View>
      <Button
        type="block"
        title="Next"
        onClick={() => navigation?.navigate('HomePage')}
      />
    </View>
  );
};
export default ValidateUser;
