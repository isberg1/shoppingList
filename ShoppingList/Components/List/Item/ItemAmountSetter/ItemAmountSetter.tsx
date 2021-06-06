import React, {useRef, useCallback, useMemo} from 'react';
import {View} from 'react-native';
// @ts-ignore
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Item as ItemClass} from '../../../../Model/ItemClass';
import {styles} from './styles';
import UseSettings from '../../../../Hooks/UseSettings';
import {Text} from '../../../Text/Text';

interface props {
  item: ItemClass;
  index: number;
  editItemCounter: (index: number, item: ItemClass, newCounterValue: number) => void;
  children: React.ReactNode;
}

// DOCUMENTATION: https://docs.swmansion.com/react-native-gesture-handler/docs
export const ItemAmountSetter = ({item, index, editItemCounter, children}: props) => {
  const ref = useRef<Swipeable>(null);

  const {theme} = UseSettings();
  const _styles = useMemo(() => styles(theme), [theme]);

  const _closeSwipeable = useCallback(() => ref?.current?.close(), []);

  const _renderMinus1 = useCallback(
    () => (
      <View style={[_styles.swipeView, _styles.minus1]}>
        <Text style={_styles.text}>-1</Text>
      </View>
    ),
    [_styles.minus1, _styles.swipeView, _styles.text],
  );

  const _renderPlus1 = useCallback(
    () => (
      <View style={[_styles.swipeView, _styles.plus1]}>
        <Text style={_styles.text}>+1</Text>
      </View>
    ),
    [_styles.plus1, _styles.swipeView, _styles.text],
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
