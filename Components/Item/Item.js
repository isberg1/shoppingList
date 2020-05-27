import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from './styles';

export const Item = ({value, index, onPress, onLongPress, isTouched}) => {
  const ref = useRef(null);

  const _onPress = () => onPress(index, !isTouched);
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

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={() => text(true)}
      renderRightActions={() => text(false)}
      onSwipeableWillOpen={() => {
        ref.current.close();
      }}>
      <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
        <View style={styles.textBorder}>
          <Text style={[styles.text, isTouched ? styles.markedView : '']}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
