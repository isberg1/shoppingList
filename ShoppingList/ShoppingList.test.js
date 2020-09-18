import React from 'react';
import TestRenderer from 'react-test-renderer';
import {fireEvent} from 'react-native-testing-library';
import {ShoppingList} from './ShoppingList';
import {Input, ModifyListButton, List, Button, Item} from './Components/index';
import {TouchableOpacity} from 'react-native';

test('all elements render', () => {
  const {root} = TestRenderer.create(<ShoppingList />);

  expect(root.type).toBe(ShoppingList);
  expect(root.findAllByType(Input)[0].type).toBe(Input);
  expect(root.findAllByType(ModifyListButton)[0].type).toBe(ModifyListButton);
  expect(root.findAllByType(List)[0].type).toBe(List);
});

describe('adding, editing and deleting items in list', () => {
  const addItemToList = (view, item) => {
    fireEvent.changeText(view.findAllByType(Input)[0], item);
    fireEvent.press(view.findAllByType(Button)[0]);
  };

  const testNewItem = (view, itemName) => {
    expect(view.findAllByType(Item)[0].props.item.ItemName).toBe(itemName);
    expect(view.findAllByType(Item).length).toBe(1);
    expect(view.findAllByType(Item)[0].props.item.ItemCount).toBe(1);
  };

  test('a new item is added to list', () => {
    const {root} = TestRenderer.create(<ShoppingList />);
    expect(root.findAllByType(Item).length).toBe(0);

    addItemToList(root, 'milk');
    testNewItem(root, 'milk');
  });

  test('edit item in list', () => {
    const {root} = TestRenderer.create(<ShoppingList />);

    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('add'); // starting mode
    addItemToList(root, 'apple');

    // longPress item in list to change mode
    fireEvent(
      root.findAllByType(Item)[0].findAllByType(TouchableOpacity)[0],
      'longPress',
    );
    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('edit'); // mode has changed

    addItemToList(root, 'chocolate'); // change item from apple to chocolate
    testNewItem(root, 'chocolate');
    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('add'); // mode is set to add after editing
  });

  test('simple delete item from list', () => {
    const {root} = TestRenderer.create(<ShoppingList />);

    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('add'); // starting mode
    addItemToList(root, 'apple');

    // longPress item in list to change mode
    fireEvent(root.findAllByType(Item)[0].findAllByType(TouchableOpacity)[0], 'Press');
    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('delete'); // mode has changed
    fireEvent(root.findAllByType(Button)[0], 'longPress');
    expect(root.findAllByType(Item).length).toBe(0);
    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('add'); // mode has changed
  });

  test('complex delete items from list', () => {
    const {root} = TestRenderer.create(<ShoppingList />);

    expect(root.findAllByType(ModifyListButton)[0].props.mode).toBe('add'); // starting mode
    addItemToList(root, 'apple');
    addItemToList(root, 'milk');
    addItemToList(root, 'chocolate');
    addItemToList(root, 'salt');

    expect(root.findAllByType(Item).length).toBe(4);
    expect(root.findAllByType(Item)[1].props.item.ItemName).toBe('milk');
    expect(root.findAllByType(Item)[3].props.item.ItemName).toBe('salt');

    // mark items in list
    fireEvent(root.findAllByType(Item)[0].findAllByType(TouchableOpacity)[0], 'Press');
    fireEvent(root.findAllByType(Item)[2].findAllByType(TouchableOpacity)[0], 'Press');
    fireEvent(root.findAllByType(Button)[0], 'longPress'); // delete items

    expect(root.findAllByType(Item).length).toBe(2); // right number of items remaining
    // milk and salt moved to front of list, and milk still before salt
    expect(root.findAllByType(Item)[0].props.item.ItemName).toBe('milk');
    expect(root.findAllByType(Item)[1].props.item.ItemName).toBe('salt');
  });
});
