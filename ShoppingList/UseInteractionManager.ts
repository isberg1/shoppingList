import React, {useState, useCallback, useMemo, useRef} from 'react';
import {ModifyListButton, List, Input, Settings} from './Components/index';
import {modes} from './config';
import {View, TextInput} from 'react-native';
import {Item as ItemClass} from './Model/ItemClass';
import {styles} from './styles';

interface itemToBeEditedType {
  index: number;
  item: ItemClass;
}

let itemToBeEdited: itemToBeEditedType | null = null;

interface Props {
  list: ItemClass[];
  addToList: (item: ItemClass) => void;
  editList: (indexToEdit: number, newValue: ItemClass) => void;
  removeItem: (keys: number[]) => void;
}

export const UseInteractionManager = ({
  list,
  addToList,
  editList,
  removeItem,
}: //deleteList,
Props) => {
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(modes.add);
  const inputRef = useRef<TextInput>(null);

  const nrOfMarkedItems = useMemo(
    () => (list || []).filter((item) => item.isMarked).length,
    [list],
  );

  const areSomeItemsMarked = useMemo(() => nrOfMarkedItems > 0, [nrOfMarkedItems]);

  const onPressAdd = useCallback(() => {
    if (inputValue) {
      addToList(new ItemClass(inputValue));
      setInputValue('');
      areSomeItemsMarked && setMode(modes.delete);
    }
  }, [addToList, inputValue, areSomeItemsMarked]);

  const cleanupAfterEdit = useCallback(() => {
    setInputValue('');
    setMode(nrOfMarkedItems === 0 ? modes.add : modes.delete);
    inputRef?.current?.blur();
    itemToBeEdited = null;
  }, [nrOfMarkedItems]);

  const onPressEdit = useCallback(() => {
    if (inputValue && mode === modes.edit && itemToBeEdited) {
      const newValue = new ItemClass(
        inputValue,
        itemToBeEdited.item.ItemCount,
        itemToBeEdited.item.isMarkedIndex,
      );
      editList(itemToBeEdited.index, newValue);
      cleanupAfterEdit();
    }
  }, [cleanupAfterEdit, editList, inputValue, mode]);

  const onPressDelete = useCallback(() => {
    if (areSomeItemsMarked) {
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
  }, [areSomeItemsMarked, list, removeItem]);

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
    itemToBeEdited = {index: index, item};
  };

  const _onEditItemCounter = useCallback(
    (index: number, item: ItemClass, ItemCount = 1) => {
      const newValue = new ItemClass(item.ItemName, ItemCount, item.isMarkedIndex);

      editList(index, newValue);
    },
    [editList],
  );

  const enableButton = useMemo(() => {
    switch (mode) {
      case modes.add:
        return !!inputValue;
      case modes.delete:
        return areSomeItemsMarked;
      case modes.edit:
        return !!inputValue;
    }
  }, [mode, inputValue, areSomeItemsMarked]);

  const inputHandler = useCallback(
    (text) => {
      setInputValue(text);
      if (mode === modes.delete) {
        setMode(modes.add);
      }
    },
    [mode],
  );

  const onSubmitHandler = useCallback(
    () => (mode === modes.add ? onPressAdd() : onPressEdit()),
    [mode, onPressAdd, onPressEdit],
  );

  const onClearText = useCallback(() => inputHandler(''), [inputHandler]);

  return {
    onClearText,
    onSubmitHandler,
    inputHandler,
    enableButton,
    _onEditItemCounter,
    _onLongPressList,
    _onPressList,
    onPressDelete,
    onPressEdit,
    onPressAdd,
    inputValue,
    mode,
    inputRef,
  };
};
