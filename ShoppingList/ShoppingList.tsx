import React, {useMemo} from 'react';
import {ModifyListButton, List, Input, Settings} from './Components/index';
import {usePersistentStorage} from './Hooks/UsePersistentStorage';
import {useInteractionManager} from './Hooks/UseInteractionManager';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {styles} from './styles';
import useSettings from './Hooks/UseSettings';

export const ShoppingList = () => {
  const settings = useSettings();
  const _styles = useMemo(() => styles(settings.theme), [settings.theme]);

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
  } = useInteractionManager({
    list,
    addToList,
    editList,
    removeItem,
    deleteList,
    editEntireList,
  });

  return (
    <View style={_styles.root}>
      <StatusBar backgroundColor={settings.theme.backgroundMain} />
      <SafeAreaView style={_styles.safeAreaView} />
      <View style={_styles.shoppingList}>
        <Settings onSortList={onSortList} />
        <View style={_styles.inputAndButton}>
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
        <View style={_styles.list}>
          <List
            list={list}
            onPress={onPressList}
            onLongPress={onLongPressList}
            editItemCounter={onEditItemCounter}
          />
        </View>
      </View>
    </View>
  );
};
