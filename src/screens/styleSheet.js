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
});
export default styles;
