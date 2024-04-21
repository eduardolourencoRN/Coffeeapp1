import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ItemDetails from './src/screens/ScreenInfoProduct';
import CartScreen from './src/screens/CartScreen';
import AddCardCredit from './src/screens/AddCardCredit';
import Profile from './src/screens/Profile';
import COLORS from './src/colors/colors';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import {
    Poppins_800ExtraBold,
    Poppins_500Medium,
    Poppins_300Light,
    Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import LoginScreen from './src/screens/LoginScreen';
import useCoffeeStore from './src/useAppState/useGlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SellerShopScreen from './src/screens/SellerShop';
import AddProductScreen from './src/screens/AddProductScreen';

const Stack = createNativeStackNavigator();

function App() {
    const { user, login } = useCoffeeStore();

    const [fontsLoaded] = useFonts({
        'Poppins-ExtraBold': Poppins_800ExtraBold,
        'Poppins-500Medium': Poppins_500Medium,
        'Poppins-Light': Poppins_300Light,
        'Poppins-Regular': Poppins_400Regular,
    });

    React.useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    login({ isLoggedIn: true });
                }
            } catch (error) {
                console.error(
                    'Error retrieving token from AsyncStorage:',
                    error,
                );
            }
        };
        checkUserLoggedIn();
    }, [login]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={COLORS.primaryBlackHexs} />
            <Stack.Navigator
                initialRouteName={user.isLoggedIn ? 'Home' : 'Login'}
            >
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='ItemDetails'
                    component={ItemDetails}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name='Cart'
                    component={CartScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name='AddCardCredit'
                    component={AddCardCredit}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />

                <Stack.Screen
                    name='SellerShopScreen'
                    component={SellerShopScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />

                <Stack.Screen
                    name='AddProductScreen'
                    component={AddProductScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
