import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import styles from '../styles/styles';
import COLORS from '../colors/colors';
import useCoffeeStore from '../useAppState/useGlobalState';
import { baseURL } from '../api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HeaderHome({ navigation }) {
    const { user } = useCoffeeStore.getState();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [imagem, setImagem] = useState('');
    console.log('iamgem:', user.userData?.profileImage);

    const loadUserData = async () => {
        try {
            const userDataJSON = await AsyncStorage.getItem('userData');
            if (userDataJSON !== null) {
                const userData = JSON.parse(userDataJSON);
                const profileImage = userData.profileImage;

                setImagem(profileImage);
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
        <View style={styles.containerPrimary}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{ alignItems: 'center', justifyContent: 'center' }}
            >
                <Image
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primaryWhiteHex,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    resizeMode='contain'
                    resizeMethod='resize'
                    source={require('../images/menu.png')}
                />
            </TouchableOpacity>
            <View
                style={[
                    styles.containerTextHome,
                    {
                        height: 50,
                        justifyContent: 'center',
                    },
                ]}
            >
                <Image
                    source={require('../images/logo.png')}
                    resizeMode='contain'
                    style={{
                        width: 200,
                        height: 110,
                        marginLeft: 10,
                    }}
                    tintColor={COLORS.primaryOrangeHex}
                />
            </View>
            {!user.isLoggedIn ? (
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={navigation}
                >
                    <Image
                        style={{
                            marginTop: 20,
                            width:
                                Platform.OS === 'ios'
                                    ? width * 0.17
                                    : width * 0.12,
                            marginRight: 20,
                            height:
                                Platform.OS === 'ios'
                                    ? height * 0.07
                                    : height * 0.07,
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        resizeMode='stretch'
                        source={require('../images/avatadefault.jpg')}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={navigation}
                >
                    <Image
                        style={{
                            marginTop: 20,
                            width:
                                Platform.OS === 'ios'
                                    ? width * 0.17
                                    : width * 0.12,
                            marginRight: 20,
                            height:
                                Platform.OS === 'ios'
                                    ? height * 0.07
                                    : height * 0.06,
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        resizeMode='stretch'
                        source={{
                            uri: `${baseURL}/${imagem}`,
                        }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
export default HeaderHome;
