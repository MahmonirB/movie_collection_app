import { StyleSheet } from 'react-native';
import { colors } from 'utilities/styles/variables';

const styles = StyleSheet.create({
  listItemStyle: {
    borderColor: colors.grayBorder,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 12,
    marginVertical: 6,
    height: 70,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.backText,
    marginVertical: 4,
    fontSize: 20,
  },
  subTitle: {
    fontSize: 16,
  },
});
export default styles;
