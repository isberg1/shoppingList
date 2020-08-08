import {StyleSheet} from 'react-native';
import {defaultBorder, pink, lightGray} from '../commonStyles';

export const styles = StyleSheet.create({
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: lightGray,
    ...defaultBorder,
  },
  touchedItem: {
    backgroundColor: pink,
  },
  ItemNameContainer: {
    flex: 7,
  },
  ItemAmountSetterContainer: {
    flex: 2,
  },
});
