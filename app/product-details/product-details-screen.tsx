import Navbar from '@/components/NavBar';
import Navbar2 from '@/components/Navbar2';
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Pressable, FlatList } from 'react-native';
import { CheckCircleIcon, StarIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import RecomendedProducts from './(components)/RecomendedProducts';
import CustomerReview from './(components)/CustomerReview';
import SellerDetails from './(components)/SellerDetails';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { IProduct } from '@/interfaces/product.interface';
import ExpandableText from './(components)/ExpandText';
import { useCart } from '@/contexts/cart.context';
import DeliveryModal from '@/components/DelivaryModal';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { BadgeCheck, Repeat2, ShoppingBag, ShoppingCartIcon, Star, Wallet } from 'lucide-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import ProductImageSlider from './ProductImageSlider';
import { ISettings } from '@/interfaces/settings.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductScreen = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<any>('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [variantSelectError, setVariantSelectError] = useState('')
    // @ts-ignore
    const [settings, setSettings] = useState<ISettings>({})
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



    async function getSettingData() {
        try {
            const settingsString = await AsyncStorage.getItem('settings');
            if (settingsString) {
                const settings = JSON.parse(settingsString);
                setSettings(settings)
            }
            return null; // or default settings if needed
        } catch (error) {
            console.error('Failed to load settings from AsyncStorage', error);
            return null;
        }
    }

    useEffect(() => {
        getSettingData()
    }, [])



    // ========== hooks 
    const { themeColors } = useTheme()


    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.white}
                barStyle="dark-content"
            />

            {/* <View style={{
                width: '100%',
                backgroundColor: themeColors.background,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 14,
                marginTop: 24
            }}>

                <TouchableOpacity

                    // onPress={() => push('/(customTab)')} 
                    onPress={() => router.back()}


                >
                    <ChevronLeftIcon size={24} color="black" />
                </TouchableOpacity>
                <Text variant='caption-lg' style={{

                }} ></Text>

                <View>

                </View>
            </View> */}



            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    backgroundColor: themeColors.background
                }}>


                {/* Product Image */}
                <ProductImageSlider productDetails={productDetails} />


                <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>

                    {/* ======================== variants */}
                    {
                        productDetails?.variants?.length ? <>
                            <View style={{
                                paddingBottom: 16,
                                paddingTop: 14
                            }}>
                                <Text variant='caption-sm' style={{
                                    color: themeColors.neutral700,
                                    marginBottom: 8
                                }}>
                                    Select Variant :
                                    <Text variant='body-sm' style={{
                                        color: themeColors.error500,

                                    }}>  {variantSelectError}</Text>
                                </Text>

                                <FlatList
                                    horizontal
                                    data={productDetails?.variants}
                                    keyExtractor={(item) => item?.name}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ gap: 12, }}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            onPress={() => {
                                                setVariantSelectError('')
                                                setSelectedVariant(item)

                                            }}
                                            style={{
                                                paddingVertical: 10,
                                                paddingHorizontal: 24,
                                                borderWidth: 1,
                                                borderColor: selectedVariant?.name === item?.name ? themeColors.primary600 : themeColors.neutral200,
                                                backgroundColor: selectedVariant?.name === item?.name ? themeColors.primary50 : 'transparent',
                                                borderRadius: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                // marginRight: 4, 
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

                                                    ₹{settings?.store?.includeSameDayDelivery && !productDetails?.details?.brandName ? item?.discountPrice + settings?.delivery?.sameDay[0]?.price : item?.discountPrice}
                                                    {/* {item?.discountPrice} */}
                                                </Text>
                                                <Text variant='body-xxs'
                                                    style={{
                                                        color: themeColors.neutral400,
                                                        textDecorationLine: "line-through"
                                                    }}>
                                                    ₹{settings?.store?.includeSameDayDelivery && !productDetails?.details?.brandName ? item?.originalPrice + settings?.delivery?.sameDay[0]?.price : item?.originalPrice}

                                                </Text>
                                            </View>
                                        </Pressable>
                                    )}
                                />

                            </View>

                        </> : <></>
                    }






                    {/*=========================== Product Details==================================== */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 3,
                        marginVertical: 4


                    }}>

                        <MaterialIcons name="star" size={14} color={themeColors.success800} style={{
                            marginTop: -3
                        }} />
                        <Text variant="caption-sm-prominent" style={{ color: themeColors.success800 }}>
                            {productDetails?.rating}
                        </Text>
                    </View>
                    <Text variant="body-xl" style={{ marginBottom: 8, color: themeColors.neutral800 }}>{productDetails?.details?.title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 6
                    }}>
                        <Text variant="heading-sm" style={{ marginBottom: 16, color: themeColors.neutral800 }}>
                            ₹ {settings?.store?.includeSameDayDelivery && !productDetails?.details?.brandName ? productDetails?.discountPrice + settings?.delivery?.sameDay[0]?.price : productDetails?.discountPrice}


                        </Text>
                        <Text variant="caption-md" style={{ marginBottom: 16, color: themeColors.neutral800, textDecorationLine: "line-through" }}>
                            ₹{settings?.store?.includeSameDayDelivery && !productDetails?.details?.brandName ? productDetails?.originalPrice + settings?.delivery?.sameDay[0]?.price : productDetails?.originalPrice}


                        </Text>
                    </View>
                    <View style={{
                        borderTopColor: themeColors.neutral100,
                        borderTopWidth: 1
                    }} />

                    {/* ========================= features cards ============ */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                        paddingVertical: 14
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: themeColors.neutral200,
                            borderRadius: 15,
                            padding: 12,
                            height: '100%'
                        }}>
                            <Repeat2 color={themeColors.neutral600} size={24} />
                            <Text variant='caption-xs-prominent'
                                style={{
                                    color: themeColors.neutral500,
                                    marginTop: 5,
                                    textAlign: 'center'
                                }}>
                                3 Day
                            </Text>
                            <Text variant='caption-xs-prominent'
                                style={{
                                    color: themeColors.neutral500,
                                    textAlign: 'center'

                                }}>
                                Return
                            </Text>


                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: themeColors.neutral200,
                            borderRadius: 15,
                            padding: 12,
                            height: '100%'
                        }}>
                            <Wallet color={themeColors.neutral600} size={24} />
                            <Text variant='caption-xs-prominent'
                                style={{
                                    color: themeColors.neutral500,
                                    marginTop: 5,
                                    textAlign: 'center'
                                }}>
                                Pay On Delivery
                            </Text>


                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: themeColors.neutral200,
                            borderRadius: 15,
                            padding: 12,
                            height: '100%'
                        }}>
                            <BadgeCheck color={themeColors.neutral600} size={24} />
                            <Text variant='caption-xs-prominent'
                                style={{
                                    color: themeColors.neutral500,
                                    marginTop: 5,
                                    textAlign: 'center'
                                }}>
                                Verified
                            </Text>
                            <Text variant='caption-xs-prominent'
                                style={{
                                    color: themeColors.neutral500,
                                    textAlign: 'center'

                                }}>
                                Seller
                            </Text>


                        </View>


                    </View>








                    {/* ==================== */}

                    <Text variant="caption-md" style={{ marginTop: 16, color: themeColors.neutral600 }}>Product Details</Text>
                    <Text variant="caption-sm" style={{ marginTop: 12, color: themeColors.neutral700 }}>Description</Text>

                    <ExpandableText maxLength={250} text={productDetails?.details?.description?.replace(/<[^>]*>/g, "")?.trim() || ""} />;
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

                    <ShoppingBag color={themeColors.white} size={24} />


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
                    onPress={() => {

                        if (!productDetails?.variants?.length) {
                            setModalVisible(true)
                        }

                        if (selectedVariant && productDetails?.variants?.length) {
                            setVariantSelectError('')
                            setModalVisible(true)
                        } else {
                            setVariantSelectError('Please select a variant first')
                        }

                    }}
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
