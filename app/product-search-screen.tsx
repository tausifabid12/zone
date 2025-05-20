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
    StatusBar,
    Platform,
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
import { ChevronDoubleDownIcon, ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import { ChevronDownIcon, ShoppingCartIcon } from "react-native-heroicons/outline";
import SortingModal from "@/components/SortingModal";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { ChevronRight, ChevronsLeftIcon, Search, ShoppingCart } from "lucide-react-native";
import Constants from 'expo-constants';
import { LinearGradient } from "expo-linear-gradient";




interface Idata {
    data: IProduct[]
}





const SavedProducts = () => {
    // ========================== states ============================
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSortModalVisible, setSortModalVisible] = useState(false);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [showProductList, setShowProductList] = useState(false);
    const [sortOption, setSortOption] = useState('')
    const [isQuickDeliverySelected, setIsQuickDeliverySelected] = useState(false)
    const [minRating, setMinRating] = useState(0)

    // ==========================
    const [currentPage, setCurrentPage] = useState(1)

    // Filter state
    const [sortOrder, setSortOrder] = useState('')
    const [filters, setFilters] = useState({
        origin: '80.2832,13.0878',
        sortBy: 'store.distance',
        sortOrder: 'asc',
        allIndia: '',
        quick: '',
        sameDay: '',
    });

    //======================= Hooks ================================
    const { categoryId, categoryName } = useLocalSearchParams();
    const { addToCart, cart, updateQuantity, totalItems } = useCart();
    const { themeColors } = useTheme();
    const { push } = useSafeNavigation();

    // origin = ${ filters.origin }
    // const { data, error, loading, refetch } = useQuery<Idata>(
    //     `products/list?sortBy=${sortOption}&sortOrder=${sortOrder}&maxDistance=${isQuickDeliverySelected ? '7999' : ''}&searchTerm=${searchQuery}&page=${currentPage}&limit=10&minRating=${minRating}&origin=80.230319,13.028178`
    // );
    const { data, error, loading, refetch } = useQuery<Idata>(
        `products/list?sortBy=${sortOption}&sortOrder=${sortOrder}&maxDistance=34999&searchTerm=${searchQuery}&page=${currentPage}&limit=10&minRating=${minRating}&origin=80.230319,13.028178`
    );


    // & categoryId=${ categoryId } &minRating=${minRating}

    async function getLocationAndSearch() {

        const strLocation = await AsyncStorage.getItem('userLocation');
        const location = JSON.parse(strLocation as string);


        // if (location) {
        //     setFilters(prevFilters => {
        //         const updatedFilters = {
        //             ...prevFilters,
        //             origin: `${location?.lon},${location?.lat}`
        //         };
        //         console.log(updatedFilters, '{{{{{{{{{{{');

        //         // Refetch after state update
        //         refetch();

        //         return updatedFilters;
        //     });
        // }
    }
    useEffect(() => {
        getLocationAndSearch();

        const timer = setTimeout(() => {
            setShowProductList(true);
        }, 1000);

        return () => clearTimeout(timer); // clean up
    }, [sortOption, categoryId, isQuickDeliverySelected]);







    // ================= render===============

    return (
        <>
            <LinearGradient
                colors={['#A5B4FC', '#FFFFFF']}
                style={styles.gradientBackground}
            />
            {/* <StatusBar backgroundColor={themeColors.primary600} /> */}
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{
                marginTop: 60, position: 'relative', zIndex: 200, backgroundColor: "transparent",
                paddingHorizontal: 16,
            }}>
                <TouchableOpacity
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        borderWidth: 0.4,
                        borderColor: themeColors.neutral300,
                        paddingHorizontal: 16,
                        marginBottom: 20,
                        borderRadius: 15,
                        height: 45,
                        backgroundColor: themeColors.background
                    }}>
                    <Pressable

                        // onPress={() => router.push('/(customTab)')}
                        onPress={() => router.back()}

                    >
                        <ChevronLeftIcon size={24} color={themeColors.primary600} />
                    </Pressable>
                    <TextInput
                        placeholder={`Search ${categoryName || 'Products'}`}
                        placeholderTextColor={themeColors.neutral300}
                        style={{
                            borderRadius: 15,
                            height: 47,
                            flex: 1,
                            marginLeft: 8,
                            fontSize: 14,
                            color: themeColors.neutral800,
                            fontFamily: 'Poppins_400Regular',
                            marginTop: 4,
                        }}
                        value={searchQuery} // Controlled input
                        onChangeText={(text) => setSearchQuery(text)} // Handle text change
                    />
                    <TouchableOpacity>
                        <Search size={24} color={themeColors.neutral400} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


                {/* Filter Options */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <TouchableOpacity
                        onPress={() => setFilterModalVisible(true)}
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: themeColors.neutral200,
                            borderRadius: 99999,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,

                        }}>
                        <Text variant="caption-xs" style={{ color: themeColors.neutral600 }}>
                            Filter
                        </Text>
                        <Icon name={'filter'} size={16} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            setIsQuickDeliverySelected(!isQuickDeliverySelected)
                            // setFilters((prevFilters: any) => ({
                            //     ...prevFilters,
                            //     quick: prevFilters.quick === true ? "" : true
                            // }))
                        }
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: themeColors.neutral200,
                            borderRadius: 99999,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                            backgroundColor: isQuickDeliverySelected ? themeColors.primary100 : themeColors.background
                        }}>
                        <Text variant="caption-xs" style={{ color: themeColors.neutral600 }}>
                            Quick Delivery
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSortModalVisible(true)}
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: themeColors.neutral200,
                            borderRadius: 99999,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,

                        }}>
                        <Text variant="caption-xs" style={{ color: themeColors.neutral600 }}>
                            Sort By
                        </Text>
                        <ChevronDownIcon size={16} />
                    </TouchableOpacity>

                    <View style={{
                        flex: 1,

                        borderRadius: 99999,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                    }}>


                    </View>


                </View>

                {/* Product List */}
                {
                    loading || !showProductList ?
                        <>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                // justifyContent: 'space-between',
                                marginTop: 24,
                                gap: 8
                            }}>

                                {
                                    [...Array(34)]?.map(item =>
                                        <SkeletonLoader width={'100%'} height={180} borderRadius={10} />)
                                }

                            </View>
                        </> :
                        <>

                            {
                                showProductList && (
                                    <ProductList
                                        data={data?.data || []}
                                        setModalVisible={setModalVisible}
                                        setCurrentProduct={setCurrentProduct}
                                    />
                                )
                            }
                        </>
                }






            </ScrollView>
            {
                totalItems ? <>

                    <Pressable
                        onPress={() => router.push('/(customTab)/cart-screen')}
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            left: '50%',
                            transform: [{ translateX: -90 }],
                            width: 180,
                            alignItems: 'center',
                            borderRadius: 1000,

                        }}
                    >
                        <View
                            style={{
                                backgroundColor: themeColors.primary600,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                borderRadius: 1000,
                                // paddingHorizontal: 6,
                                paddingVertical: 6,
                                paddingLeft: 6,
                                paddingRight: 2,
                                position: 'relative',
                                zIndex: -100,
                                borderRightColor: 'red'
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: themeColors.primary500,
                                    padding: 8,
                                    borderRadius: 100,
                                }}
                            >
                                <ShoppingCart color={themeColors.white} size={22} />
                            </View>
                            <View>
                                <Text variant="caption-md-prominent" style={{ color: themeColors.white }}>
                                    View cart
                                </Text>
                                <Text variant="caption-xxs" style={{ color: themeColors.white }}>
                                    {totalItems} Items
                                </Text>
                            </View>
                            <ChevronRight color={themeColors.white} />
                        </View>
                    </Pressable>


                </> : <></>
            }

            {isModalVisible && (
                <DeliveryModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    currentProduct={currentProduct}
                />
            )}
            {isSortModalVisible && (
                <SortingModal
                    isModalVisible={isSortModalVisible}
                    setModalVisible={setSortModalVisible}
                    currentProduct={currentProduct}
                    selectedOption={sortOption}
                    setSelectedOption={setSortOption}
                />
            )}
            {isFilterModalVisible && (
                <FilterModal
                    isModalVisible={isFilterModalVisible}
                    setModalVisible={setFilterModalVisible}
                    setMinRating={setMinRating}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    gradientBackground: {
        height: Constants.statusBarHeight + (Platform.OS === 'android' ? 89 : 0),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: -9, // ✅ This makes the gradient go behind
    },

    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        position: 'relative',
        zIndex: -10

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
