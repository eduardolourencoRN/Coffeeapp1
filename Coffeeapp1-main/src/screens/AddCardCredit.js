import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    PlatformColor,
} from 'react-native';
import styles from '../styles/styles';
import COLORS from '../colors/colors';
import CardItemCreditCard from '../componentes/CardItemCreditCard';
import InputField from '../componentes/InputField';

const AddCardCredit = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={PlatformColor.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.titlePrice, { marginTop: 20 }]}>
                        Adicionar cartão de Crédito
                    </Text>
                    <CardItemCreditCard />
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            marginTop: 20,
                            alignItems: 'flex-start',
                            padding: 10,
                        }}
                    >
                        <View
                            style={{
                                marginLeft: 10,
                                width: '100%',
                                height: '100%',
                                flexDirection: 'column',
                            }}
                        >
                            <InputField
                                placeholder='Nome do Titular*'
                                textAlign='left'
                                placeholderTextColor='#FFF'
                                keyboardType='decimal-pad'
                            />
                            <InputField
                                placeholder='Número do Cartão*'
                                textAlign='left'
                                placeholderTextColor='#FFF'
                                keyboardType='decimal-pad'
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <InputField
                                    placeholder='CVV*'
                                    textAlign='left'
                                    placeholderTextColor='#FFF'
                                    keyboardType='decimal-pad'
                                    maxLength={3}
                                    containerStyle={{ width: 70 }}
                                />
                                <InputField
                                    keyboardType='numeric'
                                    maxLength={4}
                                    placeholder='MM/AA*'
                                    textAlign='left'
                                    placeholderTextColor='#FFF'
                                    containerStyle={{ width: 90 }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: '35%',
                                    height: 55,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primaryOrangeHex,
                                    marginTop: 50,
                                    marginLeft: 120,
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
                                    Salvar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AddCardCredit;
