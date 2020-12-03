//libs
import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// styles
import styles from './styles';
// utility
import {colors} from '../../utilities/styles/variables';

/**
 * @name ISearchBox
 */
interface ISearchBox {
  onChange?: (arg0: string) => void;
}
const SearchBox: React.FC<ISearchBox> = (props: ISearchBox) => {
  const {onChange} = props;
  return (
    <View style={styles.searchContainer}>
      <Icon name={'search'} size={15} />
      <TextInput
        style={styles.inputStyle}
        placeholder={'search'}
        placeholderTextColor={colors.grayDisabledText}
        onChange={(text) => {
          if (onChange) {
            onChange(text);
          }
        }}
        onBlur={() => {}}
      />
    </View>
  );
};
export default SearchBox;
