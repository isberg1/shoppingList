import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {ShoppingList} from './ShoppingList/ShoppingList';
import {styles} from './appStyles';

const App = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView} />
      <ShoppingList />
    </View>
  );
};

export default App;
