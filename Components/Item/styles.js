import {StyleSheet} from 'react-native';
import {defaultBorder, gray, greenBlue, pink, lightGray} from '../commonStyles';

export const styles = StyleSheet.create({
  text: {
    paddingVertical: 5,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: lightGray,
  },
  markedView: {
    backgroundColor: pink,
  },
  textBorder: {
    marginVertical: 3,
    borderColor: greenBlue,
    ...defaultBorder,
  },
  swipeText: {
    padding: 5,
    fontSize: 30,
  },
  swipeView: {
    justifyContent: 'center',
    backgroundColor: lightGray,
    opacity: 0.8,
    margin: 10,
    width: '90%',
    ...defaultBorder,
  },
  swipeViewRight: {
    alignItems: 'flex-end',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
  },
  swipeViewLeft: {
    alignItems: 'flex-start',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
  },
});
