import { StyleSheet, Platform } from 'react-native';

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
  titleLogin: { marginBottom: 24, fontSize: 18, fontWeight: 'bold' },
});
export default styles;
