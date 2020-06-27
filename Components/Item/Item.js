import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {styles} from './styles';

export const Item = ({item, index, onPress, onLongPress, editItemCounter}) => {
  const [counter, setCounter] = useState(item.ItemCount ?? 1);

  const _onPress = useCallback(() => {
    if (counter === 0 && item.isMarked) {
      setCounter(val => val + 1);
    }
    onPress(index, item);
  }, [counter, index, item, onPress]);

  const _onLongPress = useCallback(
    () => onLongPress && onLongPress(index, counter),
    [onLongPress, index, counter],
  );

  const _swipeSubtract = useCallback(() => {
    !item.isMarked && counter === 1 && _onPress();
    const newCounterValue = counter - (counter > 0 ? 1 : 0);
    setCounter(newCounterValue);
    editItemCounter(index, item, newCounterValue);
  }, [item, counter, _onPress, editItemCounter, index]);

  const _swipeAdd = useCallback(() => {
    const newCounterValue = counter + 1;
    item.isMarked && counter === 0 ? _onPress() : setCounter(newCounterValue);
    editItemCounter(index, item, newCounterValue);
  }, [counter, item, _onPress, editItemCounter, index]);

  return (
    <>
      <View style={[styles.itemRow, item.isMarked && styles.touchedItem]}>
        <View style={styles.touchableTextContainer}>
          <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
            <Text style={[styles.text]}>{item.ItemName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ItemAmountSetterContainer}>
          <ItemAmountSetter swipeRight={_swipeAdd} swipeLeft={_swipeSubtract}>
            <Text style={[styles.counter]}>{counter > 1 ? counter : ''}</Text>
          </ItemAmountSetter>
        </View>
      </View>
    </>
  );
};
