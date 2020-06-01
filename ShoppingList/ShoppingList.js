import React, {useState, useCallback, useContext, useMemo, useRef} from 'react';
import {SmartButton, List, Input} from '../Components/index';
import {useDB} from './UseDB';
import {modes} from '../Components/config';
import {View} from 'react-native';
import {styles} from './styles';

const isObjectEmpty = object =>
  Object.keys(object).length === 0 && object.constructor === Object;

let storeLastEditedIndex;

export const ShoppingList = () => {
  const [inputValue, setInputValue] = useState('');
  const [markedItems, setMarkedItems] = useState({});
  const [mode, setMode] = useState(modes.add);
  const {list, addToList, deleteList, removeItem, editList} = useDB({});
  const inputRef = useRef(null);

  const nrOfMarkedItems = useCallback(() => Object.keys(markedItems).length, [
    markedItems,
  ]);

  const onPressAdd = () => {
    if (inputValue) {
      addToList(inputValue);
      setInputValue('');
      nrOfMarkedItems() && setMode(modes.delete);
    }
  };

  const onPressEdit = () => {
    if (inputValue && mode === modes.edit) {
      editList(storeLastEditedIndex, inputValue);
      setInputValue('');
      isObjectEmpty(markedItems) ? setMode(modes.add) : setMode(modes.delete);
    }
  };

  const onPressDelete = () => {
    if (!Object.keys(markedItems).length) return;

    const toDel = Object.keys(markedItems)
      .filter(val => markedItems[val] === true)
      .map(val => parseInt(val, 10));

    removeItem(toDel);
    setMarkedItems({});
    setMode(modes.add);
  };

  const _onPressList = (index, value) => {
    const newMarkedItems = {...markedItems};
    newMarkedItems[index] = value;

    if (!value) {
      delete newMarkedItems[index];
    }
    setMarkedItems(newMarkedItems);

    if (!isObjectEmpty(newMarkedItems) && value && !inputValue) {
      setMode(modes.delete);
    } else if (isObjectEmpty(newMarkedItems) && !value) {
      setMode(modes.add);
    }
  };

  const _onLongPressList = index => {
    setInputValue(list[index]);
    setMode(modes.edit);
    inputRef.current.focus();
    storeLastEditedIndex = index;
  };

  const enableButton = useMemo(() => {
    switch (mode) {
      case modes.add:
        return !!inputValue;
      case modes.delete:
        return !!nrOfMarkedItems();
      case modes.edit:
        return !!inputValue;
    }
  }, [inputValue, nrOfMarkedItems, mode]);

  const inputHandler = text => {
    mode === modes.delete && setMode(modes.add);
    setInputValue(text);
  };

  const onSubmitHandler = () => {
    let submit = () => {};
    if (mode === modes.add) {
      submit = onPressAdd;
    } else if (mode === modes.edit) {
      submit = onPressEdit;
    }
    submit();
  };

  const onClearText = () =>
    isObjectEmpty(markedItems) ? setMode(modes.add) : setMode(modes.delete);

  return (
    <View style={styles.shoppingList}>
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
      <List
        list={list}
        onPress={_onPressList}
        onLongPress={_onLongPressList}
        isTouched={markedItems}
      />
    </View>
  );
};

// TODO unify use of 'itemIsTouchedLength' and 'isObjectEmpty'
