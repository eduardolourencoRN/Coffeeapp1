import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import COLORS from '../colors/colors';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/Octicons';
import useCoffeeStore from '../useAppState/useGlobalState';
import styles from '../styles/styles';
import CustomTextInput from '../componentes/CustomTextInput';
import { baseURL } from '../api/apiConfig';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ItemDetails({ navigation }) {
    const { addCartItem, cartItems, incrementCartItem } = useCoffeeStore();
    const { params: item } = useRoute();
    console.log('fffff', item);
    const AddCart = (id, name, price, productImage) => {
        const existingCartItem = cartItems.find((c) => c.id === id);
        if (existingCartItem) {
            incrementCartItem(existingCartItem.id);
        } else {
            addCartItem({ id, name, price, productImage, quantity: 1 });
        }
    };

    return (
        <ScrollView style={{ width: width, height: height }}>
            <View style={styles.container}>
                <Image
                    style={{ width: '100%', height: height * 0.5 }}
                    source={{
                        uri: `${baseURL}/${item.productImage}`,
                    }}
                />
                <TouchableOpacity
                    style={styles.containerButtonIConback}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='chevron-left' size={30} color={'#FFF'} />
                </TouchableOpacity>
                <View style={styles.containerDetailsProduct}>
                    <View
                        style={{
                            marginLeft: 20,
                            alignItems: 'flex-start',
                            gap: 10,
                        }}
                    >
                        <Text style={styles.titleDescription}>
                            {item.productName}
                        </Text>
                        <Star score={5} style={styles.starDescription} />
                        <Text
                            style={[
                                styles.starDescription,
                                { fontSize: 19, marginLeft: 3 },
                            ]}
                        >
                            R$ {item.price}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        width: '100%',
                        height: height,
                        backgroundColor: COLORS.primaryBlackHex,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={[
                                styles.titleDescription,
                                { fontSize: 19, marginLeft: 3 },
                            ]}
                        >
                            Descrição
                        </Text>
                        <Text style={styles.titledesc}>
                            Espresso é feito ao forçar água quase fervente
                            através de grãos de café moídos finamente, o que
                            resulta em uma bebida de café concentrada e
                            xaroposa. Esta é a base para muitas bebida italianas
                            em cafeterias. Quando comparado ao café coado
                            normal, o espresso é muito mais forte do que os
                            outros tipos de bebidas de café. Espressos são
                            apreciados em doses, onde um único shot tem uma onça
                            e um longo (simples e duplo) tem duas onças,
                            respectivamente.
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            AddCart(
                                item.id,
                                item.name,
                                item.price,
                                item.productImage,
                            )
                        }
                        style={styles.Button}
                    >
                        <Text style={styles.title}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ItemDetails;
