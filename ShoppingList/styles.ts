import {StyleSheet} from 'react-native';
import {Theme} from './config';

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
    shoppingList: {
      height: '100%',
      marginTop: 40,
      marginHorizontal: 30,
    },
    inputAndButton: {
      flex: 1,
      marginBottom: 20,
    },
    list: {
      flex: 4,
      paddingTop: 20,
      paddingBottom: 80,
    },
  });
