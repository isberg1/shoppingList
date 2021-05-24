import {StyleSheet} from 'react-native';
import {defaultBorder} from '../../commonStyles';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    height: 60,
  },
  buttonContainer: {
    ...defaultBorder,
  },
  disabled: {
    opacity: 0.6,
  },
});
