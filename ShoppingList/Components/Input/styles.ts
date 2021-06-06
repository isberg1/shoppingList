import {StyleSheet} from 'react-native';
import {defaultBorder} from '../commonStyles';
import {Theme} from '../../config';

export const styles = (fontSize: number, theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: theme.input,
      opacity: 0.7,
      ...defaultBorder,
    },
    input: {
      flex: 8,
      textDecorationLine: 'underline',
      color: theme.text,
      padding: 5,
      textAlign: 'center',
      fontSize: fontSize,
      minHeight: 50,
    },
    clearTextButton: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    onFocus: {
      opacity: 1,
      backgroundColor: theme.inputOnFocus,
    },
    noFocus: {},
  });
