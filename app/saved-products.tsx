import React, { useEffect, useState } from "react";
import {
    View,
    Text as RNText,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable,
} from "react-native";

import Text from "@/components/ui/Text";

import { useTheme } from "@/contexts/theme.provider";
import { useCart } from "@/contexts/cart.context";
import { router, useLocalSearchParams } from "expo-router";
import { IProduct } from "@/interfaces/product.interface";


import { useQuery } from "@/hooks/useQuery";

import Loading from "@/components/shared/loading";
import ProductCard from "@/components/products/components/ProductCard";
import DeliveryModal from "@/components/DelivaryModal";
import FilterModal from "@/components/FilterModal";
import Icon from "@/components/shared/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductList from "@/components/products/components/ProductList";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { useWishlist } from "@/contexts/wishlist.context";
import Navbar2 from "@/components/Navbar2";





interface Idata {
    data: IProduct[]
}





const SavedProducts = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
    const [searchQuery, setSearchQuery] = useState('')

    // Filter state
    const [filters, setFilters] = useState({
        origin: '80.2832,13.0878',
        sortBy: 'store.distance',
        sortOrder: 'asc',
        allIndia: '',
        quick: '',
        sameDay: '',
    });

    // Hooks
    const { categoryId } = useLocalSearchParams();
    const { addToCart, cart, updateQuantity } = useCart();
    const { wishlist } = useWishlist()
    const { themeColors } = useTheme()




    console.log(wishlist, 'PPPPPPPPPPPPPP')




    // ================= render===============

    return (
        <>
            <Navbar2
                title=" Saved Products"

            />
            <ScrollView style={styles.container}>
                {/* <View style={{ marginTop: 60 }}>
                    <Text variant='caption-lg' style={{
                        textAlign: 'center',
                        color: themeColors.neutral900,

                    }}>
                        Saved Products
                    </Text>
                </View> */}



                {/* Product List */}
                <ProductList data={wishlist || []} setModalVisible={setModalVisible} setCurrentProduct={setCurrentProduct} />



            </ScrollView>

            {isModalVisible && (
                <DeliveryModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    currentProduct={currentProduct}
                />
            )}
            {isFilterModalVisible && (
                <FilterModal
                    isModalVisible={isFilterModalVisible}
                    setModalVisible={setFilterModalVisible}
                    currentProduct={currentProduct}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,

    },
    header: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
        marginBottom: 8,
    },
    listContainer: {
        paddingBottom: 16,
    },
    productCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingVertical: 16,
        marginBottom: 8,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderColor: "#F0F0F0",
        paddingBottom: 20
    },
    productInfo: {
        flex: 1,
        marginRight: 16,
    },
    quickTag: {
        color: "#FF9900",
        fontWeight: "600",
        marginBottom: 4,
    },
    productName: {
        color: "#333333",
        fontWeight: "600",
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 4,
        color: "#333333",
    },
    price: {
        color: "#333333",
        fontWeight: "600",
        marginBottom: 16,
    },
    actionButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    saveButton: {
        marginRight: 8,
        backgroundColor: '#FEF2F2',
        padding: 3,
        borderRadius: 8
    },
    detailsButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 8,
    },
    detailsButtonText: {
        color: "#6C63FF",
        fontWeight: "600",
    },
    productImageContainer: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    productImage: {
        width: 130,
        height: 100,
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});

export default SavedProducts;
