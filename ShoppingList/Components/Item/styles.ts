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
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: lightGray,

    borderColor: greenBlue,
    ...defaultBorder,
  },
  ItemAmountSetterContainer: {
    flex: 2,
  },
  outerCounterContainer: {
    height: '100%',
    borderColor: 'transparent',
    ...defaultBorder,
  },
  borders: {borderColor: greenBlue},
  innerCounterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    paddingVertical: 5,
    fontSize: 30,
  },
});
