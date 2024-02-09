import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import COLORS from '../colors/colors';
import styles from '../styles/styles';
import InfoProfileContainer from '../componentes/ContainerInfoProfile';
import useCoffeeStore from '../useAppState/useGlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../api/apiConfig';
import { useNavigation } from '@react-navigation/native';
function Profile() {
    const { logout, user } = useCoffeeStore();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const [imagem, setImagem] = useState('');
    const [name, setName] = useState('');
    const handleLogout = async () => {
        setIsLoading(true);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userData');
        setTimeout(() => {
            setIsLoading(false);
            logout({ isLoggedIn: false });
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }, 2000);
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userDataJSON = await AsyncStorage.getItem('userData');
            if (userDataJSON !== null) {
                const userData = JSON.parse(userDataJSON);
                // Agora você pode usar os dados do usuário (userData) como necessário
                const profileImage = userData.profileImage;
                const username = userData.username;
                setImagem(profileImage);
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

    return (
        <ScrollView style={{ flex: 1 }}>
            {!user.isLoggedIn ? (
                <>
                    <InfoProfileContainer
                        texto={'Login'}
                        icon={'log-in-outline'}
                        onPress={() => navigation.navigate('Login')}
                    />
                </>
            ) : (
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <View
                            style={{
                                width: '100%',
                                height: 70,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={styles.containerButtonIConback}
                                onPress={() => navigation.goBack()}
                            >
                                <Icon
                                    name='chevron-left'
                                    size={30}
                                    color={'#FFF'}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 30,
                                    marginLeft: 175,
                                    marginTop: 10,
                                    color: COLORS.primaryWhiteHex,
                                    fontFamily: 'Poppins-Regular',
                                }}
                            >
                                Perfil
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={{
                                    marginTop: 20,
                                    width: 120,
                                    marginLeft: 10,
                                    height: 120,
                                    borderRadius: 60,
                                }}
                                resizeMode='stretch'
                                source={{
                                    uri: `${baseURL}/${imagem}`,
                                }}
                            />
                            <Text style={[styles.title, { marginLeft: 20 }]}>
                                {name}
                            </Text>
                            <InfoProfileContainer
                                texto={'Dados do usuario'}
                                icon={'person-outline'}
                            />
                            <InfoProfileContainer
                                texto={'Carteira'}
                                icon={'wallet-outline'}
                                onPress={() =>
                                    navigation.navigate('AddCardCredit')
                                }
                            />
                            <InfoProfileContainer
                                texto={'Minha Loja'}
                                icon={'storefront-outline'}
                                onPress={() =>
                                    navigation.navigate('SellerShopScreen')
                                }
                            />
                            <InfoProfileContainer
                                texto={'Configutações'}
                                icon={'cog-outline'}
                            />
                            <InfoProfileContainer
                                texto={'Ajuda'}
                                icon={'help-outline'}
                            />
                            <InfoProfileContainer
                                onPress={handleLogout}
                                texto='Logout'
                                icon={'log-out-outline'}
                                style={{
                                    width: 200,
                                    backgroundColor: 'red',
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}
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
                        Saindo...
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

export default Profile;
