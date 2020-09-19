import {useState, useCallback, useMemo, useRef} from 'react';
import {modes} from './config';
import {TextInput} from 'react-native';
import {Item as ItemClass} from './Model/ItemClass';

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
  deleteList: () => void;
}

export const UseInteractionManager = ({
  list,
  addToList,
  editList,
  removeItem,
  deleteList: _deleteList,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(modes.add);
  const inputRef = useRef<TextInput>(null);

  const _nrOfMarkedItems = useMemo(
    () => (list || []).filter((item) => item.isMarked).length,
    [list],
  );

  const _areSomeItemsMarked = useMemo(() => _nrOfMarkedItems > 0, [_nrOfMarkedItems]);

  const _cleanupAfterEdit = useCallback(() => {
    setInputValue('');
    setMode(_nrOfMarkedItems === 0 ? modes.add : modes.delete);
    inputRef?.current?.blur();
    itemToBeEdited = null;
  }, [_nrOfMarkedItems]);

  const _changeModeAfterPressList = useCallback(
    (item: ItemClass) => {
      if (
        _nrOfMarkedItems > 1 || // > 1 because editList() runs after this func call
        (!item.isMarked && !inputValue)
      ) {
        setMode(modes.delete);
      } else if (_nrOfMarkedItems === 0 || item.isMarked) {
        setMode(modes.add);
      }
    },
    [inputValue, _nrOfMarkedItems],
  );

  /*
 ///////////////  Public Functions ///////////////
 */

  const onPressAdd = useCallback(() => {
    if (inputValue) {
      addToList(new ItemClass(inputValue));
      setInputValue('');
      _areSomeItemsMarked && setMode(modes.delete);
    }
  }, [addToList, inputValue, _areSomeItemsMarked]);

  const onPressEdit = useCallback(() => {
    if (inputValue && mode === modes.edit && itemToBeEdited) {
      const newValue = new ItemClass(
        inputValue,
        itemToBeEdited.item.ItemCount,
        itemToBeEdited.item.isMarkedIndex,
      );
      editList(itemToBeEdited.index, newValue);
      _cleanupAfterEdit();
    }
  }, [_cleanupAfterEdit, editList, inputValue, mode]);

  const onPressDelete = useCallback(() => {
    if (_areSomeItemsMarked) {
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
  }, [_areSomeItemsMarked, list, removeItem]);

  const onPressList = useCallback(
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

  const onLongPressList = (index: number, item: ItemClass) => {
    setInputValue(item.ItemName);
    setMode(modes.edit);
    inputRef?.current?.focus();
    itemToBeEdited = {index: index, item};
  };

  const onEditItemCounter = useCallback(
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
        return _areSomeItemsMarked;
      case modes.edit:
        return !!inputValue;
    }
  }, [mode, inputValue, _areSomeItemsMarked]);

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
    onEditItemCounter,
    onLongPressList,
    onPressList,
    onPressDelete,
    onPressEdit,
    onPressAdd,
    inputValue,
    mode,
    inputRef,
  };
};
