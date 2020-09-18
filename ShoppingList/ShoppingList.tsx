import React from 'react';
import {ModifyListButton, List, Input, Settings} from './Components/index';
import {usePersistentStorage} from './UsePersistentStorage';
import {UseInteractionManager} from './UseInteractionManager';
import {View} from 'react-native';
import {styles} from './styles';

export const ShoppingList = () => {
  const {
    list,
    addToList,
    editList,
    removeItem,
    //deleteList,
  } = usePersistentStorage();

  const {
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
  } = UseInteractionManager({
    list,
    addToList,
    editList,
    removeItem,
    //deleteList,
  });

  return (
    <View style={styles.shoppingList}>
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
          onPress={_onPressList}
          onLongPress={_onLongPressList}
          editItemCounter={_onEditItemCounter}
        />
      </View>
    </View>
  );
};
