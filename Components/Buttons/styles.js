import {StyleSheet} from 'react-native';
import {defaultBorder} from '../commonSyles';

const greenBlue = '#008577';

export const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
    backgroundColor: 'green',
  },
  buttonDelete: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
    backgroundColor: '#C25B01',
  },
  buttonContainer: {
    fontSize: 50,
    borderColor: greenBlue,
    ...defaultBorder,
    marginHorizontal: 30,
  },
  disabled: {
    opacity: 0.3,
  },
  spacing: {
    marginBottom: 10,
  },
});
