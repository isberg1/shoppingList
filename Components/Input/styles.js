import {StyleSheet} from 'react-native';
import {defaultBorder, gray} from '../commonStyles';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: gray,
    ...defaultBorder,
  },
  input: {
    flex: 8,
    textDecorationLine: 'underline',
    color: 'white',
    opacity: 0.7,
    padding: 5,
    textAlign: 'center',
    fontSize: 30,
  },
  resetText: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 25,
  },
});
