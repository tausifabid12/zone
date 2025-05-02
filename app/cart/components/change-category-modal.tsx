import Text from "@/components/ui/Text";
import { useCart } from "@/contexts/cart.context";
import { useTheme } from "@/contexts/theme.provider";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { MinusIcon } from "react-native-heroicons/outline";
import { PlusIcon, XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import Modal from "react-native-modal";

interface BottomModalProps {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ChangeDeliveryCatModal: React.FC<BottomModalProps> = ({ isModalVisible, setModalVisible }) => {



    // ========== hooks 
    const { themeColors } = useTheme();
    const { cart, updateDeliveryOptionsToSameDay } = useCart();
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // store selected cart item IDs

    const toggleModal = () => setModalVisible(!isModalVisible);

    const toggleSelect = (itemId: string) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleSwitch = () => {
        const itemsToUpdate = cart.filter(
            item =>
                item.deliveryOptions === 'quick' &&
                selectedItems.includes(item.product._id)
        );
        updateDeliveryOptionsToSameDay(itemsToUpdate);
        setModalVisible(false);
        setSelectedItems([]);
    };

    const quickItems = cart.filter(item => item.deliveryOptions === "quick");

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >
                <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
                    {/* Header */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: themeColors.neutral50,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        padding: 16
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text variant="caption-lg">Switch to Same Day Delivery</Text>
                            <Text variant="body-sm" style={{ color: themeColors.neutral500 }}>
                                Select products to switch
                            </Text>
                        </View>
                        <TouchableOpacity onPress={toggleModal}>
                            <XCircleIcon size={20} color={themeColors.neutral500} />
                        </TouchableOpacity>
                    </View>

                    {/* Product List */}
                    <View style={{ padding: 16, paddingBottom: 40 }}>
                        {quickItems.map((item) => {
                            const isSelected = selectedItems.includes(item.product._id);
                            return (
                                <TouchableOpacity
                                    key={item.product._id}
                                    onPress={() => toggleSelect(item.product._id)}
                                    style={[
                                        styles.item,
                                        {
                                            backgroundColor: 'transparent',
                                            borderRadius: 10,
                                            // borderWidth: 1,
                                            // borderColor: isSelected ? themeColors.primary600 : 'transparent',
                                            padding: 4
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{ uri: item?.product?.details?.thumbnail || "https://via.placeholder.com/50" }}
                                        style={styles.itemImage}
                                    />
                                    <View style={[styles.itemDetails, { flexGrow: 1, marginRight: 8 }]}>
                                        <Text variant="caption-sm">{item.variant?.name || item.product?.details?.title?.slice(0, 9)}..</Text>
                                        <Text variant="body-xs" style={{ color: themeColors.neutral500 }}>
                                            ₹{item?.variant?.discountPrice || item.product?.discountPrice}
                                        </Text>
                                    </View>
                                    <View style={[styles.itemDetails, { alignSelf: 'center' }]}>
                                        <Text variant="caption-sm" style={{ textAlign: 'right' }}>
                                            ₹{item.variant?.discountPrice || item.product?.discountPrice}
                                        </Text>
                                        <Text variant="body-xxs" style={{
                                            color: themeColors.neutral500,
                                            textDecorationLine: "line-through",
                                            textAlign: 'right'
                                        }}>
                                            ₹{item.variant?.originalPrice || item.product?.originalPrice}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.radioCircle,
                                            selectedItems?.includes(item?.product?._id) && styles.radioSelected,
                                            {
                                                marginLeft: 10
                                            }
                                        ]}
                                    >
                                        <View style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: selectedItems?.includes(item?.product?._id) ? themeColors.primary600 : 'transparent',
                                            borderRadius: 10000
                                        }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                        {/* Delivery Info */}
                        <View style={{ marginTop: 30 }}>
                            <LinearGradient
                                colors={['#FFFFFF', '#DCFCE7', '#FFFFFF']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 4,
                                    paddingHorizontal: 10,
                                    alignItems: 'center',
                                    borderRadius: 999,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 229, 198, 0.00)',
                                    justifyContent: 'center',
                                    gap: 5
                                }}
                            >
                                <Text variant="caption-sm-prominent" style={{ color: themeColors.success900 }}>
                                    Delivery in 2 hours
                                </Text>
                                {/* <Text variant="caption-sm-prominent" style={{ color: themeColors.success600 }}>
                                    ₹349
                                </Text> */}
                            </LinearGradient>
                        </View>

                        {/* Switch Button */}
                        <TouchableOpacity
                            onPress={handleSwitch}
                            style={[styles.switchRow, { backgroundColor: themeColors.primary600 }]}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <Text variant="caption-lg-prominent" style={{ color: themeColors.primary50 }}>
                                    {selectedItems.length} Items
                                </Text>
                                <Text variant="body-lg" style={{ color: themeColors.primary50 }}> Selected</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Text variant="body-lg" style={{ color: themeColors.white }}>Switch</Text>
                                <Text variant="body-xl" style={{ color: themeColors.white, marginTop: 3 }}>{">"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#6200ea",
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,

    },
    modalContent: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        justifyContent: 'space-between',
        width: '100%'


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
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 14
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    },
    radioSelected: {
        borderColor: "#4F46E5",
        padding: 3,
        borderWidth: 1
    },

});

export default ChangeDeliveryCatModal;
