

import { useTheme } from '@/contexts/theme.provider';
import { router, useFocusEffect, useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    useAnimatedScrollHandler,
    Easing,
    ReduceMotion,
    useAnimatedRef,
    scrollTo,
    useDerivedValue,

} from 'react-native-reanimated';
import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StatusBar, Pressable, ScrollView, BackHandler } from 'react-native';

// import SelectAddressModal from '../cart/components/select-address-modal';
import Banners from '@/components/home/quick-delivery/Banners';
import Category from '@/components/home/quick-delivery/Category';
import Footer from '@/components/home/quick-delivery/Footer';
import Products from '@/components/home/quick-delivery/Products';
import Text from '@/components/ui/Text';
import Entypoicons from '@expo/vector-icons/Entypo';
import AntDesignIcons from '@expo/vector-icons/AntDesign';
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import EvilIconsIcons from '@expo/vector-icons/EvilIcons';
import { useQuery } from '@/hooks/useQuery';
import { IProduct } from '@/interfaces/product.interface';
import { ICategory } from '@/interfaces/category.interface';
import Loading from '@/components/shared/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '@/contexts/cart.context';
import SelectAddressModal from '@/components/select-address-modal';
import { useNavigation } from 'expo-router';
import { useDebouncedNavigation } from '@/hooks/useDebouncedNavigation';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import CloseModal from '@/components/CloseModal';
import { Search } from 'lucide-react-native';
// import analytics from '@react-native-firebase/analytics';



interface IProductData {
    data: IProduct[]
}
interface ICategoryData {
    data: ICategory[]
}


