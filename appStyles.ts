import {StyleSheet} from 'react-native';
import {Theme} from './ShoppingList/config';

export const styles = (settings: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: settings.backgroundMain,
      height: '100%',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
  });
