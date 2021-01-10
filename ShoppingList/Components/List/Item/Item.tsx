import React from 'react';
import {View} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {ItemName} from './ItemName/ItemName';
import {ItemAmount} from './ItemAmount/ItemAmount';
import {Item as ItemClass} from '../../../Model/ItemClass';
import {styles} from './styles';

interface props {
  item: ItemClass;
  index: number;
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
  editItemCounter: (index: number, item: ItemClass, newCounterValue: number) => void;
}

export const Item = ({item, index, onPress, onLongPress, editItemCounter}: props) => {
  return (
    <>
      <View style={[styles.itemRow, item.isMarked && styles.touchedItem]}>
        <View style={styles.ItemNameContainer}>
          <ItemName
            item={item}
            index={index}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        </View>
        <View style={styles.ItemAmountSetterContainer}>
          <ItemAmountSetter index={index} item={item} editItemCounter={editItemCounter}>
            <ItemAmount amount={!item.isMarked ? item.ItemCount : ''} />
          </ItemAmountSetter>
        </View>
      </View>
    </>
  );
};
