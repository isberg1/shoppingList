import {StyleSheet} from 'react-native';
import {Theme} from '../../config';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    buttonAdd: {
      backgroundColor: theme.addButton,
    },
    buttonDelete: {
      backgroundColor: theme.deleteButton,
    },
    buttonEdit: {
      backgroundColor: theme.editButton,
    },
  });
