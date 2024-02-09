// InternetConnectionCheck.js
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const InternetConnectionCheck = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        console.log('Is connected?', isConnected); // Adicione esta linha para depurar
        if (!isConnected) {
            Alert.alert(
                'Sem conexão com a Internet',
                'Por favor, verifique sua conexão com a Internet e tente novamente.',
                [{ text: 'OK' }],
            );
        }
    }, [isConnected]);

    return null;
};

export default InternetConnectionCheck;
