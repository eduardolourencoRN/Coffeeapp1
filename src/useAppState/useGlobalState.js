import { create } from 'zustand';

const useCoffeeStore = create((set) => ({
    cartItems: [],
    user: {
        isLoggedIn: false,
        userData: null,
        username: '',
        token: null,
    },
    login: (userData, token) =>
        set((state) => ({
            user: {
                isLoggedIn: true,
                userData: userData,
                username: userData.username,
                token: token,
            },
        })),
    logout: () =>
        set((state) => ({
            user: {
                isLoggedIn: false,
                userData: null,
                username: '',
            },
        })),
    updateUser: (newUserData) =>
        set((state) => ({
            user: {
                ...state.user,
                userData: {
                    ...state.user.userData,
                    ...newUserData,
                },
            },
        })),
    addCartItem: (item) =>
        set((state) => ({ cartItems: [...state.cartItems, item] })),
    removeCartItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
    incrementCartItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item,
            ),
        })),
    decrementCartItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Math.max((item.quantity || 1) - 1, 0),
                      }
                    : item,
            ),
        })),
}));

export default useCoffeeStore;
