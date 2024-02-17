import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
    ActivityIndicator,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../colors/colors';
import ProductList from '../componentes/ComponentProductCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCoffeeStore from '../useAppState/useGlobalState';

const SellerShopScreen = ({ navigation }) => {
    const [token, setToken] = useState(null);
    const [produtos, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingToken, setLoadingToken] = useState(true);
    const { user } = useCoffeeStore();

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (token !== null) {
            getProducts();
        }
    }, [token]);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
            setLoadingToken(false);
        } catch (error) {
            console.error('Error:', error);
            setLoadingToken(false);
        }
    };

    const getProducts = async () => {
        setRefreshing(true);
        try {
            const response = await fetch(
                'http://192.168.100.129:3000/myProducts',
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );
            const data = await response.json();
            setProducts(data.products);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        getProducts();
    };

    if (loadingToken) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size='large'
                    color={COLORS.primaryOrangeHex}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView
                style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 50 : 20 }}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.primaryOrangeHex]}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Central do Vendedor</Text>
                </View>

                <View style={styles.iconsContainer}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigation.navigate('AddProductScreen')}
                    >
                        <Icon name='shopping-cart' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name='cog' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name='sign-out' size={24} color='black' />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerText}>Meus produtos</Text>
                <ProductList data={produtos} horizon={true} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    icon: {
        backgroundColor: 'lightgray',
        borderRadius: 20,
        padding: 10,
    },
});

export default SellerShopScreen;
