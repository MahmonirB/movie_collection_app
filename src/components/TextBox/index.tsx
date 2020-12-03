// libs
import React from 'react';
import {StyleProp, TextInput, ViewStyle} from 'react-native';
// utility
import {colors} from '../../utilities/styles/variables';
import styles from './styles';
/**
 * @interface ITextBox
 */
interface ITextBox {
  style?: StyleProp<ViewStyle>;
  placeholderText?: string;
}

/**
 * @name TextBox
 * @description TextBox component
 */
const TextBox: React.FC<ITextBox> = (props: ITextBox) => {
  const {style, placeholderText} = props;

  return (
    <TextInput
      style={[style, styles.inputContainer]}
      keyboardType="default"
      placeholderTextColor={colors.grayDisabledText}
      placeholder={placeholderText}
    />
  );
};
TextBox.defaultProps = {
  placeholderText: 'Enter ...',
};
export default TextBox;
