// libs
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationScreenComponent } from 'react-navigation';
// components
import { Button, TextBox } from '../../components';

/**
 * @interface IEnterUserName
 */
interface IEnterUserName {
  navigation?: NavigationStackProp;
}
const EnterUserName: NavigationScreenComponent<any, IEnterUserName> = (
  props: IEnterUserName,
) => {
  const { navigation } = props;
  const [userName, setUserName] = useState<string>('');
  return (
    <View style={styles.usernameContainer}>
      <View style={styles.inputStyle}>
        <Text style={styles.titleStyle}>Enter user Name</Text>
        <TextBox
          onChange={(value) => setUserName(value)}
          placeholderText="Enter user name"
        />
      </View>
      <Button
        type="block"
        title="Next"
        active={userName !== ''}
        onClick={() => navigation?.navigate('ValidateUser', { userName })}
      />
    </View>
  );
};
export default EnterUserName;
