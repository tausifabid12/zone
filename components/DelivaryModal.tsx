import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
    Image,
} from "react-native";
import Text from "./ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { MinusIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useCart } from "@/contexts/cart.context";
import { IProduct } from "@/interfaces/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISettings } from "@/interfaces/settings.interface";
import Modal from "react-native-modal";










const DeliveryModal = ({ isModalVisible, setModalVisible, currentProduct, selectedVariant }: {
    currentProduct: IProduct
    isModalVisible: any,
    setModalVisible: any,
    selectedVariant?: any
}) => {


    // ========= states
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState<any>('sameDay');
    //@ts-ignore

    const [settings, setSettings] = useState<ISettings>({})

    // ========== hooks 
    const { themeColors } = useTheme()
    const { addToCart } = useCart();





    async function getSettings() {
        const SettingStr: any = await AsyncStorage.getItem('settings')
        const settingData = JSON.parse(SettingStr)
        setSettings(settingData)

    }





    const handleAddToCart = () => {

        const variant = selectedVariant ? selectedVariant : currentProduct.variants[0];
        addToCart(currentProduct, variant, quantity, selectedOption);
    };




    // function getDeliveryPrice(options: any[], distance: number): number | null {
    //     const matched = options?.find(option =>
    //         distance >= option?.distanceRange[0] && distance <= option?.distanceRange[1]
    //     );
    //     return matched ? matched.price : 0;

    // }





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


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelection = (id: any) => {
        setSelectedOption(id);
    };



    function getDeliveryPrice(distanceInMeters: number, quickRates: any[]) {
        const distanceInKm = distanceInMeters / 1000;

        for (const rate of quickRates) {
            const [min, max] = rate.distanceRange;
            if (distanceInKm >= min && distanceInKm < max) {

                if (!settings?.store?.includeSameDayDelivery) {
                    return rate.price + settings?.delivery?.sameDay[0]?.price
                } else {
                    return rate.price;
                }

            }
        }

        // Fallback if no range matches
        return quickRates[quickRates.length - 1]?.price || 0;
    }


    useEffect(() => {
        getSettings()

    }, [])



    console.log(currentProduct?.store?.distance, " distace",)



    return (
        <View >


            {/* Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                // hasBackdrop={false}
                style={{
                    margin: 0
                }}
                animationIn="slideInUp"
                animationOut="slideInDown"
                backdropTransitionOutTiming={200}
                animationOutTiming={150}
                animationInTiming={150}
                backdropTransitionInTiming={200}
            >
                <View style={[styles.modalOverlay, {
                    backgroundColor: 'transparent'
                }]}>
                    <View style={[styles.modalContainer, {
                        backgroundColor: themeColors.background
                    }]}>
                        {/*========================= Header ========================================*/}

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            padding: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: themeColors.neutral100
                        }}>
                            <View style={{
                            }}>
                                <Text variant="caption-lg">Choose Delivery Type for This Item</Text>
                                <Text variant="body-sm" style={{
                                    color: themeColors.neutral500
                                }}>Choose Delivery Type for This Item</Text>

                            </View>

                            <TouchableOpacity onPress={toggleModal}>

                                <XCircleIcon size={24} color={themeColors.neutral500} />
                            </TouchableOpacity>



                        </View>

                        <View style={{

                            marginHorizontal: 16,
                            backgroundColor: themeColors.background,
                            padding: 16,
                            borderRadius: 12,
                            flexDirection: "column",
                            gap: 8
                        }}>


                            {/* ========================== quick */}

                            {
                                currentProduct?.store?.distance < 7999 && <TouchableOpacity
                                    style={[
                                        styles.optionContainer,
                                        selectedOption === 'quick' && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelection('quick')}
                                >

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 2,
                                        marginLeft: -15.5

                                    }}>
                                        <Image source={require('../assets/icons/Bolt.png')} style={{
                                            width: 14,
                                            height: 12,
                                            objectFit: "contain",
                                            marginTop: -3
                                        }} />

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 6
                                        }}>
                                            <Text style={{
                                                textTransform: 'capitalize'
                                            }} variant="body-md">Quick

                                            </Text>
                                            <Text variant="body-xxs" style={{
                                                color: themeColors.neutral400,
                                            }}>
                                                (Delivery in 2 hours)
                                            </Text>

                                        </View>
                                    </View>



                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 3
                                    }}>




                                        <Text>
                                            ₹{getDeliveryPrice(currentProduct?.store?.distance, currentProduct?.details?.deliveryCost?.quick)}

                                        </Text>
                                        <View
                                            style={[
                                                styles.radioCircle,
                                                selectedOption === "quick" && styles.radioSelected,
                                            ]}
                                        >
                                            <View style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: selectedOption === "quick" ? themeColors.primary600 : 'transparent',
                                                borderRadius: 10000
                                            }}>

                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            }


                            {/* ========================== Same day delivery */}
                            {
                                currentProduct?.store?.distance < 34099 &&
                                <TouchableOpacity
                                    style={[
                                        styles.optionContainer,
                                        selectedOption === 'sameDay' && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelection('sameDay')}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 6
                                    }}>
                                        <Text style={{
                                            textTransform: 'capitalize'
                                        }} variant="body-md">
                                            Same Day

                                        </Text>
                                        <Text variant="body-xxs" style={{
                                            color: themeColors.neutral400,
                                        }}>
                                            (Delivery in 24 hours)
                                        </Text>

                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 3
                                    }}>




                                        <Text style={{
                                            color: settings?.store?.includeSameDayDelivery ? themeColors?.success600 : themeColors?.neutral800
                                        }}>
                                            {settings?.store?.includeSameDayDelivery ? 'Free' : `₹${settings?.delivery?.sameDay[0]?.price}`}

                                        </Text>
                                        <View
                                            style={[
                                                styles.radioCircle,
                                                selectedOption === "sameDay" && styles.radioSelected,
                                            ]}
                                        >
                                            <View style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: selectedOption === "sameDay" ? themeColors.primary600 : 'transparent',
                                                borderRadius: 10000
                                            }}>

                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            }
                            {/* ========================== All India */}

                            {
                                settings?.store?.isAllIndiaStoreActive && <TouchableOpacity
                                    style={[
                                        styles.optionContainer,
                                        selectedOption === 'allIndia' && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelection('allIndia')}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 6
                                    }}>
                                        <Text style={{
                                            textTransform: 'capitalize'
                                        }} variant="body-md">
                                            All India

                                        </Text>
                                        <Text variant="body-xxs" style={{
                                            color: themeColors.neutral400,
                                        }}>
                                            (5 to 7 days)
                                        </Text>

                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 3
                                    }}>




                                        <Text style={{
                                            color: !settings?.delivery?.allIndia[0]?.price ? themeColors?.success600 : themeColors?.neutral800
                                        }}>
                                            {settings?.delivery?.allIndia[0]?.price ? `₹${settings?.delivery?.allIndia[0]?.price}` : 'Free'}

                                        </Text>
                                        <View
                                            style={[
                                                styles.radioCircle,
                                                selectedOption === "allIndia" && styles.radioSelected,
                                            ]}
                                        >
                                            <View style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: selectedOption === "allIndia" ? themeColors.primary600 : 'transparent',
                                                borderRadius: 10000
                                            }}>

                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            }










                            {/* Delivery Options */}
                            {/* <FlatList
                                data={
                                    Object.keys(currentProduct?.deliveryOptions)?.filter(
                                        // key => currentProduct?.deliveryOptions[key] === true)

                                        currentProduct?.store?.distance > 800000000 ?

                                            Object.keys(currentProduct?.deliveryOptions)?.filter(
                                                key => currentProduct?.deliveryOptions[key] === true && key !== 'quick'
                                            )

                                            :

                                            currentProduct?.store?.distance > 35 ?

                                                Object.keys(currentProduct?.deliveryOptions)?.filter(
                                                    key => currentProduct?.deliveryOptions[key] === true && key !== 'sameDay'
                                                )
                                                :

                                                Object.keys(currentProduct?.deliveryOptions)?.filter(
                                                    key => currentProduct?.deliveryOptions[key] === true
                                                )

                                    )

                                }
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.optionContainer,
                                            selectedOption === item && styles.optionSelected,
                                        ]}
                                        onPress={() => handleSelection(item)}
                                    >
                                        <Text style={{
                                            textTransform: 'capitalize'
                                        }} variant="body-md">{item} </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 3
                                        }}>
                                            <Text
                                                variant="caption-sm-prominent"
                                                style={{
                                                    color: (() => {
                                                        const quickCost = currentProduct?.details?.deliveryCost?.quick ?? null;
                                                        const distance = currentProduct?.store?.distance ?? null;

                                                        if (quickCost !== null && distance !== null) {
                                                            const km = Math.round(distance) / 1000;
                                                            const price: any = getDeliveryPrice(quickCost, km);
                                                            return price < 0 ? themeColors.primary600 : undefined;
                                                        }

                                                        // If delivery info is missing, treat it as "Free"
                                                        return themeColors.success500;
                                                    })(),
                                                }}
                                            >
                                                {(() => {
                                                    const quickCost = currentProduct?.details?.deliveryCost?.quick ?? null;
                                                    const distance = currentProduct?.store?.distance ?? null;

                                                    if (quickCost !== null && distance !== null) {
                                                        const km = Math.round(distance) / 1000;
                                                        const price: any = getDeliveryPrice(quickCost, km);
                                                        return price >= 0 ? price : 'Free';
                                                    }

                                                    return 'Free';
                                                })()}
                                            </Text>


                                            <View
                                                style={[
                                                    styles.radioCircle,
                                                    selectedOption === item && styles.radioSelected,
                                                ]}
                                            >
                                                <View style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: selectedOption === item ? themeColors.primary600 : 'transparent',
                                                    borderRadius: 10000
                                                }}>

                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                )}
                            /> */}


                        </View>
                        {/*==================== Quantity and Action Buttons =========================*/}
                        <View style={{
                            position: 'absolute',
                            bottom: 30,
                            width: '100%',
                            paddingHorizontal: 16
                        }}>
                            <View style={styles.footer}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 0.6,
                                    borderRadius: 12,
                                    borderColor: themeColors.primary200,
                                    paddingVertical: 12,
                                    gap: 8,
                                    marginRight: 16,
                                    width: 117,
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 6
                                }}>
                                    <Pressable onPress={() => {
                                        setQuantity(quantity - 1)
                                    }}>
                                        <MinusIcon size={24} color={themeColors.primary600} />
                                    </Pressable>
                                    <Text variant="caption-md-prominent" style={{
                                        marginTop: 2
                                    }} >{quantity}</Text>
                                    <Pressable onPress={() => {
                                        setQuantity(quantity + 1)
                                    }}>
                                        <PlusIcon size={24} color={themeColors.primary600} />
                                    </Pressable>

                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleAddToCart()
                                        setModalVisible(false)
                                    }}
                                    style={styles.addItemButton}>
                                    <Text variant="caption-md" style={styles.addItemText}>
                                        Add Item
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* ============================================= ===========================*/}




                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    // modal: {
    //     justifyContent: "flex-end",
    //     margin: 0,

    // },
    modalContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 470,
        width: '100%'
        // flex: 1,
        // padding: 16,
    },
    modalHeader: {
        marginBottom: 16,
    },
    modalSubtitle: {
        marginTop: 8,
        color: "#666",
    },
    closeButton: {
        position: "absolute",
        top: 8,
        right: 16,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionSelected: {
        // backgroundColor: "#F1F5F9",
    },
    optionFee: {
        color: "#007bff",
    },
    optionFree: {
        color: "green",
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    },
    radioSelected: {
        borderColor: "#4F46E5",
        padding: 3,
        borderWidth: 1.3
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    quantityNumber: {
        marginHorizontal: 12,
    },
    addItemButton: {
        flex: 1,
        backgroundColor: "#6200ea",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    addItemText: {
        color: "#fff",
    },
});

export default DeliveryModal;
