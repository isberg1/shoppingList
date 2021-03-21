import React, {useState, useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon, Overlay} from 'react-native-elements';
import context from '../../Context';
import {styles, colors} from './styles';
import {SortOptions} from '../../config';

const displayNames = {
  [SortOptions.Fifo]: 'elste øverst',
  [SortOptions.Lifo]: 'nyeste øverst',
};

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {fontSize, setFontSize, sortOrder, setSortOrder} = useContext(context);

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
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>

          <View style={styles.settingsEntriesContainer}>
            <View style={styles.settingsTextRow}>
              <Text style={styles.header}>Text Size:</Text>
              <Text>{fontSize.toString()}</Text>
            </View>

            <Slider
              onValueChange={(val) => setFontSize(val)}
              style={styles.slider}
              minimumValue={15}
              maximumValue={50}
              step={1}
              value={fontSize}
              thumbTintColor={colors.black}
              maximumTrackTintColor={colors.black}
            />

            <View>
              <Text style={styles.header}>Sort order:</Text>

              {[SortOptions.Fifo, SortOptions.Lifo].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSortOrder(option)}
                  style={option === sortOrder && styles.currentSort}
                >
                  <Text style={styles.text}>{displayNames[option]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};
