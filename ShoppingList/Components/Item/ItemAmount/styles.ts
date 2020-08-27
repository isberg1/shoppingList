import {StyleSheet} from 'react-native';
import {defaultBorder} from '../../commonStyles';

export const styles = StyleSheet.create({
  outerCounterContainer: {
    height: '100%',
    ...defaultBorder,
    borderColor: 'transparent',
    elevation: 0,
  },
  innerCounterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    paddingVertical: 5,
    fontSize: 30,
  },
});
