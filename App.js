import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import {styles} from './AppStyles';
import {Buttons, ScrollList, Input} from './Components/index';
import {useDB} from './UseDB';

const App = () => {
  const [add, setAdd] = useState('');
  const [list, addToList, deleteList] = useDB({});

  const onPressAdd = () => {
    if (add) {
      addToList(add);
      setAdd('');
    }
  };

  const onPressDelete = () => {
    deleteList();
  };

  return (
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
        <ScrollList list={list} />
      </SafeAreaView>
    </View>
  );
};

export default App;
