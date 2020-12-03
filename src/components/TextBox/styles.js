// libs
import {StyleSheet} from 'react-native';
// utility
import {colors} from '../../utilities/styles/variables';

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: colors.activeBlue,
    borderWidth: 1,
    borderRadius: 16,
    color: colors.backText,
    maxWidth: 264,
    height: 48,
    padding: 12,
  },
});

export default styles;
