import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import IconTwo from 'react-native-vector-icons/Ionicons';
import Star from 'react-native-star-view';
import styles from '../styles/styles';
import COLORS from '../colors/colors';
import { baseURL } from '../api/apiConfig';

const ProductListItem = ({ item, onPress, onAddToCart }) => (
    <TouchableOpacity style={{ height: 250 }} onPress={() => onPress(item)}>
        <View style={styles.FlatlistProduct}>
            <View style={styles.FlatlistProductAlign}>
                <Image
                    style={{
                        width: 140,
                        height: 120,
                        marginTop: 10,
                        borderRadius: 16,
                    }}
                    source={{
                        uri: `${baseURL}/${item.productImage}`,
                    }}
                    resizeMode='cover'
                />
                <Star score={5} style={styles.star} />
                <Text style={styles.titleProduct} key={`${item.id}_name`}>
                    {item.productName}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.titlePrice} key={`${item.id}_price`}>
                        R$ {item.price}
                    </Text>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: COLORS.primaryOrangeHex,
                            borderRadius: 200,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 60,
                        }}
                    >
                        <TouchableOpacity onPress={() => onAddToCart(item)}>
                            <IconTwo
                                name='add-outline'
                                size={20}
                                color={'#FFF'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);
export default ProductListItem;
