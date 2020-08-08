import React, {useRef, useCallback} from 'react';
// @ts-ignore
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

  const _closeSwipeable = useCallback(() => ref?.current?.close(), []);

  const _renderMinus1 = useCallback(
    () => <SwipeToSide text="-1" style={styles.minus1} />,
    [],
  );
  const _renderPlus1 = useCallback(
    () => <SwipeToSide text="+1" style={styles.plus1} />,
    [],
  );

  const _subtract1FromCounter = useCallback(() => {
    if (item.ItemCount > 1) {
      editItemCounter(index, item, item.ItemCount - 1);
    }
  }, [editItemCounter, index, item]);

  const _add1ToCounter = useCallback(
    () => editItemCounter(index, item, item.ItemCount + 1),
    [editItemCounter, index, item],
  );

  return (
    <Swipeable
      ref={ref}
      enable={!item.isMarked}
      renderLeftActions={_renderPlus1}
      renderRightActions={_renderMinus1}
      onSwipeableRightWillOpen={_subtract1FromCounter}
      onSwipeableLeftWillOpen={_add1ToCounter}
      onSwipeableWillOpen={_closeSwipeable}
    >
      {children}
    </Swipeable>
  );
};
