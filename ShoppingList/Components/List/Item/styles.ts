import {StyleSheet} from 'react-native';
import {defaultBorder, colors} from '../../commonStyles';

export const styles = StyleSheet.create({
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: colors.lightGray,
    ...defaultBorder,
  },
  imageContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.black,
  },
  touchedItem: {
    backgroundColor: colors.pink,
  },
  ItemNameContainer: {
    flex: 7,
    alignItems: 'center',
  },
  ItemAmountSetterContainer: {
    flex: 2,
  },
});
