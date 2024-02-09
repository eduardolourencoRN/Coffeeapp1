import React from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import COLORS from '../colors/colors';

function CartFooter({ totalPrice, onContinue }) {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return (
        <View
            style={{
                width: width,
                height: height * 0.12,
                borderTopWidth: 1,
                borderTopColor: COLORS.primaryGreyHex,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 30,
                marginBottom: Platform.OS === 'android' ? 50 : 50,
            }}
        >
            <Text
                style={{
                    color: COLORS.primaryWhiteHex,
                    fontSize: 20,
                    fontFamily: 'Poppins-500Medium',
                }}
            >
                Total:
            </Text>
            <Text
                style={{
                    color: COLORS.primaryWhiteHex,
                    fontSize: 19,
                    fontFamily: 'Poppins-500Medium',
                }}
            >
                {totalPrice}
            </Text>
            <TouchableOpacity
                onPress={onContinue}
                style={{
                    width: '35%',
                    height: 55,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primaryOrangeHex,
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: COLORS.primaryWhiteHex,
                        fontFamily: 'Poppins-500Medium',
                    }}
                >
                    Continuar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
export default CartFooter;
