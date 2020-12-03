import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'android' ? 0 : 20,
    paddingHorizontal: 24,
  },
  marginBottom: {
    marginBottom: 24,
  },
  logoStyle: {
    width: 164,
    height: 64,
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 40,
    paddingBottom: 16,
  },
  searchContainer: {alignItems: 'flex-start', height: 50, marginBottom: 20},
  menuItemStyle: {alignItems: 'center'},
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default styles;
