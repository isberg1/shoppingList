import React, {useState, useMemo, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon, Overlay} from 'react-native-elements';
import {styles, colors} from './styles';
import {SortOptions, maximumFontSize, minimumFontSize, themes} from '../../config';
import {Text} from '../Text/Text';
import UseSettings from '../../Hooks/UseSettings';

const sort = {
  [SortOptions.FIFO]: 'Oldest first',
  [SortOptions.LIFO]: 'Newest first',
};

type Props = {
  onSortList: (option: SortOptions) => void;
};

export const Settings = ({onSortList}: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const {fontSize, setFontSize, sortOrder, setSortOrder, theme, setTheme} = UseSettings();
  const _styles = useMemo(() => styles(theme), [theme]);

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
        style={_styles.settingsIcon}
        onPress={() => setShowSettings((val) => !val)}
      >
        <Icon name="settings" type="AndCards " color="#fff" size={40} />
      </TouchableOpacity>

      <Overlay isVisible={showSettings}>
        <View style={_styles.modal}>
          <TouchableOpacity
            style={_styles.button}
            onPress={() => setShowSettings((val) => !val)}
          >
            <Text style={_styles.text}>Close</Text>
          </TouchableOpacity>

          <View style={_styles.settingsEntriesContainer}>
            <View style={_styles.settingsTextRow}>
              <Text style={_styles.header}>Text Size:</Text>
              <Text>{fontSize.toString()}</Text>
            </View>

            <Slider
              onValueChange={(val) => setFontSize(val)}
              style={_styles.slider}
              minimumValue={minimumFontSize}
              maximumValue={maximumFontSize}
              step={1}
              value={fontSize}
              thumbTintColor={colors.black}
              maximumTrackTintColor={colors.black}
            />

            <View>
              <Text style={_styles.header}>Sort order:</Text>

              {[SortOptions.LIFO, SortOptions.FIFO].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => onClickSort(option)}
                  style={[
                    _styles.settingsEntriesContainer,
                    option === sortOrder && _styles.currentSelected,
                  ]}
                >
                  <Text style={_styles.text}>{sort[option]}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <Text style={_styles.header}>Themes:</Text>

              {Object.entries(themes).map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setTheme(value)}
                  style={[
                    _styles.settingsEntriesContainer,
                    value.id === theme.id && _styles.currentSelected,
                  ]}
                >
                  <Text style={_styles.text}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};
