import {useState, useEffect} from 'react';
import {
  setInAsyncStorage,
  getFromAsyncStorage,
  deleteFromAsyncStorage,
} from './Utils/AsyncStorage';
import {Item as ItemClass} from './Model/ItemClass';

const LIST_KEY = 'LIST';

export const usePersistentStorage = () => {
  const [list, setList] = useState<ItemClass[]>([]);

  // get data at startup
  useEffect(() => {
    const parseDataToItemList = (data: string) => {
      return JSON.parse(data).map(
        (item: any) =>
          new ItemClass(item?.ItemName, item?.ItemCount, item?.isMarkedIndex),
      );
    };

    getFromAsyncStorage(LIST_KEY, (value: string) => {
      const newItemList = parseDataToItemList(value);
      newItemList && setList(newItemList);
    });
  }, []);

  useEffect(() => {
    if (list?.length > 0) {
      setInAsyncStorage(LIST_KEY, JSON.stringify(list));
    }
  }, [list]);

  /*
   -------- public API ---------
  */
  const addToList = (item: ItemClass) => setList((items) => [...items, item]);

  const deleteList = () => {
    setList([]);
    deleteFromAsyncStorage(LIST_KEY);
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
      currentList.map((oldValue, index) => (indexToEdit === index ? newValue : oldValue)),
    );
  };

  return {list, addToList, deleteList, removeItem, editList};
};
