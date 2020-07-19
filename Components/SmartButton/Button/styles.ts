import {StyleSheet} from 'react-native';
import {defaultBorder, greenBlue} from '../../commonStyles';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
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
