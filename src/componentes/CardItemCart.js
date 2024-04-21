import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../colors/colors";
import styles from "../styles/styles";
import { baseURL } from "../api/apiConfig";

function CartItemCart({ item, onDecrement, onIncrement }) {
  return (
      <View style={styles.cartItem}>
        <Image
          source={{
            uri: `${baseURL}/${item.productImage}`,
          }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 12,
            marginLeft: 20,
          }}
          resizeMode="cover"
        />
        <View style={{ flexDirection: "column", gap: 8, marginLeft: 20 }}>
          <Text style={{ color: "#fff", fontSize: 20 }}>
            {item.productName}
          </Text>
          <Text style={{ color: "#fff", fontWeight:'bold' }}>R$ {item.price}</Text>
          <Text style={{ color: "#fff" }}>Quantity: {item.quantity}</Text>
          <View
            style={{
              flexDirection: "row",
              width: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => onDecrement(item.id, item.quantity)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLORS.primaryOrangeHex,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "#fff",
                width: 30,
                height: 30,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => onIncrement(item.id)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLORS.primaryOrangeHex,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}

export default CartItemCart;
