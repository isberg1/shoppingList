import React, {useState, useContext, useCallback} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon, Overlay} from 'react-native-elements';
import context from '../../Context';
import {styles, colors} from './styles';
import {SortOptions, maximumFontSize, minimumFontSize} from '../../config';

const sort = {
  [SortOptions.FIFO]: 'Oldest first',
  [SortOptions.LIFO]: 'Newest first',
};

type Props = {
  onSortList: (option: SortOptions) => void;
};

export const Settings = ({onSortList}: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const {fontSize, setFontSize, sortOrder, setSortOrder} = useContext(context);

  const onClickSort = useCallback(
    (option: SortOptions) => {
      onSortList(option);
      setSortOrder(option);
    },
    [onSortList, setSortOrder],
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setShowSettings((val) => !val)}
      >
        <Icon name="settings" type="AndCards " color="#fff" size={40} />
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
              minimumValue={minimumFontSize}
              maximumValue={maximumFontSize}
              step={1}
              value={fontSize}
              thumbTintColor={colors.black}
              maximumTrackTintColor={colors.black}
            />

            <View>
              <Text style={styles.header}>Sort order:</Text>

              {[SortOptions.LIFO, SortOptions.FIFO].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => onClickSort(option)}
                  style={[
                    styles.settingsEntriesContainer,
                    option === sortOrder && styles.currentSort,
                  ]}
                >
                  <Text style={styles.text}>{sort[option]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};
