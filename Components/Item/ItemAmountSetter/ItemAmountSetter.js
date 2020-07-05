import React, {useRef, useCallback} from 'react';
import {View, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';

// DOCUMENTATION: https://docs.swmansion.com/react-native-gesture-handler/docs/component-swipeable.html
export const ItemAmountSetter = ({
  swipeRight,
  swipeLeft,
  disabled,
  children,
}) => {
  const ref = useRef(null);

  const swipingText = useCallback(
    add => (
      <>
        <View
          style={[
            styles.swipeView,
            add ? styles.swipeViewLeft : styles.swipeViewRight,
          ]}
        >
          <Text style={styles.swipeText}>{add ? '+1' : '-1'} </Text>
        </View>
      </>
    ),
    [],
  );

  const _onSwipeableWillOpen = useCallback(() => ref?.current?.close(), []);
  const _renderLeftActions = useCallback(() => !disabled && swipingText(true), [
    disabled,
    swipingText,
  ]);
  const _renderRightActions = useCallback(
    () => !disabled && swipingText(false),
    [disabled, swipingText],
  );

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={_renderLeftActions}
      renderRightActions={_renderRightActions}
      onSwipeableRightWillOpen={swipeLeft}
      onSwipeableLeftWillOpen={swipeRight}
      onSwipeableWillOpen={_onSwipeableWillOpen}
    >
      {children}
    </Swipeable>
  );
};
