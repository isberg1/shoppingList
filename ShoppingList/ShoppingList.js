import React, {useState, useCallback, useMemo, useRef} from 'react';
import {SmartButton, List, Input} from '../Components/index';
import {useDB} from './UseDB';
import {modes} from '../Components/config';
import {View} from 'react-native';
import {Item} from './Item';
import {styles} from './styles';

let itemToBeEdited = {
  index: null,
  count: 1,
};

export const ShoppingList = () => {
  const [inputValue, setInputValue] = useState('');
  const [markedItems, setMarkedItems] = useState({});
  const [mode, setMode] = useState(modes.add);
  const {list, addToList, deleteList, removeItem, editList} = useDB({});
  const inputRef = useRef(null);

  const nrOfMarkedItems = useCallback(() => Object.keys(markedItems).length, [
    markedItems,
  ]);

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
        new Item(inputValue, itemToBeEdited.count),
      );
      setInputValue('');
      nrOfMarkedItems() === 0 ? setMode(modes.add) : setMode(modes.delete);
      inputRef.current.blur();
    }
  }, [editList, inputValue, mode, nrOfMarkedItems]);

  const onPressDelete = useCallback(() => {
    if (nrOfMarkedItems() > 0) {
      const itemsToDelete = Object.keys(markedItems)
        .filter(val => markedItems[val] === true)
        .map(val => parseInt(val, 10));

      removeItem(itemsToDelete);
      setMarkedItems({});
      setMode(modes.add);
    }
  }, [markedItems, nrOfMarkedItems, removeItem]);

  const _onPressList = useCallback(
    (index, value) => {
      const newMarkedItems = {...markedItems};
      newMarkedItems[index] = value;

      const isObjectEmpty = object =>
        Object.keys(object).length === 0 && object.constructor === Object;

      if (!value) {
        delete newMarkedItems[index];
      }
      setMarkedItems(newMarkedItems);

      if (!isObjectEmpty(newMarkedItems) && value && !inputValue) {
        setMode(modes.delete);
      } else if (isObjectEmpty(newMarkedItems) && !value) {
        setMode(modes.add);
      }
    },
    [inputValue, markedItems],
  );

  const _onLongPressList = (index, count = 1) => {
    setInputValue(list[index].ItemName);
    setMode(modes.edit);
    inputRef.current.focus();
    itemToBeEdited.index = index;
    itemToBeEdited.count = count;
  };

  const _onEditItemCounter = useCallback(
    (index, itemName, ItemCount = 1) => {
      editList(index, new Item(itemName, ItemCount));
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
          isTouched={markedItems}
          editItemCounter={_onEditItemCounter}
        />
      </View>
    </View>
  );
};
