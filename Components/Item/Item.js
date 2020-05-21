import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const Item = ({value, index, onPress, onLongPress, isTouched}) => {
  const _onPress = () => onPress(index, !isTouched);
  const _onLongPress = () => onLongPress(index);

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <View style={styles.textBorder}>
        <Text style={[styles.text, isTouched ? styles.markedView : '']}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
