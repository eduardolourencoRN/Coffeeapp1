import React, { useEffect } from 'react';
import { FlatList, Platform, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import useCoffeeStore from '../useAppState/useGlobalState';
import CartFooter from '../componentes/CartFooter';
import Icon from 'react-native-vector-icons/Octicons';
import CartItemCart from '../componentes//CardItemCart';
function HomeScreen({ navigation }) {
    const { cartItems, incrementCartItem, decrementCartItem, removeCartItem } =
        useCoffeeStore();

    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const handleDecrement = (id, quantity) => {
        quantity === 1 ? removeCartItem(id) : decrementCartItem(id);
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const price =
            typeof item.price === 'string'
                ? parseFloat(item.price)
                : item.price;
        return isNaN(price) ? total : total + item.quantity * price;
    }, 0);

    const formattedPrice = totalPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? 50 : 0,
                }}
            >
                <TouchableOpacity
                    style={styles.containerButtonIConback}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='chevron-left' size={30} color={'#FFF'} />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.titleSecondCategory,
                        { marginLeft: 150, marginTop: 10 },
                    ]}
                >
                    Cart Items
                </Text>
            </View>
            <View style={styles.containerCartItems}>
                {cartItems.length === 0 ? (
                    <Text style={{ color: '#fff' }}>Vazio</Text>
                ) : (
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => (
                            <CartItemCart
                                item={item}
                                onDecrement={handleDecrement}
                                onIncrement={incrementCartItem}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
                {cartItems.length !== 0 && (
                    <CartFooter
                        totalPrice={formattedPrice}
                        onContinue={() => navigation.goBack()}
                    />
                )}
            </View>
        </View>
    );
}

export default HomeScreen;
