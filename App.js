/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {styles} from './Styles';
import {Buttons} from './Components/index';
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
        <View />
        <TextInput
          placeholder={'Enter Text'}
          style={styles.input}
          onChangeText={setAdd}
          value={add}
        />
        <Buttons
          addingDisabled={!add}
          deletingDisabled={list.length === 0}
          onPressAdd={onPressAdd}
          onPressDelete={onPressDelete}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {list.map((val, index) => (
            <View key={index} style={styles.textBorder}>
              <Text style={styles.text}>{val}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default App;
