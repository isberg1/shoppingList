import {StyleSheet} from 'react-native';
import {defaultBorder} from '../../commonStyles';

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
    ...defaultBorder,
    marginHorizontal: 30,
  },
  disabled: {
    opacity: 0.6,
  },
});
