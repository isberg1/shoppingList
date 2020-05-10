import React, {useState, useEffect, useCallback, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const LIST_KEY = 'LIST';

export const useDB = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(LIST_KEY);
        if (value !== null) {
          // We have data!!
          const val = JSON.parse(value);
          console.log('retrieveData', val);
          setList(val);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveData();
  }, []);

  useEffect(() => {
    if (list && list.length > 0) {
      const _storeData = async () => {
        try {
          await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list));
          console.log('storeData');
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
      console.log('deleteData');
    } catch (error) {
      console.log('delete data error', error);
    }
  };

  const addToList = item => {
    setList(val => [...val, item]);
  };

  const deleteList = item => {
    setList([]);
    _deleteData();
  };

  return [list, addToList, deleteList];
};
