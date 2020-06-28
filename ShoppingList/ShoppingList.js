import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {SmartButton, List, Input} from '../Components/index';
import {useDB} from './UseDB';
import {modes} from '../Components/config';
import {View} from 'react-native';
import {Item} from './Item';
import {styles} from './styles';

let itemToBeEdited = {
  index: null,
};

export const ShoppingList = () => {
  const {list, addToList, deleteList, removeItem, editList} = useDB({});
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(modes.add);
  const inputRef = useRef(null);

  const nrOfMarkedItems = useCallback(
    () => list.filter(item => item.isMarked).length,
    [list],
  );

  const onPressAdd = useCallback(() => {
    if (inputValue) {
      addToList(new Item(inputValue));
      setInputValue('');
      nrOfMarkedItems() > 0 && setMode(modes.delete);
    }
  }, [addToList, inputValue, nrOfMarkedItems]);

  const onPressEdit = useCallback(() => {
    if (inputValue && mode === modes.edit) {
      editList(
        itemToBeEdited.index,
        new Item(
          inputValue,
          itemToBeEdited.ItemCount,
          itemToBeEdited.isMarked,
          itemToBeEdited.isMarkedIndex,
        ),
      );
      setInputValue('');
      nrOfMarkedItems() === 0 ? setMode(modes.add) : setMode(modes.delete);
      inputRef.current.blur();
    }
  }, [editList, inputValue, mode, nrOfMarkedItems]);

  const onPressDelete = useCallback(() => {
    if (nrOfMarkedItems() > 0) {
      const itemsToDelete = list
        .filter(item => item.isMarked)
        .map(markedItem => parseInt(markedItem.isMarkedIndex, 10));

      removeItem(itemsToDelete);
      setMode(modes.add);
    }
  }, [list, nrOfMarkedItems, removeItem]);

  const _onPressList = useCallback(
    (index, item) => {
      const newValue = new Item(
        item.ItemName,
        item.ItemCount,
        !item.isMarked,
        !item.isMarked ? index : null,
      );

      if (
        nrOfMarkedItems() > 1 || // > 1 because editList() is happens after this func call
        (!item.isMarked && !inputValue)
      ) {
        setMode(modes.delete);
      } else if (nrOfMarkedItems() === 0 || item.isMarked) {
        setMode(modes.add);
      }
      editList(index, newValue);
    },
    [editList, inputValue, nrOfMarkedItems],
  );

  const _onLongPressList = (index, item) => {
    setInputValue(item.ItemName);
    setMode(modes.edit);
    inputRef.current.focus();
    itemToBeEdited = {...item};
    itemToBeEdited.index = index;
  };

  const _onEditItemCounter = useCallback(
    (index, item, ItemCount = 1) => {
      editList(index, new Item(item.ItemName, ItemCount, item.isMarked));
    },
    [editList],
  );

  const enableButton = useMemo(() => {
    switch (mode) {
      case modes.add:
        return !!inputValue;
      case modes.delete:
        return nrOfMarkedItems() > 0;
      case modes.edit:
        return !!inputValue;
    }
  }, [inputValue, nrOfMarkedItems, mode]);

  const inputHandler = useCallback(
    text => {
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
    () => setMode(nrOfMarkedItems() === 0 ? modes.add : modes.delete),
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
