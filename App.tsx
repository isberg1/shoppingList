/* *
 * @format
 */

import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {ShoppingList} from './ShoppingList/ShoppingList';
import context from './ShoppingList/Context';
import useSettingsManager from './ShoppingList/Hooks/UseSettingsManager';
import {styles} from './appStyles';
import {SteamBlue} from './ShoppingList/Components/commonStyles';

const App = () => {
  const settings = useSettingsManager();

  return (
    <context.Provider value={{...settings}}>
      <View style={styles.root}>
        <StatusBar backgroundColor={SteamBlue} />
        <SafeAreaView style={styles.safeAreaView} />
        <ShoppingList />
      </View>
    </context.Provider>
  );
};

export default App;
