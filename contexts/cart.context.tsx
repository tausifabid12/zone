import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProduct, IVariant } from '@/interfaces/product.interface';




interface IAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}


// Define the CartItem interface
interface CartItem {
    product: IProduct;
    variant?: IVariant; // Variant is now optional
    quantity: number;
    deliveryOptions: 'sameDay' | "allIndia" | "quick"
}

// Define the CartContextType interface
interface CartContextType {
    address: IAddress;
    addAddress: (address: IAddress) => void;
    cart: CartItem[];
    addToCart: (product: IProduct, variant: IVariant | null, quantity: number, deliveryOptions: 'sameDay' | "allIndia" | "quick") => void;
    removeFromCart: (id: string, variantId?: string) => void;
    updateQuantity: (id: string, variantId?: string, quantity: number) => void;
    clearCart: () => void;
    totalPrice: number;
    totalSameDayPrice: number;
    totalQuickPrice: number;
    totalAllIndiaPrice: number;
    totalItems: number;
    updateDeliveryOptionsToSameDay: (itemsToUpdate: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    // @ts-ignore
    const [selectedAddress, setSelectedAddress] = useState<IAddress>(null)
    const CART_STORAGE_KEY = 'cart';

    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error('Failed to load cart from storage', error);
            }
        };

        loadCart();
    }, []);

    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            } catch (error) {
                console.error('Failed to save cart to storage', error);
            }
        };

        saveCart();
    }, [cart]);

    const addToCart = (product: IProduct, variant: IVariant | null, quantity: number, deliveryOptions: 'sameDay' | "allIndia" | "quick" = 'sameDay') => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.product._id === product._id && (!variant || item.variant?._id === variant._id)
            );

            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [
                    ...prevCart,
                    {
                        product,
                        variant: variant || undefined,
                        quantity,
                        deliveryOptions: deliveryOptions,
                    },
                ];
            }
        });
    };
    const addAddress = (address: IAddress) => {
        setSelectedAddress(address)
    };

    const removeFromCart = (id: string, variantId?: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item.product._id === id && (!variantId || item.variant?._id === variantId)))
        );
    };

    const updateQuantity = (id: string, variantId?: string, quantity: number) => {

        console.log(id, quantity, 'quantity        quantity         quantity        quantity', variantId)
        console.log(id, quantity, 'quantity        quantity         quantity        quantity', variantId)


        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => {
                if (item.product._id === id && (!variantId || item.variant?._id === variantId)) {
                    return quantity > 0;
                }
                return true;
            });

            const itemIndex = updatedCart.findIndex(
                (item) => item.product._id === id && (!variantId || item.variant?._id === variantId)
            );
            if (itemIndex >= 0 && quantity > 0) {
                updatedCart[itemIndex].quantity = quantity;
            }

            return updatedCart;
        });
    };

    const clearCart = async () => {
        setCart([]);
        try {
            await AsyncStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear cart from storage', error);
        }
    };
    const updateDeliveryOptionsToSameDay = (itemsToUpdate: CartItem[]) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                const shouldUpdate = itemsToUpdate.some(
                    (i) =>
                        i.product._id === item.product._id &&
                        (!i.variant?._id || i.variant._id === item.variant?._id)
                );

                if (shouldUpdate) {
                    return {
                        ...item,
                        deliveryOptions: 'sameDay',
                    };
                }

                return item;
            })
        );
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + (item.variant?.discountPrice || item.product.discountPrice) * item.quantity,
        0
    );

    const totalSameDayPrice = cart.reduce(
        (sum, item) =>
            item?.deliveryOptions == 'sameDay' ? sum + (item.variant?.discountPrice || item.product.discountPrice) * item.quantity : sum,
        0
    );

    const totalQuickPrice = cart.reduce(
        (sum, item) =>
            item?.deliveryOptions == 'quick' ? sum + (item.variant?.discountPrice || item.product.discountPrice) * item.quantity : sum,
        0
    );

    const totalAllIndiaPrice = cart.reduce(
        (sum, item) =>
            item?.deliveryOptions == 'allIndia' ? sum + (item.variant?.discountPrice || item.product.discountPrice) * item.quantity : sum,
        0
    );


    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalPrice,
                totalSameDayPrice,
                totalQuickPrice,
                totalAllIndiaPrice,
                address: selectedAddress,
                addAddress,
                totalItems,
                updateDeliveryOptionsToSameDay,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
