import {StyleSheet} from 'react-native';
import {Theme} from '../../../../config';
import {defaultBorder} from '../../../commonStyles';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    swipeView: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      ...defaultBorder,
    },
    minus1: {
      backgroundColor: theme.swipeMinus,
    },
    plus1: {
      backgroundColor: theme.swipePlus,
    },
    text: {
      color: theme.text,
    },
  });
