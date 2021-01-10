import {StyleSheet} from 'react-native';
import {white} from '../../../commonStyles';

export const styles = (fontSize: number) =>
  StyleSheet.create({
    text: {
      textAlign: 'left',
      paddingVertical: 5,
      paddingHorizontal: 5,
      fontSize: fontSize,
      color: white,
    },
  });
