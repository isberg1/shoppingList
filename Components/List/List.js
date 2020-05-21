import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
import {Item} from '../Item/Item';

export const List = ({list, onPress, onLongPress, isTouched}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      {list.map((val, index) => (
        <Item
          key={index}
          value={val}
          index={index}
          isTouched={isTouched[index]}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      ))}
    </ScrollView>
  );
};
