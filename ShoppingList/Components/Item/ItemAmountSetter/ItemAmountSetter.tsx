import React, {useRef, useCallback} from 'react';
// @ts-ignore: Unreachable code error
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {SwipeToSide} from './SwipeToSide/SwipeToSide';
import {Item as ItemClass} from '../../../Model/ItemClass';
import {styles} from './styles';

interface props {
  item: ItemClass;
  index: number;
  editItemCounter: (
    index: number,
    item: ItemClass,
    newCounterValue: number,
  ) => void;
  children: JSX.Element | React.ReactNode | React.ReactNodeArray; // maybe wrong type
}

// DOCUMENTATION: https://docs.swmansion.com/react-native-gesture-handler/docs
export const ItemAmountSetter = ({
  item,
  index,
  editItemCounter,
  children,
}: props) => {
  const ref = useRef<Swipeable>(null);

  const _onSwipeableWillOpen = useCallback(() => ref?.current?.close(), []);

  const _renderRightActions = useCallback(
    () => <SwipeToSide text="-1" style={styles.swipeViewRight} />,
    [],
  );
  const _renderLeftActions = useCallback(
    () => <SwipeToSide text="+1" style={styles.swipeViewLeft} />,
    [],
  );

  const _swipeLeft = useCallback(() => {
    if (item.ItemCount > 1) {
      editItemCounter(index, item, item.ItemCount - 1);
    }
  }, [editItemCounter, index, item]);

  const _swipeRight = useCallback(
    () => editItemCounter(index, item, item.ItemCount + 1),
    [editItemCounter, index, item],
  );

  return (
    <Swipeable
      ref={ref}
      enable={!item.isMarked}
      renderLeftActions={_renderLeftActions}
      renderRightActions={_renderRightActions}
      onSwipeableRightWillOpen={_swipeLeft}
      onSwipeableLeftWillOpen={_swipeRight}
      onSwipeableWillOpen={_onSwipeableWillOpen}
    >
      {children}
    </Swipeable>
  );
};
