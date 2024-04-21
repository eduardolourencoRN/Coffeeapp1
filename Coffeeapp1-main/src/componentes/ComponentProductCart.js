import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import styles from '../styles/styles';
import ProductListItem from './ProductListItem';

const width = Dimensions.get('window').width;

const ProductList = ({
    data,
    style,
    onPressItem,
    onAddToCart,
    columns = 1,
    horizon = false,
}) => {
    // Estilos específicos para a FlatList quando em modo de colunas
    const columnStyles =
        columns > 1 ? { flexDirection: 'row', flexWrap: 'wrap' } : {};

    return (
        <View style={[styles.containerFlatListProduct, style]}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ProductListItem
                        item={item}
                        onPress={onPressItem}
                        onAddToCart={onAddToCart}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal={horizon}
                showsHorizontalScrollIndicator={false}
                numColumns={columns}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, width: 10 }} />
                )}
                style={columnStyles} // Aplicando estilos específicos para modo de colunas
            />
        </View>
    );
};

export default ProductList;
