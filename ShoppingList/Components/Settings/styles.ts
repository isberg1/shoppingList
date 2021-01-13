import {StyleSheet} from 'react-native';

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
    width: 50,
    height: 50,
  },
  text: {
    textAlign: 'center',
  },
  settingsEntriesContainer: {
    marginTop: 10,
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
});

export {colors} from '../commonStyles';
