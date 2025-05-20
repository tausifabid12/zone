import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "@/components/ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "react-native-heroicons/outline";
import ChangeDeliveryCatModal from "./change-category-modal";

const SameDayDelivery = () => {

    // ============= states 
    const [isModalVisible, setModalVisible] = useState(false);

    // ========== hooks 
    const { themeColors } = useTheme()






    // ===============

    return (
        <LinearGradient
            colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Gradient colors (top to bottom)
            start={{ x: 0, y: 0 }} // Start at the top
            end={{ x: 0, y: 1 }}   // End at the bottom
            style={styles.gradientBorder}
        >
            <View style={styles.cardContent}>
                <View style={{
                    padding: 16
                }}>
                    {/* Header Section */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: themeColors.neutral100,
                        paddingBottom: 16
                    }}>


                        <Text variant="caption-md" style={{
                            color: themeColors.neutral800
                        }}>All India
                            <Text variant="body-sm" style={{
                                color: themeColors.neutral500
                            }} > 5 Items</Text>
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8
                        }}>
                            <Text variant="caption-sm-prominent" style={{
                                color: themeColors.neutral800
                            }}>₹2,598

                            </Text>
                            <ChevronDownIcon color={themeColors.neutral800} size={20} />
                        </View>



                    </View>

                    <View style={{
                        paddingTop: 8
                    }}>
                        {/* Item Section */}
                        {
                            [...Array(2)]?.map(item =>
                                <View key={item} style={styles.item}>
                                    <Image
                                        source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual image
                                        style={styles.itemImage}
                                    />
                                    <View style={[styles.itemDetails, {
                                        flex: 1
                                    }]}>
                                        <Text variant="body-sm" style={{
                                            textAlign: 'left'
                                        }} >boAt Rockerz 450 Bluetooth On-Ear Headphones</Text>
                                        <Text variant="body-xs" style={{
                                            color: themeColors.neutral500
                                        }}>₹1,499</Text>
                                    </View>

                                    <View >
                                        <Text variant="body-xxs" style={{
                                            color: themeColors.warning600,
                                            textAlign: 'right'
                                        }}>Arriving Soon</Text>
                                        <Text variant="caption-sm"
                                            style={{
                                                textAlign: 'right'
                                            }} >
                                            <Text variant="body-xxs" style={{
                                                color: themeColors.neutral500,
                                                textDecorationLine: "line-through",
                                                textAlign: 'right'
                                            }}>₹1,999</Text>
                                            {" "} ₹1,499</Text>




                                    </View>
                                </View>)
                        }

                    </View>

                </View>


            </View>

            <ChangeDeliveryCatModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientBorder: {
        borderRadius: 12,
        padding: 1,
        marginTop: 8
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
        gap: 8,
        marginBottom: 24,
        paddingTop: 10



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
        backgroundColor: "#f9f5ff",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        padding: 10,
        marginTop: 10,
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
