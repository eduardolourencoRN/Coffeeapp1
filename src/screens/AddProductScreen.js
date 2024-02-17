import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import CustomPicker from '../utils/CustomPicker';
export default function AddProductScreen({ navigation }) {
    const [token, setToken] = useState(null);
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [userID, setUserID] = useState('');
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    const checkToken = async () => {
        try {
            const tokenIn = await AsyncStorage.getItem('token');
            console.log('Token:', tokenIn);
            setToken(tokenIn);
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const loadUserData = async () => {
        try {
            const userDataJSON = await AsyncStorage.getItem('userData');
            if (userDataJSON !== null) {
                const userData = JSON.parse(userDataJSON);
                setUserID(userData.id);
                console.log('User ID:', userData.id);
            } else {
                console.log('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.error(
                'Error retrieving user data from AsyncStorage:',
                error,
            );
        }
    };

    const addProduct = async () => {
        try {
            if (!image) {
                console.error('Please select an image.');
                return;
            }

            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                setShowCheck(true);

                setTimeout(() => {
                    setShowCheck(false);
                    navigation.goBack();
                }, 2000);
            }, 3000);

            const formData = new FormData();
            formData.append('userId', userID);
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('description', description);
            formData.append('categoryId', categoryId);
            formData.append('productImage', {
                uri: image,
                type: 'image/jpeg',
                name: 'productImages',
            });

            const response = await fetch(
                'http://192.168.100.129:3000/addProduct',
                {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                },
            );
            const data = await response.json();
            if (response.ok) {
                console.log('Product added successfully:', data);
                Keyboard.dismiss();
            } else {
                console.error('Error adding product:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            if (!result.cancelled) {
                setImage(result.assets[0].uri);
                console.log('Selected image:', result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image from library:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            async function askForPermission() {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'granted') {
                    setPermissionGranted(true);
                }
            }
            askForPermission();
            checkToken();
            loadUserData();
            console.log('User ID:', userID);
        }, [checkToken]),
    );
    const [selectedLanguage, setSelectedLanguage] = useState();
    console.log('Image:', image);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    'http://192.168.100.129:3000/categories',
                );

                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias');
                }

                const data = await response.json();

                setCategories(data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <View style={stylesx.container}>
            <Text style={stylesx.header}>Adicionar Produtos</Text>
            {image ? (
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={stylesx.image} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={pickImage}>
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            borderWidth: 1,
                            borderColor: 'white',
                            borderRadius: 20,
                            marginBottom: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            name={'camera-outline'}
                            size={40}
                            style={{ color: '#A9A9A9' }}
                        />
                        <Text style={{ color: '#A9A9A9' }}>Imagem</Text>
                    </View>
                </TouchableOpacity>
            )}
            <TextInput
                style={stylesx.input}
                placeholder='Product Name'
                value={productName}
                onChangeText={setProductName}
                placeholderTextColor={'white'}
            />
            <TextInput
                style={stylesx.input}
                placeholder='Price'
                value={price}
                onChangeText={setPrice}
                keyboardType='numeric'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={stylesx.input}
                placeholder='Stock'
                value={stock}
                onChangeText={setStock}
                keyboardType='numeric'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={stylesx.input}
                placeholder='Description'
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={'white'}
            />
            <CustomPicker
                options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                }))}
                onSelect={(selectedCategory) =>
                    console.log('Categoria selecionada:', selectedCategory)
                }
            />
            <TextInput
                style={stylesx.input}
                placeholder='Category ID'
                value={categoryId}
                onChangeText={setCategoryId}
                placeholderTextColor={'white'}
            />
            <TouchableOpacity
                style={{
                    width: 140,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: COLORS.primaryOrangeHex,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
                onPress={addProduct}
            >
                <Text style={{ color: 'white' }}>adicionar produto</Text>
            </TouchableOpacity>

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
                </View>
            )}
            {showCheck && (
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
                    <Icon
                        name='checkmark-circle-outline'
                        size={30}
                        color={'green'}
                    />
                    <Text style={styles.title}>
                        Produto adicionado com sucesso
                    </Text>
                </View>
            )}
        </View>
    );
}

const stylesx = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLORS.primaryBlackHex,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: COLORS.primaryOrangeHex,
        color: 'white',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 20,
    },
});
