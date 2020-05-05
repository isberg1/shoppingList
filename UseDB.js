import React, {useState, useEffect, useCallback, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const listKey = 'LIST';

export const useDB = ({saveDataCallback, deleteDataCallback}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(listKey);
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
          await AsyncStorage.setItem(listKey, JSON.stringify(list));
          if (saveDataCallback) saveDataCallback();
          console.log('storeData');
        } catch (error) {
          console.log('store data error', error);
        }
      };
      _storeData();
    }
  }, [list, saveDataCallback]);

  const _deleteData = async () => {
    try {
      await AsyncStorage.removeItem(listKey);
      if (deleteDataCallback) deleteDataCallback();
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
