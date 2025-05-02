import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProduct } from '@/interfaces/product.interface';

type WishlistState = {
    wishlist: IProduct[];
};

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: IProduct }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
    | { type: 'CLEAR_WISHLIST' }
    | { type: 'SET_WISHLIST'; payload: IProduct[] };

const initialState: WishlistState = {
    wishlist: [],
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.wishlist.some(item => item._id === action.payload._id)) return state;
            return { ...state, wishlist: [...state.wishlist, action.payload] };

        case 'REMOVE_FROM_WISHLIST':
            return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload) };

        case 'CLEAR_WISHLIST':
            return { ...state, wishlist: [] };

        case 'SET_WISHLIST':
            return { ...state, wishlist: action.payload };

        default:
            return state;
    }
}

type WishlistContextType = {
    wishlist: IProduct[];
    addToWishlist: (product: IProduct) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (product: IProduct) => void;
    clearWishlist: () => void;
    getWishlist: () => IProduct[];
    isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'wishlist_products';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    // Load wishlist from AsyncStorage on mount
    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                if (jsonValue != null) {
                    const parsed: IProduct[] = JSON.parse(jsonValue);
                    dispatch({ type: 'SET_WISHLIST', payload: parsed });
                }
            } catch (e) {
                console.error('Failed to load wishlist from storage', e);
            }
        };

        loadWishlist();
    }, []);

    // Save to AsyncStorage whenever wishlist changes
    useEffect(() => {
        const saveWishlist = async () => {
            try {
                const jsonValue = JSON.stringify(state.wishlist);
                await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            } catch (e) {
                console.error('Failed to save wishlist to storage', e);
            }
        };

        saveWishlist();
    }, [state.wishlist]);

    const addToWishlist = (product: IProduct) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    };

    const removeFromWishlist = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const getWishlist = () => state.wishlist;

    const isInWishlist = (productId: string) => {
        return state.wishlist.some(product => product._id === productId);
    };

    const toggleWishlist = (product: IProduct) => {
        const exists = isInWishlist(product._id);
        if (exists) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist: state.wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                clearWishlist,
                getWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
    return context;
};
