import {StyleSheet} from 'react-native';
import {defaultBorder, gray, lightGray, white} from '../commonStyles';

export const styles = (fontSize: number) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: gray,
      opacity: 0.7,
      ...defaultBorder,
    },
    input: {
      flex: 8,
      textDecorationLine: 'underline',
      color: white,
      padding: 5,
      textAlign: 'center',
      fontSize: fontSize,
    },
    resetText: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    deleteText: {
      fontSize: fontSize,
    },
    onFocus: {
      opacity: 1,
      backgroundColor: lightGray,
    },
    noFocus: {},
  });
