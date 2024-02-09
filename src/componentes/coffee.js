import React from 'react';
import { View, Text } from 'react-native';
import CartItem from '../useAppState/useGlobalState';

const Cart = ({
    cartItems,
    totalPrice,
    onIncrement,
    onDecrement,
    onRemove,
}) => (
    <View>
        <Text>Cart:</Text>
        {cartItems.map((item, index) => (
            <CartItem
                key={index}
                item={item}
                onIncrement={() => onIncrement(index)}
                onDecrement={() => onDecrement(index)}
                onRemove={() => onRemove(index)}
            />
        ))}
        <Text>Total: ${totalPrice}</Text>
    </View>
);

export default Cart;
