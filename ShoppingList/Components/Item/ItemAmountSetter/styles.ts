import {StyleSheet} from 'react-native';
import {defaultBorder, orange, lightGray, green} from '../../commonStyles';

export const styles = StyleSheet.create({
  text: {
    padding: 5,
    fontSize: 30,
  },
  swipeView: {
    width: '100%',
    backgroundColor: lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    ...defaultBorder,
  },
  minus1: {
    backgroundColor: orange,
  },
  plus1: {
    backgroundColor: green,
  },
});
