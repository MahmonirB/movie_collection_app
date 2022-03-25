// libs
import React from 'react';
import { StyleProp, TextInput, ViewStyle } from 'react-native';
// utility
import { colors } from '../../utilities/styles/variables';
import styles from './styles';
/**
 * @interface ITextBox
 */
interface ITextBox {
  style?: StyleProp<ViewStyle>;
  placeholderText?: string;
  onChange?: (arg0: string) => void;
}

/**
 * @name TextBox
 * @description TextBox component
 */
export const TextBox: React.FC<ITextBox> = (props: ITextBox) => {
  const { style, placeholderText, onChange } = props;

  return (
    <TextInput
      style={[style, styles.inputContainer]}
      keyboardType="default"
      placeholderTextColor={colors.grayDisabledText}
      placeholder={placeholderText}
      onChangeText={(text) => {
        if (onChange) {
          onChange(text);
        }
      }}
      onBlur={() => {}}
    />
  );
};
TextBox.defaultProps = {
  placeholderText: 'Enter ...',
};
