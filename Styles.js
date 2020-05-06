import {StyleSheet} from 'react-native';
import {defaultBorder} from './Components/commonSyles';

const darkTheme = '#272727';
const gray = '#5A5A5A';
const greenBlue = '#008577';

export const styles = StyleSheet.create({
  input: {
    textDecorationLine: 'underline',
    color: 'white',
    opacity: 0.7,
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 5,
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: gray,
    ...defaultBorder,
  },
  text: {
    paddingVertical: 5,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: gray,
    opacity: 0.9,
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
  root: {
    backgroundColor: darkTheme,
    height: '100%',
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
});
