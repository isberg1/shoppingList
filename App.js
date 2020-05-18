import React, {useContext} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {ShoppingList} from './ShoppingList/ShoppingList';
import {styles} from './appStyles';
import {MyContext} from './Components/config';

const App = () => {
  const contextObject = useContext(MyContext);

  return (
    <MyContext.Provider value={contextObject}>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView} />
        <ShoppingList />
      </View>
    </MyContext.Provider>
  );
};

export default App;
