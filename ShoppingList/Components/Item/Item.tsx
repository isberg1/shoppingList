import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ItemAmountSetter} from './ItemAmountSetter/ItemAmountSetter';
import {Item as ItemClass} from '../../ShoppingList/ItemClass';
import {styles} from './styles';

interface props {
  item: ItemClass;
  index: number;
  onPress: (index: number, item: ItemClass) => void;
  onLongPress: (index: number, item: ItemClass) => void;
  editItemCounter: (
    index: number,
    item: ItemClass,
    newCounterValue: number,
  ) => void;
}

export const Item = ({
  item,
  index,
  onPress,
  onLongPress,
  editItemCounter,
}: props) => {
  const showCounter = useMemo(() => item.ItemCount > 1 && !item.isMarked, [
    item.ItemCount,
    item.isMarked,
  ]);

  const _onPress = useCallback(() => onPress(index, item), [
    index,
    item,
    onPress,
  ]);

  const _onLongPress = useCallback(
    () => onLongPress && onLongPress(index, item),
    [onLongPress, index, item],
  );

  const _swipeSubtract = useCallback(() => {
    const newCounterValue = item.ItemCount - (item.ItemCount > 1 ? 1 : 0);
    item.ItemCount && editItemCounter(index, item, newCounterValue);
  }, [item, editItemCounter, index]);

  const _swipeAdd = useCallback(
    () => editItemCounter(index, item, item.ItemCount + 1),
    [item, editItemCounter, index],
  );

  return (
    <>
      <View style={[styles.itemRow, item.isMarked && styles.touchedItem]}>
        <View style={styles.touchableTextContainer}>
          <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
            <Text style={[styles.text]}>{item.ItemName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ItemAmountSetterContainer}>
          <ItemAmountSetter
            swipeRight={_swipeAdd}
            swipeLeft={_swipeSubtract}
            disabled={item.isMarked}
          >
            <View
              style={[
                styles.outerCounterContainer,
                showCounter && styles.borders,
              ]}
            >
              <View style={styles.innerCounterContainer}>
                <Text style={[styles.counter]}>
                  {showCounter ? item.ItemCount : ''}
                </Text>
              </View>
            </View>
          </ItemAmountSetter>
        </View>
      </View>
    </>
  );
};
