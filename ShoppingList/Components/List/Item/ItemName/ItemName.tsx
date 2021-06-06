import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Item as ItemClass} from '../../../../Model/ItemClass';
import {styles} from './styles';
import {Text} from '../../../Text/Text';
import UseSettings from '../../../../Hooks/UseSettings';

interface props {
  item: ItemClass;
  index: number;
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
}

export const ItemName = ({item, index, onPress, onLongPress}: props) => {
  const {theme} = UseSettings();
  const _styles = useMemo(() => styles(theme), [theme]);

  return (
    <TouchableOpacity
      style={_styles.touchable}
      onPress={() => onPress(index, item)}
      onLongPress={() => onLongPress(index, item)}
    >
      <View style={_styles.textContainer}>
        <Text style={_styles.text}>{item.ItemName}</Text>
      </View>
    </TouchableOpacity>
  );
};
