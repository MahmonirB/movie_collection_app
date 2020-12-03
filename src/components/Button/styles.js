// libs
import {StyleSheet} from 'react-native';
// utility
import {colors} from '../../utilities/styles/variables';

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 16,
    backgroundColor: colors.activeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 45,
  },
  inactiveButton: {
    backgroundColor: colors.grayBorder,
  },
  defaultStyle: {
    width: 124,
    height: 40,
  },
  blockStyle: {
    flex: 1,
    alignSelf: 'stretch',
    height: 42,
  },
  smallStyle: {
    width: 64,
    height: 30,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default styles;
