// libs
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {NavigationStackProp} from 'react-navigation-stack';
// components
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

/**
 * @interface IEnterUserName
 */
interface IEnterUserName {
  navigation?: NavigationStackProp;
}
const EnterUserName: React.FC<IEnterUserName> = (props: IEnterUserName) => {
  const {navigation} = props;
  const [userName, setUserName] = useState<string>('');
  return (
    <View style={styles.usernameContainer}>
      <View style={styles.inputStyle}>
        <TextBox
          onChange={(value) => setUserName(value)}
          placeholderText="Enter user name"
        />
      </View>
      <Button
        type="block"
        title="Next"
        onClick={() => navigation?.navigate('ValidateUser', {userName})}
      />
    </View>
  );
};
export default EnterUserName;
