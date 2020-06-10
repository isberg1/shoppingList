import {StyleSheet} from 'react-native';
import {defaultBorder, orange, lightGray, green} from '../../commonStyles';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 30,
  },

  swipeContainer: {
    flex: 5,
  },

  swipeText: {
    padding: 5,
    fontSize: 30,
  },
  swipeView: {
    justifyContent: 'center',
    backgroundColor: lightGray,
    opacity: 0.8,
    margin: 10,
    width: '20%',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    ...defaultBorder,
  },
  swipeViewRight: {
    alignItems: 'flex-end',
    backgroundColor: orange,
  },
  swipeViewLeft: {
    alignItems: 'flex-start',
    backgroundColor: green,
  },
});
