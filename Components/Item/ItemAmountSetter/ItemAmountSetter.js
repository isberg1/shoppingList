import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';

const swipingText = (add, disabled) =>
  !disabled && (
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
export const ItemAmountSetter = ({
  swipeRight,
  swipeLeft,
  disabled,
  children,
}) => {
  const ref = useRef(null);

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={() => swipingText(true, disabled)}
      renderRightActions={() => swipingText(false, disabled)}
      onSwipeableRightWillOpen={swipeLeft}
      onSwipeableLeftWillOpen={swipeRight}
      onSwipeableWillOpen={() => ref?.current?.close()}>
      {children}
    </Swipeable>
  );
};
