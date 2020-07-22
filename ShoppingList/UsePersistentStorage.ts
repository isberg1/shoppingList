import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Item as ItemClass} from './Model/ItemClass';

const LIST_KEY = 'LIST';
const initialItemList: ItemClass[] = [];

export const usePersistentStorage = () => {
  const [list, setList] = useState(initialItemList);

  // get data at startup
  useEffect(() => {
    const parseDataToItemList = (data: string) => {
      return JSON.parse(data).map(
        (item: any) =>
          new ItemClass(item?.ItemName, item?.ItemCount, item?.isMarkedIndex),
      );
    };
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(LIST_KEY);
        if (value) {
          const newItemList = parseDataToItemList(value);
          newItemList && setList(newItemList);
        }
      } catch (error) {
        console.log('_retrieveData failed:', error);
      }
    };
    _retrieveData();
  }, []);

  useEffect(() => {
    if (list && list.length > 0) {
      const _storeData = async () => {
        try {
          await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list));
        } catch (error) {
          console.log('store data error', error);
        }
      };
      _storeData();
    }
  }, [list]);

  const _deleteData = async () => {
    try {
      await AsyncStorage.removeItem(LIST_KEY);
    } catch (error) {
      console.log('delete data error', error);
    }
  };

  /*
   -------- public API ---------
  */
  const addToList = (item: ItemClass) => setList((items) => [...items, item]);

  const deleteList = () => {
    setList([]);
    _deleteData();
  };

  const removeItem = (keys: number[]) => {
    if (keys.length === list.length) {
      return deleteList();
    }

    const toBeDeleted = 'toBeDeleted';
    const deleteItem = new ItemClass(toBeDeleted);

    let markItemsForDeletion = [...list];
    keys.forEach((indexKey) => {
      markItemsForDeletion.splice(indexKey, 1, deleteItem);
    });

    const newList = [
      ...markItemsForDeletion.filter((item) => item.ItemName !== toBeDeleted),
    ];
    setList(newList);
  };

  const editList = (indexToEdit: number, newValue: ItemClass) => {
    setList((currentList) =>
      currentList.map((oldValue, index) =>
        indexToEdit === index ? newValue : oldValue,
      ),
    );
  };

  return {list, addToList, deleteList, removeItem, editList};
};
