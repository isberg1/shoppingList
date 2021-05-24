import {StyleSheet} from 'react-native';
import {minimumTouchableSize} from '../commonStyles';

export const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: 'flex-end',
  },
  modal: {
    justifyContent: 'center',
    width: 300,
  },
  button: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    minWidth: 60,
    minHeight: 50,
  },
  text: {
    textAlign: 'center',
  },
  settingsEntriesContainer: {
    minHeight: minimumTouchableSize,
    justifyContent: 'center',
    marginVertical: 2,
    paddingHorizontal: 30,
  },
  settingsTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    alignSelf: 'center',
    height: 40,
    width: '110%',
  },
  currentSort: {
    backgroundColor: 'gray',
  },
  header: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
});

export {colors} from '../commonStyles';
