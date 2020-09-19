import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';

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
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor="#000000"
            maximumTrackTintColor="#000000"
          />
        </View>
      </Overlay>
    </View>
  );
};
