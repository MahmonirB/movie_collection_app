// libs
import React from 'react';
import {
  TouchableHighlight,
  Text,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// style
import styles from './styles';
/**
 * @interface IButton
 */
interface IButton {
  type?: 'default' | 'block' | 'small';
  title: string;
  active?: boolean;
  onClick(): void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

/**
 * @name Button
 * @description Button component
 */
const Button: React.FC<IButton> = (props: IButton) => {
  const {title, type, active, onClick, style, loading} = props;
  /**
   * @name getInActiveStyle
   * @description return inactive button style
   */
  const getInActiveStyle = () => {
    return !active && styles.inactiveButton;
  };
  /**
   * @name buttonTypeStyle
   * @description return button style based on type
   */
  const buttonTypeStyle = () => {
    switch (type) {
      case 'default':
        return styles.defaultStyle;
      case 'block':
        return styles.blockStyle;
      case 'small':
        return styles.smallStyle;
    }
  };
  return (
    <TouchableOpacity
      onPress={active ? onClick : () => {}}
      style={[
        style,
        styles.mainContainer,
        buttonTypeStyle(),
        getInActiveStyle(),
      ]}>
      {!loading ? (
        <Text style={styles.textStyle}>{title}</Text>
      ) : (
        <ActivityIndicator color="white" size="small" />
      )}
    </TouchableOpacity>
  );
};
Button.defaultProps = {
  active: true,
  type: 'default',
};
export default Button;
