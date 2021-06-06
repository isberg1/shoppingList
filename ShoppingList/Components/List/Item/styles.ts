import {StyleSheet} from 'react-native';
import {Theme} from 'ShoppingList/config';
import {defaultBorder, colors, minimumTouchableSize} from '../../commonStyles';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    itemRow: {
      minHeight: minimumTouchableSize,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      backgroundColor: theme.listItem,
      ...defaultBorder,
    },
    // TODO
    image: {
      height: 50,
      width: 50,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: colors.black,
    },
    touchedItem: {
      backgroundColor: theme.listItemDelete,
    },
    ItemNameContainer: {
      flex: 7,
      alignItems: 'center',
    },
    ItemAmountSetterContainer: {
      flex: 2,
    },
  });
