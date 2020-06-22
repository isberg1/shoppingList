import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
import {Item} from '../Item/Item';

export const List = ({
  list,
  onPress,
  onLongPress,
  isTouched,
  editItemCounter,
}) => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        {list.map((item, index) => (
          <Item
            key={index}
            value={item}
            index={index}
            isTouched={isTouched[index]}
            onPress={onPress}
            onLongPress={onLongPress}
            editItemCounter={editItemCounter}
          />
        ))}
      </ScrollView>
    </>
  );
};
