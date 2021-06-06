import React, {useMemo} from 'react';
import {View, Image} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {ItemName} from './ItemName/ItemName';
import {ItemAmount} from './ItemAmount/ItemAmount';
import {Item as ItemClass} from '../../../Model/ItemClass';
import {styles} from './styles';
import UseSettings from '../../../Hooks/UseSettings';

export function Item({item, index, onPress, onLongPress, editItemCounter}: props) {
  const {theme} = UseSettings();
  const _styles = useMemo(() => styles(theme), [theme]);
  return (
    <>
      <View style={[_styles.itemRow, item.isMarked && _styles.touchedItem]}>
        {/*         <Image
          style={styles.image}
          source={require('../../../Resources/1607152404595.jpg')}
        /> */}

        <View style={_styles.ItemNameContainer}>
          <ItemName
            item={item}
            index={index}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        </View>
        <View style={_styles.ItemAmountSetterContainer}>
          <ItemAmountSetter index={index} item={item} editItemCounter={editItemCounter}>
            <ItemAmount amount={!item.isMarked ? item.ItemCount : ''} />
          </ItemAmountSetter>
        </View>
      </View>
    </>
  );
}

interface props {
  item: ItemClass;
  index: number;
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
  editItemCounter: (index: number, item: ItemClass, newCounterValue: number) => void;
}
