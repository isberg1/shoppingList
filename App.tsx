import React, {useMemo} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {ShoppingList} from './ShoppingList/ShoppingList';
import {SettingsProvider} from './ShoppingList/SettingsContext/SettingsProvider';
import useSettings from './ShoppingList/Hooks/UseSettings';
import {styles} from './appStyles';

const App = () => {
  const settings = useSettings();
  const _styles = useMemo(() => styles(settings.theme), [settings.theme]);

  return (
    <SettingsProvider>
      <View style={_styles.root}>
        <StatusBar backgroundColor={settings.theme.backgroundMain} />
        <SafeAreaView style={_styles.safeAreaView} />
        <ShoppingList />
      </View>
    </SettingsProvider>
  );
};

export default App;
