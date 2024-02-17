import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../colors/colors';
import useCoffeeStore from '../useAppState/useGlobalState';

const FloatingButton = ({ onPress }) => {
    const cartItems = useCoffeeStore((state) => state.cartItems);

    const totalQuantity = cartItems.reduce((total, item) => {
        if (!total.find((i) => i.id === item.id)) {
            return [...total, item];
        } else {
            return total;
        }
    }, []).length;

    console.log(`Total Unique Items: ${totalQuantity}`);

    return (
        <View
            style={[
                styles.container,
                { marginBottom: Platform.OS === 'android' ? 50 : 100 },
            ]}
        >
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <View
                    style={{
                        width: 15,
                        height: 15,
                        borderRadius: 10,
                        backgroundColor: COLORS.primaryWhiteHex,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        marginLeft: 30,
                        marginTop: 12,
                        zIndex: 1,
                    }}
                >
                    <Text
                        style={{
                            height: 20,
                            color: '#000',
                            marginTop: Platform.OS === 'android' ? 0 : 2,
                        }}
                    >
                        {totalQuantity}
                    </Text>
                </View>
                <Icon
                    name='cart-outline'
                    size={25}
                    color={COLORS.primaryWhiteHex}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 16,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FloatingButton;
