import React, {useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Item as ItemClass} from '../../../Model/ItemClass';
import {styles} from './styles';

interface props {
  item: ItemClass;
  index: number;
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
}

export const ItemName = ({item, index, onPress, onLongPress}: props) => {
  const _onPress = useCallback(() => onPress(index, item), [
    index,
    item,
    onPress,
  ]);

  const _onLongPress = useCallback(() => onLongPress(index, item), [
    onLongPress,
    index,
    item,
  ]);

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <Text style={[styles.text]}>{item.ItemName}</Text>
    </TouchableOpacity>
  );
};
