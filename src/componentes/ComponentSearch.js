import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import COLORS from '../colors/colors';
import styles from '../styles/styles';

const SearchInput = () => {
  return (
    <View style={styles.InputContainerComponent}>
      <Icon
        name="search"
        size={40}
        color={COLORS.primaryLightGreyHex}
        style={{marginLeft: 12, marginBottom: 10}}
      />
      <TextInput
        style={styles.TextInputContainer}
        placeholder="Find Your Coffee..."
        placeholderTextColor={COLORS.primaryLightGreyHex}
      />
    </View>
  );
};

export default SearchInput;
