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
  buttonText: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginHorizontal: 5,
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

  currentSort: {
    backgroundColor: 'gray',
  },

  header: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 5,
    fontSize: 20,
  },
});

export {colors} from '../commonStyles';
