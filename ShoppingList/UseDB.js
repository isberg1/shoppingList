import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const LIST_KEY = 'LIST';

export const useDB = () => {
  const [list, setList] = useState([]);

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
  const addToList = item => {
    setList(val => [...val, item]);
  };

  const deleteList = item => {
    setList([]);
    _deleteData();
  };

  const removeItem = keys => {
    const dummyValue = 'dummyValue';
    const deleteCount = 1;

    let replaceDeleteIndexWithDummy = [...list];
    keys.forEach(indexKey => {
      replaceDeleteIndexWithDummy.splice(indexKey, deleteCount, dummyValue);
    });

    const newList = [
      ...replaceDeleteIndexWithDummy.filter(val => val !== dummyValue),
    ];
    newList.length !== 0 ? setList(newList) : deleteList();
  };

  const editList = (indexToEdit, newValue) => {
    setList(currentList =>
      currentList.map((oldValue, index) =>
        indexToEdit === index ? newValue : oldValue,
      ),
    );
  };

  return {list, addToList, deleteList, removeItem, editList};
};
