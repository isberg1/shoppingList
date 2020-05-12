import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, StatusBar, Button} from 'react-native';

import {styles} from './styles';
import {Buttons, ScrollList, Input} from '../Components/index';
import {useDB} from './UseDB';

export const MyContext = React.createContext({
  num: 0,
});

const App = () => {
  const [add, setAdd] = useState('');
  const [list, addToList, deleteList, removeItem] = useDB({});
  const [a, b] = useState({});
  const contextObject = useContext(MyContext);
  const onPressAdd = () => {
    if (add) {
      addToList(add);
      setAdd('');
    }
  };

  const onPressDelete = () => {
    if (!a) return;

    const toDel = Object.keys(a)
      .filter((val, indexKey) => {
        return a[val] === true;
      })
      .map(val => parseInt(val, 10));

    removeItem(toDel);
    b({});
    contextObject.num = contextObject.num + 'a';
    //deleteList();
  };

  const del = (index, value) => {
    const newB = a;
    newB[index] = value;
    console.log('newB', newB);
    b(newB);
  };

  return (
    <MyContext.Provider value={contextObject}>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Input value={add} onChangeText={setAdd} />
          <Buttons
            addingDisabled={!add}
            deletingDisabled={list.length === 0}
            onPressAdd={onPressAdd}
            onPressDelete={onPressDelete}
          />
          <ScrollList list={list} del={del} />
        </SafeAreaView>
      </View>
    </MyContext.Provider>
  );
};

export default App;
