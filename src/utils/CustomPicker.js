import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
} from 'react-native';
import COLORS from '../colors/colors';

const CustomPicker = ({ options, selectedValue, onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectedValue}>{selectedValue}</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                />
                <View style={styles.modalContent}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => {
                                    onSelect(item.value);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.optionText}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: COLORS.primaryOrangeHex,
        color: 'white',
    },
    pickerButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    selectedValue: {
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.primaryGreyHex,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    optionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryGreyHex,
    },
    optionText: {
        color: 'white',
    },
});

export default CustomPicker;
