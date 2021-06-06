import React, {useMemo} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {ShoppingList} from './ShoppingList/ShoppingList';
import context from './ShoppingList/Context';
import useSettingsManager from './ShoppingList/Hooks/UseSettingsManager';
import {styles} from './appStyles';

const App = () => {
  const settings = useSettingsManager();
  const _styles = useMemo(() => styles(settings.theme), [settings.theme]);

  return (
    <context.Provider value={settings}>
      <View style={_styles.root}>
        <StatusBar backgroundColor={settings.theme.backgroundMain} />
        <SafeAreaView style={_styles.safeAreaView} />
        <ShoppingList />
      </View>
    </context.Provider>
  );
};

export default App;