const QuickHOme = () => {
    // const { tabBarVisibility } = route.params;
    // ================== states
    const [addressModalOpen, setAddressModalOpen] = useState(false)
    const [location, setLocation] = useState('')
    const animatedRef = useAnimatedRef<Animated.ScrollView>(); // Reference for the ScrollView
    const scroll = useSharedValue<number>(0);
    const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)
    const [showExitModal, setShowExitModal] = useState(false);
    const [showLoader, setShowLoader] = useState(true);


    const pathname = usePathname();



    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (pathname == '/') {
                    setShowExitModal(true);
                    return true;
                }
                return false;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [])
    );


    const handleExit = () => {
        BackHandler.exitApp(); // Close the app
    };

    const handleStay = () => {
        setShowExitModal(false); // Just close the modal
    };


    // ================= hooks 
    const { data: products, loading: productLoading } = useQuery<IProductData>(
        `products/list?origin=77.126036,28.62985`
    );
    const { data: categories, loading: categoryLoading } = useQuery<ICategoryData>('products/categories?limit=12');



    // ========== hooks
    const { themeColors } = useTheme()
    const { address } = useCart()
    // const navigation = useNavigation();
    const { push } = useSafeNavigation();



    async function fetchNearbyLocation(lat: string, lon: string) {
        const url =
            `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lon}&api_key=${process.env.EXPO_PUBLIC_OLA_MAP_API_KEY}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-Request-Id": "XXX",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();




            return data; // Return restaurant data
        } catch (error) {
            console.error("Error fetching nearby restaurants:", error);
            return null;
        }
    }
    async function getLocationAndSearch() {
        const strLocation = await AsyncStorage.getItem('userLocation');
        const location = JSON.parse(strLocation as string);
        if (location) {
            const result = await fetchNearbyLocation(location?.lat, location?.lon)
            console.log(result?.results[0]?.formatted_address, '|||||||||||||||||||| locationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocation')

            if (result) {
                setLocation(result?.results[0]?.formatted_address)
            }
        }

    }




    // ************************************ animations ****************************************

    useDerivedValue(() => {
        scrollTo(
            animatedRef,
            0,
            scroll.value,
            true
        );
    })

    const offsetX = useSharedValue(0);
    const height = useSharedValue(170)
    const opacity = useSharedValue(1);
    const buttonOpacity = useSharedValue(0);
    const buttonDisplay = useSharedValue(0);
    const margin = useSharedValue(0);
    const router = useRouter();
    const config = {
        mass: 1,
        damping: 14,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion.System,
    };

    const style = useAnimatedStyle(() => {
        return {
            opacity: withSpring(opacity.value, config),
            marginTop: withSpring(margin.value, config),
        };
    });
    const styleHeight = useAnimatedStyle(() => {
        return {
            height: withSpring(height.value, config),
        };
    });
    const styleBackButton = useAnimatedStyle(() => {
        return {
            opacity: withSpring(buttonOpacity.value, config),
            zIndex: buttonOpacity.value > 0 ? 10 : -1,
        };
    });

    const scrollToTop = () => {
        scroll.value = scroll.value === 0 ? 1 : 0;
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            offsetX.value = event.contentOffset.y;
            if (offsetX.value > 0) {
                height.value = 100;
                opacity.value = 0
                margin.value = -80


                if (offsetX.value > 100) {
                    buttonOpacity.value = 1
                }



            } else if (offsetX.value < 20) {
                height.value = 170;
                opacity.value = 1
                margin.value = 0
                buttonOpacity.value = 0
            } else {
                buttonOpacity.value = 0
            }


        },

    });



    // ====================================== use effects ============================


    useEffect(() => {
        getLocationAndSearch()

    }, [])

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(themeColors.primary600);
            StatusBar.setBarStyle('light-content');
        }, [])
    );



    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);


    // *********************************** loading ******************************

    if (productLoading || !categoryLoading) {
        return <Loading />
    }



    console.log(pathname, "+++++++++++++++++++++  ||||||||||||||||||||||||||||||||")



    return (
        <>
            {/* <StatusBar
                translucent
                backgroundColor={themeColors.primary600}
                barStyle="light-content"
            /> */}

            <View style={{ flex: 1, }} >
                <Animated.View
                    style={[{
                        backgroundColor: themeColors.primary600,
                        paddingHorizontal: 16,
                        justifyContent: 'center',
                        // marginTop: 10,
                        paddingTop: 30,

                        // display: ''

                    }, styleHeight]}
                >



                    {/* User Profile Icon and Address Section */}

                    <Animated.View
                        style={[
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16,
                            },
                            style,
                        ]}
                    >
                        <Pressable
                            //  onPress={() => router.push('/settings-screen')}
                            onPress={() => push('/settings-screen')}

                        >
                            {/* <Pressable onPress={() => logEvent()} > */}
                            <FontAwesomeIcons name="user-circle" color="#FFFFFF" size={40} />
                        </Pressable>
                        <Pressable onPress={() => setAddressModalOpen(true)} style={{ marginLeft: 10 }}>
                            <Text
                                variant='caption-xl-prominent'
                                style={{
                                    color: '#FFFFFF',
                                }}
                            >
                                Delivering to
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    variant='caption-md'
                                    style={{
                                        color: '#FFFFFF',
                                        marginRight: 4,
                                        // marginTop: -8
                                    }}
                                >

                                    {address?.line1?.slice(0, 30) || location?.slice(0, 30) || "Loading..."}
                                    {/* {address?.line1?.slice(0, 30) || location?.slice(0, 30) || "Loading..."} */}
                                    {/* Lorem ipsum dolor sit amet consec */}
                                </Text>
                                <Entypoicons name="chevron-down" color="#FFFFFF" size={20} />
                            </View>
                        </Pressable>
                    </Animated.View>


                    {/* Search Input */}
                    <Pressable
                        onPress={() => push('/product-search-screen')}
                        // onPress={() => router.push('/product-search-screen')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            height: 47,
                            paddingHorizontal: 14,

                        }}
                    >
                        <Search color={themeColors.neutral400} size={24} />
                        <TextInput
                            placeholder="Search Products"
                            placeholderTextColor={themeColors.neutral400}
                            readOnly
                            style={{
                                flex: 1,

                                marginLeft: 8,
                                fontSize: 16,
                                color: '#000000',
                                fontFamily: 'Poppins_400Regular',
                                marginTop: 2
                            }}
                        />
                    </Pressable>
                </Animated.View>

                {/*================================  body ================================ */}

                <Animated.ScrollView
                    ref={animatedRef}
                    onScroll={scrollHandler}
                    style={{
                        flex: 1,
                        backgroundColor: themeColors.background
                        // paddingHorizontal: 16

                    }}>


                    <Banners screen='Home' section='top' />
                    <Products products={products?.data} />
                    <Banners screen='Home' section='middle' />

                    <Category categories={categories?.data} />
                    <Banners screen='Home' section='bottom' />
                    <View style={{
                        paddingBottom: 16
                    }}>
                        <Products products={products?.data} />
                    </View>
                    <Footer />
                </Animated.ScrollView>

                <Animated.View style={[{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 130,
                    zIndex: 10000000000000
                }, styleBackButton]}>

                    <TouchableOpacity
                        onPress={scrollToTop}
                        style={{
                            backgroundColor: themeColors.neutral700,
                            width: 120,
                            height: 30,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: "row"
                        }}>

                        <Text
                            variant='body-xxs'
                            style={{
                                color: themeColors.white,
                                marginRight: 4,
                            }}
                        >
                            Back To Top
                        </Text>
                        <AntDesignIcons name="arrowup" color={themeColors.white} size={14} />
                        {/* <ArrowUpIcon color={themeColors.white} size={14} /> */}
                    </TouchableOpacity>

                </Animated.View>
            </View>


            <>
                {
                    addressModalOpen ? <>
                        <SelectAddressModal isModalVisible={addressModalOpen} setModalVisible={setAddressModalOpen} />
                    </> : <></>
                }



            </>
            <>
                {/* {
                    showExitModal ? <>
                        <CloseModal showExitModal={true} setShowExitModal={setShowExitModal} />
                    </> : <></>
                } */}
                {
                    showExitModal ? <>
                        <CloseModal isModalVisible={showExitModal} setModalVisible={setShowExitModal} />
                    </> : <></>
                }



            </>
        </>
    );
};

export default QuickHOme;
