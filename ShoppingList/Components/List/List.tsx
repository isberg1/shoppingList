import React from 'react';
import {ScrollView} from 'react-native';

import {styles} from './styles';
import {Item} from './Item/Item';
import {Item as ItemClass} from '../../Model/ItemClass';

interface props {
  list: ItemClass[];
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
  editItemCounter: (index: number, item: ItemClass, ItemCount: number) => void;
}

export const List = ({list, onPress, onLongPress, editItemCounter}: props) => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        {list.map((item, index) => (
          <Item
            key={index}
            item={item}
            index={index}
            onPress={onPress}
            onLongPress={onLongPress}
            editItemCounter={editItemCounter}
          />
        ))}
      </ScrollView>
    </>
  );
};
