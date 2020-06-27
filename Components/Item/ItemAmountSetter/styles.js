import {StyleSheet} from 'react-native';
import {defaultBorder, orange, lightGray, green} from '../../commonStyles';

export const styles = StyleSheet.create({
  swipeText: {
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
  swipeViewRight: {
    backgroundColor: orange,
  },
  swipeViewLeft: {
    backgroundColor: green,
  },
});
