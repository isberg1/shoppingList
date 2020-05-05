import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../../Styles';

const Buttons = ({
  onPress,
  onPressDelete,
  addingDisabled,
  deletingDisabled,
}) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} disabled={addingDisabled}>
          <Text
            style={[styles.button, addingDisabled ? [styles.disabled] : {}]}>
            add to list
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressDelete} disabled={deletingDisabled}>
          <Text
            style={[
              styles.buttonDelete,
              deletingDisabled ? styles.disabled : {},
            ]}>
            delete from to list
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Buttons;
