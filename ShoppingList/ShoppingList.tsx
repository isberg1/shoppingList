import React, {useState, useCallback, useMemo, useRef} from 'react';
import {SmartButton, List, Input} from './Components/index';
import {usePersistentStorage} from './UsePersistentStorage';
import {modes} from './config';
import {View, TextInput} from 'react-native';
import {Item as ItemClass} from './Model/ItemClass';
import {styles} from './styles';

// Todo maybe extend ItemClass
type itemToBeDeletedMeta = {
  index: number;
  ItemCount: number;
  isMarked: boolean;
  isMarkedIndex: number;
} | null;

let itemToBeEdited: itemToBeDeletedMeta = null;

export const ShoppingList = () => {
  const {
    list,
    addToList,
    editList,
    removeItem,
    //deleteList,
  } = usePersistentStorage();

  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(modes.add);
  const inputRef = useRef<TextInput>(null);

  const nrOfMarkedItems = useMemo(
    () => (list || []).filter((item) => item?.isMarked).length,
    [list],
  );

  const onPressAdd = useCallback(() => {
    if (inputValue) {
      addToList(new ItemClass(inputValue));
      setInputValue('');
      nrOfMarkedItems > 0 && setMode(modes.delete);
    }
  }, [addToList, inputValue, nrOfMarkedItems]);

  const onPressEdit = useCallback(() => {
    if (inputValue && mode === modes.edit && itemToBeEdited) {
      editList(
        itemToBeEdited.index,
        new ItemClass(
          inputValue,
          itemToBeEdited.ItemCount,
          itemToBeEdited.isMarked,
          itemToBeEdited.isMarkedIndex,
        ),
      );
      setInputValue('');
      nrOfMarkedItems === 0 ? setMode(modes.add) : setMode(modes.delete);
      inputRef?.current?.blur();
    }
  }, [editList, inputValue, mode, nrOfMarkedItems]);

  const onPressDelete = useCallback(() => {
    if (nrOfMarkedItems > 0) {
      const itemsToDelete = list
        .filter((item) => item.isMarked)
        .map((markedItem) =>
          typeof markedItem.isMarkedIndex === 'number'
            ? markedItem.isMarkedIndex
            : -1,
        );
      removeItem(itemsToDelete);
      setMode(modes.add);
    }
  }, [list, nrOfMarkedItems, removeItem]);

  const _onPressList = useCallback(
    (index: number, item: ItemClass) => {
      const newValue = new ItemClass(
        item.ItemName,
        item.ItemCount,
        !item.isMarked,
        !item.isMarked ? index : null,
      );

      console.log('_onPressList', index, item);

      if (
        nrOfMarkedItems > 1 || // > 1 because editList() runs after this func call
        (!item.isMarked && !inputValue)
      ) {
        setMode(modes.delete);
      } else if (nrOfMarkedItems === 0 || item.isMarked) {
        setMode(modes.add);
      }
      editList(index, newValue);
    },
    [editList, inputValue, nrOfMarkedItems],
  );

  const _onLongPressList = (index: number, item: ItemClass) => {
    setInputValue(item.ItemName);
    setMode(modes.edit);
    inputRef?.current?.focus();
    itemToBeEdited = {
      index: index,
      ItemCount: item.ItemCount,
      isMarked: item.isMarked,
      isMarkedIndex: item.isMarkedIndex ? item.isMarkedIndex : -1, // Todo combine isMarked and isMarkedIndex into 1
    };
  };

  const _onEditItemCounter = useCallback(
    (index: number, item: ItemClass, ItemCount = 1) => {
      editList(index, new ItemClass(item.ItemName, ItemCount, item.isMarked));
    },
    [editList],
  );

  const enableButton = useMemo(() => {
    switch (mode) {
      case modes.add:
        return !!inputValue;
      case modes.delete:
        return nrOfMarkedItems > 0;
      case modes.edit:
        return !!inputValue;
    }
  }, [inputValue, nrOfMarkedItems, mode]);

  const inputHandler = useCallback(
    (text) => {
      mode === modes.delete && setMode(modes.add);
      setInputValue(text);
    },
    [mode],
  );

  const onSubmitHandler = useCallback(() => {
    if (mode === modes.add) {
      onPressAdd();
    } else if (mode === modes.edit) {
      onPressEdit();
    }
  }, [mode, onPressAdd, onPressEdit]);

  const onClearText = useCallback(
    () => setMode(nrOfMarkedItems === 0 ? modes.add : modes.delete),
    [nrOfMarkedItems],
  );

  return (
    <View style={styles.shoppingList}>
      <View style={styles.inputAndButton}>
        <Input
          value={inputValue}
          onChangeText={inputHandler}
          onSubmit={onSubmitHandler}
          inputRef={inputRef}
          onClearText={onClearText}
        />
        <SmartButton
          disabled={!enableButton}
          onPressAdd={onPressAdd}
          onPressDelete={onPressDelete}
          onPressEdit={onPressEdit}
          mode={mode}
        />
      </View>
      <View style={styles.list}>
        <List
          list={list}
          onPress={_onPressList}
          onLongPress={_onLongPressList}
          editItemCounter={_onEditItemCounter}
        />
      </View>
    </View>
  );
};
