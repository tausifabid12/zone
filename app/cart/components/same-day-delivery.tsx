import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "@/components/ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { MinusIcon, PlusIcon } from "react-native-heroicons/outline";
import ChangeDeliveryCatModal from "./change-category-modal";
import { useCart } from "@/contexts/cart.context";

const SameDayDelivery = () => {

    // ============= states 
    const [isModalVisible, setModalVisible] = useState(false);

    // ========== hooks 
    const { themeColors } = useTheme()

    const { addToCart, cart, updateQuantity, totalSameDayPrice } = useCart();




    // ===============

    return (
        <LinearGradient
            colors={['#FFFFFF', "#FFFFFF"]} // Gradient colors (top to bottom)
            start={{ x: 0, y: 0 }
            } // Start at the top
            end={{ x: 0, y: 1 }}   // End at the bottom
            style={styles.gradientBorder}
        >
            <View style={styles.cardContent}>
                <View style={
                    {
                        padding: 12
                    }
                }>
                    {/* Header Section */}
                    < View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: themeColors.neutral100,
                        paddingBottom: 12
                    }}>

                        <Image
                            source={require("../../../assets/icons/cart/clock.png")}

                            style={{
                                height: 36,
                                width: 36
                            }}
                        />
                        < Text variant="caption-lg-prominent" style={{
                            color: themeColors.neutral800
                        }}> Same Day </Text>
                        < LinearGradient
                            colors={['rgba(242, 242, 241, 0.00)', 'rgba(255, 239, 213, 0.50)']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                borderRadius: 899,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 229, 198, 0.00)',
                            }}
                        >
                            <Text variant="caption-sm-prominent" style={{
                                color: themeColors.secondary500
                            }} > Delivery within 1 Day </Text>
                        </LinearGradient>

                    </View>

                    < View style={{
                        paddingVertical: 8
                    }}>
                        {/* Item Section */}
                        {
                            cart?.filter(it => it?.deliveryOptions == 'sameDay')?.map(item =>
                                <View key={item?.product?._id} style={[styles.item, {
                                    gap: 16
                                }]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '55%',
                                        alignItems: 'center'
                                    }}>
                                        <Image
                                            source={{ uri: item?.product?.details?.thumbnail || "https://via.placeholder.com/50" }} // Replace with actual image
                                            style={styles.itemImage}
                                        />
                                        <View style={[styles.itemDetails, {
                                            marginRight: 8,
                                            flexGrow: 1
                                        }]}>
                                            <Text variant="caption-sm" >
                                                {item?.product?.details?.title?.length > 16 ? `${item?.product?.details?.title?.slice(0, 16)}..` : item?.product?.details?.title}
                                            </Text>
                                            <Text variant="body-xs" style={{
                                                color: themeColors.neutral500
                                            }}> {item?.variant?.name || `${item?.quantity} Piece`}  </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        padding: 0,
                                        margin: 0,
                                        width: 75,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderWidth: 0.6,
                                            borderRadius: 7,
                                            borderColor: themeColors.primary200,
                                            // gap: 8,
                                            width: 75,
                                            justifyContent: 'space-between',
                                        }}>
                                            <Pressable
                                                style={{
                                                    paddingVertical: 6,
                                                    paddingLeft: 9,
                                                    flex: 1,
                                                }}
                                                onPress={() => updateQuantity(item?.product?._id, item?.variant?._id, item?.quantity - 1)}
                                            >
                                                <MinusIcon size={16} color={themeColors.primary600} />
                                            </Pressable>
                                            <Text variant="caption-md-prominent" style={{
                                                marginTop: 2,

                                            }} >{item?.quantity}</Text>
                                            <Pressable
                                                style={{
                                                    paddingVertical: 6,
                                                    paddingLeft: 9,
                                                    flex: 1,


                                                }}
                                                onPress={() => updateQuantity(item?.product?._id, item?.variant?._id, item?.quantity + 1)}
                                            >
                                                <PlusIcon size={15} color={themeColors.primary600} />

                                            </Pressable>

                                        </View>
                                    </View>
                                    <View style={[styles.itemDetails, {
                                        alignSelf: 'center',
                                        flex: 1

                                    }]}>
                                        <Text variant="caption-sm"
                                            style={{
                                                textAlign: 'right'
                                            }} >

                                            ₹{item?.variant?.discountPrice || item?.product?.discountPrice}</Text>
                                        <Text variant="body-xxs" style={{
                                            color: themeColors.neutral500,
                                            textDecorationLine: "line-through",
                                            textAlign: 'right'
                                        }}>₹{item?.variant?.originalPrice || item?.product?.originalPrice}</Text>
                                    </View>
                                </View>)
                        }

                    </View>
                    {/* Switch Offer Section */}
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={
                            [{
                                borderTopColor: themeColors.neutral200,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottomRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                paddingTop: 12,
                                borderTopWidth: 1,
                                borderStyle: 'dashed'
                            }]} >
                        <Text variant="body-sm" style={{
                            color: themeColors.neutral600
                        }} > Item Total </Text>
                        < View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Text variant="caption-sm" style={{
                                color: themeColors.neutral800
                            }}>₹{totalSameDayPrice}
                            </Text>

                        </View>
                    </TouchableOpacity>
                </View>


            </View>

            < ChangeDeliveryCatModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </LinearGradient>
    );

};

const styles = StyleSheet.create({
    gradientBorder: {
        borderRadius: 12,
        padding: 1,
        marginTop: 28
    },
    cardContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    header: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#f97316",
    },
    deliveryText: {
        fontSize: 14,
        color: "#666",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        justifyContent: 'space-between',


    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    itemDetails: {
        // flex: 1,
    },
    itemName: {
        fontSize: 14,
        color: "#333",
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#f1f1f1",
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 14,
        color: "#666",
    },
    totalPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        padding: 10,
        borderTopWidth: 1,
        borderStyle: "dashed"

    },
    switchText: {
        fontSize: 14,
        color: "#9c27b0",
    },
    switchAction: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#9c27b0",
    },
});

export default SameDayDelivery;
