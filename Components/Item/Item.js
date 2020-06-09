import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';

export const Item = ({value, index, onPress, onLongPress, isTouched}) => {
  const ref = useRef(null);
  const [counter, setCounter] = useState(1);

  const _onPress = () => {
    if (counter === 0 && isTouched) {
      setCounter(val => val + 1);
    }
    onPress(index, !isTouched);
  };
  const _onLongPress = () => onLongPress(index);

  const text = add => {
    return (
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
  };

  const _swipeSubtract = () => {
    !isTouched && counter === 1 && _onPress();
    setCounter(val => val + (val > 0 ? -1 : 0));
  };
  const _swipeAdd = () => {
    if (isTouched && counter === 0) {
      _onPress();
    } else {
      setCounter(val => val + 1);
    }
  };

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <View style={[styles.itemRow, isTouched && styles.touchedItem]}>
        <View style={styles.swipeContainer}>
          <Swipeable
            ref={ref}
            renderLeftActions={() => text(true)}
            renderRightActions={() => text(false)}
            onSwipeableRightWillOpen={_swipeSubtract}
            onSwipeableLeftWillOpen={_swipeAdd}
            onSwipeableWillOpen={() => ref?.current?.close()}>
            <Text style={[styles.text]}>{value}</Text>
          </Swipeable>
        </View>
        <Text style={[styles.counter]}>{counter > 1 ? counter : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};
