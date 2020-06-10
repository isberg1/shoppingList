import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {styles} from './styles';

export const Item = ({value, index, onPress, onLongPress, isTouched}) => {
  const [counter, setCounter] = useState(1);

  const _onPress = useCallback(() => {
    if (counter === 0 && isTouched) {
      setCounter(val => val + 1);
    }
    onPress(index, !isTouched);
  }, [counter, index, isTouched, onPress]);

  const _onLongPress = useCallback(() => onLongPress && onLongPress(index), [
    onLongPress,
    index,
  ]);

  const _swipeSubtract = useCallback(() => {
    !isTouched && counter === 1 && _onPress();
    setCounter(val => val - (val > 0 ? 1 : 0));
  }, [_onPress, counter, isTouched]);

  const _swipeAdd = useCallback(() => {
    if (isTouched && counter === 0) {
      _onPress();
    } else {
      setCounter(val => val + 1);
    }
  }, [_onPress, counter, isTouched]);

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <View style={[styles.itemRow, isTouched && styles.touchedItem]}>
        <ItemAmountSetter
          value={value}
          swipeRight={_swipeAdd}
          swipeLeft={_swipeSubtract}
        />
        <Text style={[styles.counter]}>{counter > 1 ? counter : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};
