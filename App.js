import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {ShoppingList} from './ShoppingList/ShoppingList';
import {styles} from './appStyles';
import {SteamBlue} from './Components/commonStyles';

const App = () => {
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={SteamBlue} />
      <SafeAreaView style={styles.safeAreaView} />
      <ShoppingList />
    </View>
  );
};

export default App;
