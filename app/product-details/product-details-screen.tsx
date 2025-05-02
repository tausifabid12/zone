import Navbar from '@/components/NavBar';
import Navbar2 from '@/components/Navbar2';
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Pressable, FlatList } from 'react-native';
import { CheckCircleIcon, StarIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import RecomendedProducts from './(components)/RecomendedProducts';
import CustomerReview from './(components)/CustomerReview';
import SellerDetails from './(components)/SellerDetails';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { IProduct } from '@/interfaces/product.interface';
import ExpandableText from './(components)/ExpandText';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import { useCart } from '@/contexts/cart.context';
import DeliveryModal from '@/components/DelivaryModal';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';


const ProductScreen = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<any>('')
    const [isModalVisible, setModalVisible] = useState(false);
    const { push } = useSafeNavigation();

    const { data } = useLocalSearchParams();
    const { addToCart, cart, totalItems } = useCart();

    const productDetails: IProduct = JSON.parse(data as string)

    const handleAddToCart = () => {
        const variant = selectedVariant;
        addToCart(productDetails, variant, 1, 'sameDay');
    };


    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(themeColors.white);
            StatusBar.setBarStyle('dark-content');
        }, [])
    );



    // ========== hooks 
    const { themeColors } = useTheme()


    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.white}
                barStyle="dark-content"
            />

            <View style={{
                width: '100%',
                backgroundColor: themeColors.background,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 14,
                marginTop: 24
            }}>

                <TouchableOpacity onPress={() => push('/(customTab)')} >
                    <ChevronLeftIcon size={24} color="black" />
                </TouchableOpacity>
                <Text variant='caption-lg' style={{

                }} >Product Details</Text>

                <View>

                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    backgroundColor: themeColors.background
                }}>
                {/* Product Image */}
                <View style={{
                    height: 334,
                    paddingHorizontal: 48,
                    width: '100%',
                    backgroundColor: themeColors.background,
                    paddingVertical: 15

                }}>
                    <Image
                        source={{ uri: productDetails?.details?.thumbnail || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s' }} // Replace with your image path
                        style={{ width: '100%', height: '100%', marginBottom: 16 }}
                        resizeMode="contain"
                    />

                </View>

                <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>

                    {/* ======================== variants */}
                    {
                        productDetails?.variants?.length ? <>
                            <View style={{
                                paddingVertical: 16
                            }}>
                                <Text variant='caption-sm' style={{
                                    color: themeColors.neutral700,
                                    marginBottom: 8
                                }}>
                                    Select
                                </Text>

                                <FlatList
                                    horizontal
                                    data={productDetails?.variants}
                                    keyExtractor={(item) => item?.name}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            onPress={() => setSelectedVariant(item)}
                                            style={{
                                                paddingVertical: 10,
                                                paddingHorizontal: 24,
                                                borderWidth: 1,
                                                borderColor: selectedVariant?.name === item?.name ? themeColors.neutral600 : themeColors.neutral200,
                                                borderRadius: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: 4, // Optional, for spacing if `gap` doesn't apply
                                            }}
                                        >
                                            <Text
                                                variant='body-sm'
                                                style={{
                                                    color: themeColors.neutral900,
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {item?.name}
                                            </Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 4
                                            }}>
                                                <Text variant='caption-sm-prominent'
                                                    style={{
                                                        color: themeColors.neutral900,
                                                    }}>
                                                    ₹{item?.discountPrice}
                                                </Text>
                                                <Text variant='body-xxs'
                                                    style={{
                                                        color: themeColors.neutral400,
                                                    }}>
                                                    ₹{item?.originalPrice}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )}
                                />

                            </View>

                        </> : <></>
                    }






                    {/*=========================== Product Details==================================== */}
                    <Text variant="body-lg" style={{ marginBottom: 8, color: themeColors.neutral800 }}>{productDetails?.details?.title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 6
                    }}>
                        <Text variant="heading-sm" style={{ marginBottom: 16, color: themeColors.neutral800 }}>₹{productDetails?.discountPrice}</Text>
                        <Text variant="caption-md" style={{ marginBottom: 16, color: themeColors.neutral800, textDecorationLine: "line-through" }}>₹{productDetails?.originalPrice}</Text>
                    </View>
                    <Text variant="caption-md" style={{ marginTop: 32, color: themeColors.neutral600 }}>Product Details</Text>
                    <Text variant="caption-sm" style={{ marginTop: 12, color: themeColors.neutral700 }}>Description</Text>

                    <ExpandableText text={productDetails?.details?.description?.replace(/<[^>]*>/g, "")?.trim() || ""} />;
                    {/* <Text variant="body-sm" style={{ marginTop: 8, color: themeColors?.neutral700, textAlign: 'justify' }}>
                        {productDetails?.details?.description}
                    </Text> */}



                    {/*================================= Seller Details====================================== */}
                    <Text variant="caption-md" style={{ marginTop: 32, color: themeColors.neutral600 }}>Seller Details</Text>
                    <SellerDetails data={productDetails} />


                    {/*================================= Related Products =========================================*/}

                    <RecomendedProducts />




                    {/*========================================== Reviews =======================================*/}
                    <CustomerReview data={productDetails} />

                </View >

                <View style={{
                    paddingBottom: 90
                }}>

                </View>

            </ScrollView>


            <View style={{
                paddingHorizontal: 32,
                paddingTop: 12,
                // paddingBottom: 42,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 32
            }}>

                <Pressable
                    onPress={() => router.push('/(customTab)/cart-screen')}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        backgroundColor: themeColors.primary600,
                        borderRadius: 10000,
                        position: 'relative'
                    }}>

                    <Image source={require('../../assets/icons/common/Cart3.png')} style={{
                        width: 24,
                        height: 24,
                    }} />


                    <View style={{
                        backgroundColor: themeColors.error600,

                        borderRadius: 1000,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // padding: 4,
                        position: 'absolute',
                        width: 25,
                        height: 25,
                        top: -7,
                        left: -7
                        // width: 
                    }}>
                        <Text variant="caption-xxs-prominent" style={{ color: themeColors.white, }}>{totalItems}</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => setModalVisible(true)}
                    // onPress={handleAddToCart}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: themeColors.primary600,
                        borderRadius: 14,
                        flex: 1,
                        flexDirection: 'row',
                        gap: 10
                    }}>
                    <ShoppingCartIcon color={themeColors.white} />
                    <Text variant="caption-lg-prominent" style={{ color: themeColors.white }}>Add to cart</Text>

                    {/* <Image source={require('../../assets/icons/common/WhiteArrowRight.png')} style={{
                        width: 22,
                        height: 22,
                    }} /> */}
                </Pressable>

            </View>


            {isModalVisible && (
                <DeliveryModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    currentProduct={productDetails}
                    selectedVariant={selectedVariant}
                />
            )}
        </>
    );
};

export default ProductScreen;
