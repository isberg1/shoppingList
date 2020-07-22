import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Item as ItemClass} from './Model/ItemClass';

const LIST_KEY = 'LIST';

const initialItemList: ItemClass[] = [];

export const usePersistentStorage = () => {
  const [list, setList] = useState(initialItemList);

  // get DB data at startup
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(LIST_KEY);
        value !== null && setList(JSON.parse(value));
      } catch (error) {}
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
    const toBeDeleted = 'toBeDeleted';
    const deleteItem = new ItemClass(toBeDeleted);
    const deleteCount = 1;

    let replaceDeleteIndexWithDummy = [...list];
    keys.forEach((indexKey) => {
      replaceDeleteIndexWithDummy.splice(indexKey, deleteCount, deleteItem);
    });

    const newList = [
      ...replaceDeleteIndexWithDummy.filter(
        (item) => item.ItemName !== toBeDeleted,
      ),
    ];
    newList.length !== 0 ? setList(newList) : deleteList();
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
