import React, {useState, useCallback, useMemo, useRef} from 'react';
import {ModifyListButton, List, Input} from './Components/index';
import {usePersistentStorage} from './UsePersistentStorage';
import {modes} from './config';
import {View, TextInput} from 'react-native';
import {Item as ItemClass} from './Model/ItemClass';
import {styles} from './styles';

interface itemToBeEditedType {
  index: number;
  item: ItemClass;
}

let itemToBeEdited: itemToBeEditedType | null = null;

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
    () => (list || []).filter((item) => item.isMarked).length,
    [list],
  );

  const onPressAdd = useCallback(() => {
    if (inputValue) {
      addToList(new ItemClass(inputValue));
      setInputValue('');
      nrOfMarkedItems > 0 && setMode(modes.delete);
    }
  }, [addToList, inputValue, nrOfMarkedItems]);

  const cleanupAfterEdit = useCallback(() => {
    setInputValue('');
    setMode(nrOfMarkedItems === 0 ? modes.add : modes.delete);
    inputRef?.current?.blur();
    itemToBeEdited = null;
  }, [nrOfMarkedItems]);

  const onPressEdit = useCallback(() => {
    if (inputValue && mode === modes.edit && itemToBeEdited) {
      itemToBeEdited.item.itemName = inputValue;
      editList(itemToBeEdited.index, itemToBeEdited.item);
      cleanupAfterEdit();
    }
  }, [cleanupAfterEdit, editList, inputValue, mode]);

  const onPressDelete = useCallback(() => {
    if (nrOfMarkedItems > 0) {
      const itemsToDelete = list
        .filter((item) => item.isMarked)
        .map((markedItem) =>
          typeof markedItem.isMarkedIndex === 'number' // this is already checked in filter, TS does not recognized it
            ? markedItem.isMarkedIndex
            : -1,
        );
      removeItem(itemsToDelete);
      setMode(modes.add);
    }
  }, [list, nrOfMarkedItems, removeItem]);

  const _changeModeAfterPressList = useCallback(
    (item: ItemClass) => {
      if (
        nrOfMarkedItems > 1 || // > 1 because editList() runs after this func call
        (!item.isMarked && !inputValue)
      ) {
        setMode(modes.delete);
      } else if (nrOfMarkedItems === 0 || item.isMarked) {
        setMode(modes.add);
      }
    },
    [inputValue, nrOfMarkedItems],
  );

  const _onPressList = useCallback(
    (index: number, item: ItemClass) => {
      const newValue = new ItemClass(
        item.ItemName,
        item.ItemCount,
        !item.isMarked ? index : null,
      );
      editList(index, newValue);
      _changeModeAfterPressList(item);
    },
    [_changeModeAfterPressList, editList],
  );

  const _onLongPressList = (index: number, item: ItemClass) => {
    setInputValue(item.ItemName);
    setMode(modes.edit);
    inputRef?.current?.focus();
    itemToBeEdited = {
      index: index,
      item,
    };
  };

  const _onEditItemCounter = useCallback(
    (index: number, item: ItemClass, ItemCount = 1) => {
      item.itemCounter = ItemCount;
      editList(index, item);
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
      setInputValue(text);
      if (mode === modes.delete) {
        setMode(modes.add);
      }
    },
    [mode],
  );

  const onSubmitHandler = useCallback(() => {
    const submit = mode === modes.add ? onPressAdd : onPressEdit;
    submit();
  }, [mode, onPressAdd, onPressEdit]);

  const onClearText = useCallback(() => inputHandler(''), [inputHandler]);

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
        <ModifyListButton
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
