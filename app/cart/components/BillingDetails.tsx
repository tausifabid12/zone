import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Pressable,
    Image,
} from "react-native";

import { useTheme } from "@/contexts/theme.provider";
import { InformationCircleIcon, MinusIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useCart } from "@/contexts/cart.context";
import { IProduct } from "@/interfaces/product.interface";
import Text from "@/components/ui/Text";
import { IOrder } from "@/shared/interfaces/order.interface";
import Tooltip from "./Tooltip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISettings } from "@/interfaces/settings.interface";

const BillingDetails = ({ paymentData, isModalVisible, setModalVisible, }: {
    paymentData: IOrder,
    isModalVisible: any,
    setModalVisible: any
}) => {


    // ========= states
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [settings, setSettings] = useState<ISettings>({})

    // ========== hooks 
    const { themeColors } = useTheme()
    const { addToCart, cart, updateQuantity, totalPrice } = useCart();;






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

    return (
        <View style={styles.container}>


            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <Pressable
                    onPress={() => setShowTooltip(false)}
                    style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Header */}

                        {/* Header */}

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: themeColors.neutral50,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            padding: 20
                        }}>
                            <View style={{
                                flex: 1
                            }}>
                                <Text variant="caption-lg">Bill Summary</Text>
                                {/* <Text variant="body-sm" style={{
                                        color: themeColors.neutral500
                                    }}>Choose Delivery Type for This Item</Text> */}

                            </View>

                            <TouchableOpacity onPress={toggleModal}>

                                <XCircleIcon size={24} color={themeColors.neutral500} />
                            </TouchableOpacity>



                        </View>
                        <View style={{
                            padding: 16
                        }}>
                            {/* Header Section */}



                            {/* 
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 12
                            }}>

                                <Image
                                    source={require("../../../assets/icons/cart/bill.png")}

                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
                                <Text variant="caption-lg-prominent" style={{
                                    color: themeColors.neutral800
                                }}>Bill Summary</Text>


                            </View> */}

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: 12

                            }}>
                                <Text variant="body-sm" >Total Cost</Text>
                                <Text variant="caption-sm" style={{
                                    textAlign: 'right'
                                }} >₹{paymentData?.paymentInfo?.revisedCost?.totalProductCost / 100}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: 12

                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text variant="body-sm" >Total Delivery Fee</Text>
                                    <Pressable
                                        onPress={() => setShowTooltip(true)}
                                        style={{
                                            marginLeft: 3
                                        }}>
                                        <InformationCircleIcon color={themeColors.neutral400} size={16} />
                                    </Pressable>
                                    <View style={{
                                        position: 'relative',
                                        zIndex: 55555555
                                    }}>
                                        <Tooltip
                                            visible={showTooltip}
                                            onClose={() => setShowTooltip(false)}
                                            top="35%"
                                            left={"20%"}
                                        >

                                            <View style={{

                                                paddingBottom: 12,
                                                flex: 1,
                                                width: 200,
                                                backgroundColor: themeColors.neutral100,
                                                padding: 16,
                                                borderRadius: 12
                                            }}>
                                                {
                                                    paymentData?.paymentInfo?.revisedCost?.quickDeliveryFee ? <>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            paddingBottom: 12

                                                        }}>
                                                            <Text variant="body-sm" >Quick Delivery Fee</Text>
                                                            <Text variant="caption-sm" style={{
                                                                textAlign: 'right'
                                                            }} >
                                                                ₹{

                                                                    (paymentData?.paymentInfo?.revisedCost?.quickDeliveryFee / 100) < settings?.cap?.handling?.charge?.value ?
                                                                        (paymentData?.paymentInfo?.revisedCost?.quickDeliveryFee) :
                                                                        (paymentData?.paymentInfo?.revisedCost?.quickDeliveryFee / 100) -
                                                                        (settings?.cap?.handling?.charge?.value / (paymentData?.paymentInfo?.revisedCost?.quickDeliveryFee ? 1 : 0 +
                                                                            paymentData?.paymentInfo?.revisedCost?.sameDayDeliveryFee ? 1 : 0))}
                                                            </Text>
                                                        </View>
                                                    </> : <></>
                                                }

                                                {
                                                    paymentData?.paymentInfo?.revisedCost?.sameDayDeliveryFee ? <>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            paddingBottom: 12

                                                        }}>
                                                            <Text variant="body-sm" >sameDayDeliveryFee</Text>
                                                            <Text variant="caption-sm" style={{
                                                                textAlign: 'right'
                                                            }} >₹ {(paymentData?.paymentInfo?.revisedCost?.sameDayDeliveryFee / 100) - (19 / (paymentData?.paymentInfo?.revisedCost?.quickDeliveryFee ? 1 : 0 + paymentData?.paymentInfo?.revisedCost?.sameDayDeliveryFee ? 1 : 0))} </Text>
                                                        </View>
                                                    </> : <></>
                                                }
                                            </View>
                                        </Tooltip>
                                    </View>

                                </View>
                                <Text variant="caption-sm" style={{
                                    textAlign: 'right'
                                }} >₹{(paymentData?.paymentInfo?.revisedCost?.totalDeliveryFee / 100) - 19}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: 12

                            }}>
                                <Text variant="body-sm" >Handling Fee</Text>
                                <Text variant="caption-sm" style={{
                                    textAlign: 'right'
                                }} >₹19</Text>
                            </View>




                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    openButton: {
        padding: 15,
        backgroundColor: "#007bff",
        borderRadius: 10,
    },
    openButtonText: {
        color: "#fff",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalContainer: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: 501,
        flex: 1,
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
        backgroundColor: "#F1F5F9",
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
        backgroundColor: "#4F46E5",
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

export default BillingDetails;
