import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Image,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCoffeeStore from '../useAppState/useGlobalState'; // Importe o hook do estado global
import InternetConnectionAlert from '../utils/InternetConnectionAlert';
import COLORS from '../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [hidepassword, setHidepassword] = useState(false);
    const setUser = useCoffeeStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const login = async () => {
        try {
            setIsLoading(true);
            setLoading(true);
            const response = await fetch('http://192.168.100.129:3000/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                const { user, token } = data;
                Keyboard.dismiss();
                await AsyncStorage.setItem('userData', JSON.stringify(user));

                await AsyncStorage.setItem('token', token);
                setUser(user, token);
                setTimeout(() => {
                    setIsLoading(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                }, 2000);
            } else {
                console.error('Erro ao fazer login:', data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        } finally {
            setLoading(false);
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <InternetConnectionAlert />
            <Image
                source={require('../images/logo.png')}
                resizeMode='contain'
                style={styles.logo}
                tintColor={COLORS.primaryOrangeHex}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { marginRight: 20 }]}
                    placeholder='Nome de usuário'
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor={COLORS.primaryWhiteHex}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!hidepassword}
                    placeholderTextColor={COLORS.primaryWhiteHex}
                />
                <TouchableOpacity
                    onPress={() => setHidepassword(!hidepassword)}
                >
                    <Icon name='eye-outline' size={16} color={'white'} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={login}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color='#fff' />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            {isLoading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <ActivityIndicator
                        size='large'
                        color={COLORS.primaryOrangeHex}
                    />
                    <Text
                        style={{
                            marginTop: 10,
                            color: COLORS.primaryWhiteHex,
                            fontSize: 19,
                        }}
                    >
                        Entrando...
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    inputContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        width: 300,
        height: 40,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: COLORS.primaryOrangeHex,
        borderRadius: 10,
        borderWidth: 1,
    },
    input: {
        width: 260,
        height: 40,
        borderRadius: 10,
        color: COLORS.primaryWhiteHex,
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logo: {
        width: 300,
        height: 200,
    },
});

export default LoginScreen;
