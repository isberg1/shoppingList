import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {styles} from './styles';

export const Item = ({
  value,
  index,
  onPress,
  onLongPress,
  isTouched,
  editItemCounter,
}) => {
  const [counter, setCounter] = useState(value.ItemCount ?? 1);

  const _onPress = useCallback(() => {
    if (counter === 0 && isTouched) {
      setCounter(val => val + 1);
    }
    onPress(index, !isTouched);
  }, [counter, index, isTouched, onPress]);

  const _onLongPress = useCallback(
    () => onLongPress && onLongPress(index, counter),
    [onLongPress, index, counter],
  );

  const _swipeSubtract = useCallback(() => {
    !isTouched && counter === 1 && _onPress();
    const newCounterValue = counter - (counter > 0 ? 1 : 0);
    setCounter(newCounterValue);
    editItemCounter(index, value.ItemName, newCounterValue);
  }, [_onPress, counter, editItemCounter, index, isTouched, value.ItemName]);

  const _swipeAdd = useCallback(() => {
    const newCounterValue = counter + 1;
    isTouched && counter === 0 ? _onPress() : setCounter(newCounterValue);
    editItemCounter(index, value.ItemName, newCounterValue);
  }, [_onPress, counter, editItemCounter, index, isTouched, value.ItemName]);

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <View style={[styles.itemRow, isTouched && styles.touchedItem]}>
        <ItemAmountSetter swipeRight={_swipeAdd} swipeLeft={_swipeSubtract}>
          <Text style={[styles.text]}>{value.ItemName}</Text>
        </ItemAmountSetter>
        <Text style={[styles.counter]}>{counter > 1 ? counter : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};
