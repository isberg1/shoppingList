import React, {useState, useCallback, useContext, useMemo} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import {styles} from './styles';
import {Buttons, ScrollList, Input} from '../Components/index';
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
      .filter((val, indexKey) => {
        return itemIsTouched[val] === true;
      })
      .map(val => parseInt(val, 10));

    console.log('itemIsTouched', itemIsTouched);

    removeItem(toDel);
    setItemIsTouched({});
    setMode(modes.add);
    contextObject.num = contextObject.num + 'g';
    //deleteList();
  };

  const _touchedStatus = (index, value) => {
    const newB = itemIsTouched;
    newB[index] = value;
    setItemIsTouched(newB);

    if (itemIsTouchedLength() > 0 && value) {
      setMode(modes.delete);
    } else if (!value) {
      setMode(modes.add);
    }
  };

  const _editItem = index => {
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

  return (
    <MyContext.Provider value={contextObject}>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Input value={inputValue} onChangeText={setInputValue} />
          <Buttons
            disabled={!buttonDisabled}
            onPressAdd={onPressAdd}
            onPressDelete={onPressDelete}
            onPressEdit={onPressEdit}
            mode={mode}
          />
          <ScrollList
            list={list}
            touchedStatus={_touchedStatus}
            editItem={_editItem}
          />
        </SafeAreaView>
      </View>
    </MyContext.Provider>
  );
};

export default App;

// TODO fix mode when an item is marked, but input gets focus
