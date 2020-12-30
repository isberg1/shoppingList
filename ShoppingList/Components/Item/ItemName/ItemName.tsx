import React, {useCallback, useContext, useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Item as ItemClass} from '../../../Model/ItemClass';
import {styles} from './styles';

import context from '../../../Context';

interface props {
  item: ItemClass;
  index: number;
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
}

export const ItemName = ({item, index, onPress, onLongPress}: props) => {
  const {fontSize} = useContext(context);
  const style = useMemo(() => styles(fontSize), [fontSize]);

  const _onPress = useCallback(() => onPress(index, item), [index, item, onPress]);

  const _onLongPress = useCallback(() => onLongPress(index, item), [
    onLongPress,
    index,
    item,
  ]);

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <Text style={[style.text]}>{item.ItemName}</Text>
    </TouchableOpacity>
  );
};
