import {StyleSheet} from 'react-native';
import {
  defaultBorder,
  orange,
  green,
  blue,
  greenBlue,
  hexToRgb,
} from '../commonStyles';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
  },
  buttonAdd: {
    backgroundColor: green,
  },
  buttonDelete: {
    backgroundColor: orange,
  },
  buttonEdit: {
    backgroundColor: blue,
  },
  buttonContainer: {
    fontSize: 50,
    borderColor: greenBlue,
    ...defaultBorder,
    marginHorizontal: 30,
  },
  disabled: {
    opacity: 0.6,
  },
});
