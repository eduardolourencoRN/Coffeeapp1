import React, { useEffect, useState } from 'react';
import styles from '../styles/styles';
import { Text, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CardItemCreditCard() {
    const [name, setName] = useState('');
    const loadUserData = async () => {
        try {
            const userDataJSON = await AsyncStorage.getItem('userData');
            if (userDataJSON !== null) {
                const userData = JSON.parse(userDataJSON);
                const username = userData.username;
                setName(username);
            } else {
                console.log(
                    'Nenhum dado de usuário encontrado no AsyncStorage',
                );
            }
        } catch (error) {
            console.error(
                'Erro ao recuperar os dados do usuário do AsyncStorage:',
                error,
            );
        }
    };
    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <View
            style={{
                width: '90%',
                borderRadius: 20,
                height: 230,
                backgroundColor: '#9c44dc',
                marginTop: 20,
            }}
        >
            <View
                style={{
                    flexDirection: 'row-reverse',
                    width: '90%',
                    height: 60,
                }}
            >
                <Image
                    source={require('../images/mastercard.png')}
                    resizeMode='contain'
                    style={{ width: 80, height: 80 }}
                />
            </View>
            <View
                style={{
                    width: '10',
                    marginLeft: 30,
                    height: 70,
                }}
            >
                <Image
                    source={require('../images/nfc.png')}
                    resizeMode='contain'
                    style={{ width: 80, height: 80 }}
                />
            </View>
            <View
                style={{
                    width: '10',
                    marginLeft: 30,
                    height: 70,
                    flexDirection: 'row',

                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../images/nubank.png')}
                    resizeMode='contain'
                    style={{ width: 80, height: 80 }}
                />
                <Text style={styles.titleDescription}>{name}</Text>
            </View>
        </View>
    );
}

export default CardItemCreditCard;
