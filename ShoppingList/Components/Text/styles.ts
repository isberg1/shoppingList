import {StyleSheet} from 'react-native';
import {Theme} from '../../config';

export const styles = (fontSize: number, theme: Theme) => {
  return StyleSheet.create({
    text: {
      fontSize: fontSize,
      color: theme.text,
    },
  });
};
