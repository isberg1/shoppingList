import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
import {Item} from '../Item/Item';

export const ScrollList = ({list, touchedStatus, editItem}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      {list.map((val, index) => (
        <Item
          key={index}
          value={val}
          index={index}
          touchedStatus={touchedStatus}
          onLongPress={editItem}
        />
      ))}
    </ScrollView>
  );
};
