import React, {useState, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {styles} from './styles';

export const Item = ({item, index, onPress, onLongPress, editItemCounter}) => {
  const [counter, setCounter] = useState(item.ItemCount ?? 1);
  const showCounter = useMemo(() => counter > 1 && !item.isMarked, [
    counter,
    item.isMarked,
  ]);

  const _onPress = useCallback(() => {
    onPress(index, item);
  }, [index, item, onPress]);

  const _onLongPress = useCallback(
    () => onLongPress && onLongPress(index, counter),
    [onLongPress, index, counter],
  );

  const _swipeSubtract = useCallback(() => {
    const newCounterValue = counter - (counter > 0 ? 1 : 0);
    setCounter(newCounterValue);
    counter && editItemCounter(index, item, newCounterValue);
  }, [item, counter, editItemCounter, index]);

  const _swipeAdd = useCallback(() => {
    const newCounterValue = counter + 1;
    setCounter(newCounterValue);
    editItemCounter(index, item, newCounterValue);
  }, [counter, item, editItemCounter, index]);

  return (
    <>
      <View style={[styles.itemRow, item.isMarked && styles.touchedItem]}>
        <View style={styles.touchableTextContainer}>
          <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
            <Text style={[styles.text]}>{item.ItemName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ItemAmountSetterContainer}>
          <ItemAmountSetter
            swipeRight={_swipeAdd}
            swipeLeft={_swipeSubtract}
            disabled={item.isMarked}>
            <View
              style={[styles.outerContainer, showCounter && styles.borders]}>
              <View style={styles.innerContainer}>
                <Text style={[styles.counter]}>
                  {showCounter ? counter : ''}
                </Text>
              </View>
            </View>
          </ItemAmountSetter>
        </View>
      </View>
    </>
  );
};
