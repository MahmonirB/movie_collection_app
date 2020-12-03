import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 8 : 20,
    paddingBottom: 16,
  },
  titleStyle: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
});
export default styles;
