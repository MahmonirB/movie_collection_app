import { StyleSheet } from 'react-native';
import { colors } from 'utilities/styles/variables';

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 12,
    maxHeight: 50,
    maxWidth: 364,
    borderRadius: 16,
    backgroundColor: colors.grayBorder,
  },
  inputStyle: {
    flex: 1,
    color: colors.backText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;
