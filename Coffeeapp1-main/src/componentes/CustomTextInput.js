import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import COLORS from '../colors/colors';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomTextInput = ({
    style,
    placeholder,
    keyboardAppearance,
    secureTextEntry,
    keyboardType,
    cursorColor,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={'#FFF'}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardAppearance={keyboardAppearance}
                keyboardType={keyboardType}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.08,
        gap: 5,
    },
    input: {
        flex: 1,
        color: COLORS.primaryWhiteHex,
        paddingHorizontal: 10,
        fontSize: 18,
    },
});

export default CustomTextInput;
