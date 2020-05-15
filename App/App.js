import React, {useState, useCallback, useContext, useMemo} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import {styles} from './styles';
import {Buttons, List, Input} from '../Components/index';
import {useDB} from './UseDB';

export const MyContext = React.createContext({
  num: 0,
});

export const modes = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
};

let storeLastEditedIndex;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const {list, addToList, deleteList, removeItem, editList} = useDB({});
  const [itemIsTouched, setItemIsTouched] = useState({});
  const [mode, setMode] = useState(modes.add);
  const contextObject = useContext(MyContext);

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
      setMode(modes.add);
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
    storeLastEditedIndex = index;
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
    if (mode === modes.delete) setMode(modes.add);
    setInputValue(text);
  };

  return (
    <MyContext.Provider value={contextObject}>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Input value={inputValue} onChangeText={inputHandler} />
          <Buttons
            disabled={!buttonDisabled}
            onPressAdd={onPressAdd}
            onPressDelete={onPressDelete}
            onPressEdit={onPressEdit}
            mode={mode}
          />
          <List
            list={list}
            onPress={_onPressList}
            onLongPress={_onLongPressList}
          />
        </SafeAreaView>
      </View>
    </MyContext.Provider>
  );
};

export default App;
