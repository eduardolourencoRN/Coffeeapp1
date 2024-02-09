import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import useCoffeeStore from '../useAppState/useGlobalState'; // Import the Zustand store
import CartFooter from '../componentes/CartFooter';
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
            <View style={styles.containerCartItems}>
                <Text style={styles.titleSecondCategory}>Cart Items</Text>
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
