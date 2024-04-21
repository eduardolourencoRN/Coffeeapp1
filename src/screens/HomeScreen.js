import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Image,
    Animated,
} from 'react-native';
import styles from '../styles/styles';
import FloatingButton from '../componentes/FloatingButton';
import ProductList from '../componentes/ComponentProductCart';
import SearchInput from '../componentes/ComponentSearch';
import useCoffeeStore from '../useAppState/useGlobalState';
import HeaderHome from '../componentes/HeaderHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../colors/colors';

function HomeScreen({ navigation, route }) {
    const [logged, setLogged] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const { addCartItem, cartItems, incrementCartItem } = useCoffeeStore();
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        checkToken();
        getProducts();
        loadUserData();

        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    'http://192.168.100.129:3000/categories',
                );
                const data = await response.json();
                const filteredCategories = data.categories.map(
                    (category) => category.name,
                );
                setCategories(filteredCategories);
                console.log('categories', categories)
                setSelectedCategory(filteredCategories[0]); // Seleciona a primeira categoria após o fetch
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategories();
    }, []);
    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('home', token);
            if (token) {
                setLogged(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getProducts = async () => {
        setRefreshing(true);
        try {
            const response = await fetch(
                'http://192.168.100.129:3000/getProducts',
            );
            const data = await response.json();
            setProducts(data.products);
            console.log(products.categoryName);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleCategoryPress = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const filteredProducts = selectedCategory
        ? products.filter(
              (product) => product.categoryName === selectedCategory,
          )
        : products;

    const handleItemPress = (id, productName, price, productImage) => {
        navigation.navigate('ItemDetails', {
            id,
            productName,
            price,
            productImage,
        });
    };

    const AddCart = (id, productName, price, productImage) => {
        const existingCartItem = cartItems.find((c) => c.id === id);

        if (existingCartItem) {
            incrementCartItem(existingCartItem.id);
        } else {
            addCartItem({ id, productName, price, productImage, quantity: 1 });
        }
    };
    const { user } = useCoffeeStore.getState();
    console.log('userdd', user);

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

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        progressBackgroundColor={COLORS.primaryOrangeHex}
                        title='Carregando...'
                        titleColor='#FFF'
                        refreshing={refreshing}
                        onRefresh={getProducts}
                    />
                }
            >
                <HeaderHome navigation={() => navigation.navigate('Profile')} />

                <SearchInput />

                <View style={styles.containerFlatList}>
                    <View style={styles.containerFlatList}>
                        <FlatList
                            data={categories}
                            renderItem={({ item }) => (
                                
                                <TouchableOpacity
                                    onPress={() => handleCategoryPress(item)}
                                    style={[
                                        styles.item,
                                        selectedCategory === item && {
                                            backgroundColor:
                                                COLORS.primaryOrangeHex,
                                            width: item?.lenght > 6 && 150,
                                        },
                                    ]}
                                >
                                    
                                    <View style={{  width:item?.lenght > 12 && 150,}}>
                                        <Text
                                            style={[
                                                styles.title,
                                                selectedCategory === item && {
                                                    color: 'white',
                                                    
                                                },
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <ProductList
                    data={filteredProducts}
                    onPressItem={(item) =>
                        handleItemPress(
                            item.id,
                            item.productName,
                            item.price,
                            item.productImage,
                        )
                    }
                    onAddToCart={(item) =>
                        AddCart(
                            item.id,
                            item.productName,
                            item.price,
                            item.productImage,
                        )
                    }
                    horizon={true}
                />

                <View style={styles.containerSecondCategory}>
                    <Text style={styles.titleSecondCategory}>Coffee beans</Text>
                    <ProductList
                        horizon={true}
                        data={Object.values(products).flat()}
                        onPressItem={(item) =>
                            handleItemPress(
                                item.id,
                                item.productName,
                                item.price,
                                item.productImage,
                            )
                        }
                        onAddToCart={(item) => {
                            AddCart(
                                item.id,
                                item.productName,
                                item.price,
                                item.productImage,
                            );
                        }}
                    />
                </View>
                <View style={{ height: 200 }} />
            </ScrollView>
            {route.name === 'Home' && (
                <FloatingButton onPress={() => navigation.navigate('Cart')} />
            )}
        </View>
    );
}

export default HomeScreen;
