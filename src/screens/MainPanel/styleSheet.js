import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../utilities/styles/variables';

export const underlayColor = colors.grayInactive;
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 40,
    paddingBottom: 16,
  },
  searchContainer: { alignItems: 'flex-start', height: 50, marginBottom: 20 },
  menuItemStyle: { alignItems: 'center' },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default styles;
