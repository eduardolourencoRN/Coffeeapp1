import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import COLORS from '../colors/colors';
const InputField = ({
  placeholder,
  style,
  keyboardType,
  maxLength,
  containerStyle,
}) => (
  <View style={[styles.inputContainer, containerStyle]}>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#FFF"
      style={[styles.input, style]}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  </View>
);
export default InputField;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 50,
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    marginLeft: 5,
  },
  inputContainer: {
    borderBottomWidth: 1,
    width: '90%',
    borderRadius: 10,
    borderColor: COLORS.primaryLightGreyHex,
  },
});
