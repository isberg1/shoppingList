import React, {useState, useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon, Overlay} from 'react-native-elements';
import context from '../../Context';
import {styles} from './styles';

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {fontSize, setFontSize} = useContext(context);

  return (
    <View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setShowSettings((val) => !val)}
      >
        <Icon name="settings" type="AndCards " color="#fff" />
      </TouchableOpacity>

      <Overlay isVisible={showSettings}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowSettings((val) => !val)}
          >
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{fontSize.toString()}</Text>
          <Slider
            onValueChange={(val) => setFontSize(val)}
            style={styles.slider}
            minimumValue={15}
            maximumValue={50}
            step={1}
            value={fontSize}
            thumbTintColor="#000000"
            maximumTrackTintColor="#000000"
          />
        </View>
      </Overlay>
    </View>
  );
};
