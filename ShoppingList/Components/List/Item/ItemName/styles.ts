import {StyleSheet} from 'react-native';
import {Theme} from '../../../../config';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    text: {
      color: theme.text,
    },
    touchable: {
      width: '100%',
    },
  });
