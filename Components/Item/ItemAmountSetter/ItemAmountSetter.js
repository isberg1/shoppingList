import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';

const swipingText = add => (
  <>
    <View
      style={[
        styles.swipeView,
        add ? styles.swipeViewLeft : styles.swipeViewRight,
      ]}>
      <Text style={styles.swipeText}>{add ? '+1' : '-1'} </Text>
    </View>
  </>
);

export const ItemAmountSetter = ({value, swipeRight, swipeLeft}) => {
  const ref = useRef(null);

  return (
    <View style={styles.swipeContainer}>
      <Swipeable
        ref={ref}
        renderLeftActions={() => swipingText(true)}
        renderRightActions={() => swipingText(false)}
        onSwipeableRightWillOpen={swipeLeft}
        onSwipeableLeftWillOpen={swipeRight}
        onSwipeableWillOpen={() => ref?.current?.close()}>
        <Text style={[styles.text]}>{value}</Text>
      </Swipeable>
    </View>
  );
};
