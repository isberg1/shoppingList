import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Slider} from 'react-native';

import {styles} from './styles';
import {Icon, Overlay} from 'react-native-elements';

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setShowSettings((val) => !val)}
      >
        <Icon name="settings" type="AndCards " color="#fff" />
      </TouchableOpacity>

      <Overlay isVisible={showSettings}>
        <View style={styles.click}>
          <TouchableOpacity onPress={() => setShowSettings((val) => !val)}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Slider minimumValue={15} maximumValue={50} value={30} />
        </View>
      </Overlay>
    </View>
  );
};
