import React, {useState} from 'react';
import {ModifyListButton, List, Input, Settings} from './Components/index';
import {usePersistentStorage} from './UsePersistentStorage';
import {UseInteractionManager} from './UseInteractionManager';
import useSettings from './UseSettings';
import context from './Context';
import {View} from 'react-native';
import {styles} from './styles';

export const ShoppingList = () => {
  const {fontSize, setFontSize} = useSettings();
  const {list, addToList, editList, removeItem, deleteList} = usePersistentStorage();

  const {
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
  } = UseInteractionManager({
    list,
    addToList,
    editList,
    removeItem,
    deleteList,
  });

  return (
    <View style={styles.shoppingList}>
      <context.Provider value={{fontSize, setFontSize}}>
        <Settings />
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
            onPress={onPressList}
            onLongPress={onLongPressList}
            editItemCounter={onEditItemCounter}
          />
        </View>
      </context.Provider>
    </View>
  );
};
