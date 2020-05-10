import {StyleSheet} from 'react-native';
import {defaultBorder, gray, greenBlue, pink} from '../commonStyles';

export const styles = StyleSheet.create({
  text: {
    paddingVertical: 5,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: gray,
    opacity: 0.9,
  },
  markedView: {
    backgroundColor: pink,
  },
  textBorder: {
    marginVertical: 3,
    borderColor: greenBlue,
    ...defaultBorder,
  },
  scrollView: {
    marginVertical: 5,
    marginHorizontal: 30,
    height: '100%',
  },
});
