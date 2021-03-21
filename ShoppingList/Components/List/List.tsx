import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import useSettings from '../../UseSettings';
import {styles} from './styles';
import {Item} from './Item/Item';
import {Item as ItemClass} from '../../Model/ItemClass';
import {SortOptions} from '../../config';

interface props {
  list: ItemClass[];
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
  editItemCounter: (index: number, item: ItemClass, ItemCount: number) => void;
}

export const List = ({list, onPress, onLongPress, editItemCounter}: props) => {
  const {sortOrder} = useSettings();

  const displayList = useMemo(() => {
    const tmpArray = [...list];
    return sortOrder === SortOptions.Lifo ? [...tmpArray.reverse()] : list;
  }, [list, sortOrder]);
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        {displayList.map((item, index) => (
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
