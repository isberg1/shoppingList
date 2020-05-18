import React, {useState, useCallback, useContext, useMemo, useRef} from 'react';
import {SmartButton, List, Input} from '../Components/index';
import {useDB} from './UseDB';
import {MyContext, modes} from '../Components/config';

const isEmptyObject = object =>
  Object.keys(object).length === 0 && object.constructor === Object;

let storeLastEditedIndex;

export const ShoppingList = () => {
  const [inputValue, setInputValue] = useState('');
  const {list, addToList, deleteList, removeItem, editList} = useDB({});
  const [itemIsTouched, setItemIsTouched] = useState({});
  const [mode, setMode] = useState(modes.add);
  const contextObject = useContext(MyContext);
  const inputRef = useRef(null);

  const itemIsTouchedLength = useCallback(
    () => Object.keys(itemIsTouched).length,
    [itemIsTouched],
  );
  const onPressAdd = () => {
    if (inputValue) {
      addToList(inputValue);
      setInputValue('');
      if (itemIsTouchedLength()) setMode(modes.delete);
    }
  };

  const onPressEdit = () => {
    if (inputValue && mode === modes.edit) {
      editList(storeLastEditedIndex, inputValue);
      setInputValue('');
      isEmptyObject({...itemIsTouched})
        ? setMode(modes.add)
        : setMode(modes.delete);
    }
  };

  const onPressDelete = () => {
    if (!Object.keys(itemIsTouched).length) return;

    const toDel = Object.keys(itemIsTouched)
      .filter(val => itemIsTouched[val] === true)
      .map(val => parseInt(val, 10));

    removeItem(toDel);
    setItemIsTouched({});
    setMode(modes.add);
    contextObject.num = contextObject.num + 'g';
  };

  const _onPressList = (index, value) => {
    const newItemIsTouched = itemIsTouched;
    newItemIsTouched[index] = value;
    if (value) {
      setItemIsTouched(newItemIsTouched);
    } else {
      delete newItemIsTouched[index];
      setItemIsTouched(newItemIsTouched);
    }

    if (itemIsTouchedLength() > 0 && value && !inputValue) {
      setMode(modes.delete);
    } else if (itemIsTouchedLength() === 0 && !value) {
      setMode(modes.add);
    }
  };

  const _onLongPressList = index => {
    setInputValue(list[index]);
    setMode(modes.edit);
    inputRef.current.focus();
    storeLastEditedIndex = index;
    console.log('empty', isEmptyObject({...itemIsTouched}));
  };

  const buttonDisabled = useMemo(() => {
    switch (mode) {
      case modes.add:
        return !!inputValue;
      case modes.delete:
        return !!itemIsTouchedLength();
      case modes.edit:
        return !!inputValue;
    }
  }, [inputValue, itemIsTouchedLength, mode]);

  const inputHandler = text => {
    mode === modes.delete ? setMode(modes.add) : '';
    setInputValue(text);
  };

  return (
    <>
      <Input
        value={inputValue}
        onChangeText={inputHandler}
        inputRef={inputRef}
      />
      <SmartButton
        disabled={!buttonDisabled}
        onPressAdd={onPressAdd}
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
        mode={mode}
      />
      <List list={list} onPress={_onPressList} onLongPress={_onLongPressList} />
    </>
  );
};