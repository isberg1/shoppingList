import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';

const swipeThreshold = 150;

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

// DOCUMENTATION: https://docs.swmansion.com/react-native-gesture-handler/docs/component-swipeable.html
export const ItemAmountSetter = ({value, swipeRight, swipeLeft, children}) => {
  const ref = useRef(null);

  return (
    <View style={styles.swipeContainer}>
      <Swipeable
        ref={ref}
        rightThreshold={swipeThreshold}
        leftThreshold={swipeThreshold}
        renderLeftActions={() => swipingText(true)}
        renderRightActions={() => swipingText(false)}
        onSwipeableRightWillOpen={swipeLeft}
        onSwipeableLeftWillOpen={swipeRight}
        onSwipeableWillOpen={() => ref?.current?.close()}>
        {children}
      </Swipeable>
    </View>
  );
};

// TODO fix bug where count value is
// moved to line under when item is deleted
