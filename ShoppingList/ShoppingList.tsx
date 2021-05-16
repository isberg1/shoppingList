import React from 'react';
import {ModifyListButton, List, Input, Settings} from './Components/index';
import {usePersistentStorage} from './Hooks/UsePersistentStorage';
import {UseInteractionManager} from './Hooks/UseInteractionManager';
import {View} from 'react-native';
import {styles} from './styles';

export const ShoppingList = () => {
  const {
    list,
    addToList,
    editList,
    removeItem,
    deleteList,
    editEntireList,
  } = usePersistentStorage();

  const {
    inputHandler,
    enableButton,
    onSubmitHandler,
    onClearText,
    onEditItemCounter,
    onLongPressList,
    onPressList,
    onPressDelete,
    onPressEdit,
    onPressAdd,
    onSortList,
    inputValue,
    mode,
    inputRef,
  } = UseInteractionManager({
    list,
    addToList,
    editList,
    removeItem,
    deleteList,
    editEntireList,
  });

  return (
    <View style={styles.shoppingList}>
      <Settings onSortList={onSortList} />
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
    </View>
  );
};
