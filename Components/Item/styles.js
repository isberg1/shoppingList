import {StyleSheet} from 'react-native';
import {
  defaultBorder,
  greenBlue,
  pink,
  lightGray,
  white,
} from '../commonStyles';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 30,
    color: white,
  },
  touchedItem: {
    backgroundColor: pink,
  },
  touchableTextContainer: {
    flex: 7,
  },
  ItemAmountSetterContainer: {
    flex: 2,
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: lightGray,

    borderColor: greenBlue,
    ...defaultBorder,
  },
  counter: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 20,
  },
});
