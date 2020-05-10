import {StyleSheet} from 'react-native';
import {defaultBorder, orange, green} from '../commonStyles';

const greenBlue = '#008577';

export const styles = StyleSheet.create({
  buttonAdd: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
    backgroundColor: green,
  },
  buttonDelete: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
    backgroundColor: orange,
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
});
