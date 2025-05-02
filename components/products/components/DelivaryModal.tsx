import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Pressable,
} from "react-native";

import { useTheme } from "@/contexts/theme.provider";
import { useCart } from "@/contexts/cart.context";
import Text from "@/components/ui/Text";
import Icon from "@/components/shared/Icon";

const DeliveryModal = ({ isModalVisible, setModalVisible, currentProduct }: any) => {


    // ========= states
    const [quantity, setQuantity] = useState(1)


    // ========== hooks 
    const { themeColors } = useTheme()
    const { addToCart } = useCart();


    const handleAddToCart = () => {
        const variant = currentProduct.variants[0];
        addToCart(currentProduct, variant, quantity);
    };


    const [selectedOption, setSelectedOption] = useState(null);

    const deliveryOptions = [
        { id: 1, name: "Quick Delivery Fee", fee: 20 },
        { id: 2, name: "Same Day Delivery Fee", fee: 0 },
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelection = (id: any) => {
        setSelectedOption(id);
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
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
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
                            <View style={{
                                flex: 1
                            }}>
                                <Text variant="caption-lg">Choose Delivery Type for This Item</Text>
                                <Text variant="body-sm" style={{
                                    color: themeColors.neutral500
                                }}>Choose Delivery Type for This Item</Text>

                            </View>

                            <TouchableOpacity onPress={toggleModal}>

                                <Icon name='close' size={24} />
                            </TouchableOpacity>



                        </View>

                        <View style={{
                            padding: 16
                        }}>
                            {/* Delivery Options */}
                            <FlatList
                                data={deliveryOptions}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.optionContainer,
                                            selectedOption === item.id && styles.optionSelected,
                                        ]}
                                        onPress={() => handleSelection(item.id)}
                                    >
                                        <Text variant="body-md">{item.name}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 3
                                        }}>
                                            <Text
                                                variant="caption-sm-prominent"
                                                style={item.fee === 0 ? styles.optionFree : styles.optionFee}
                                            >
                                                {item.fee === 0 ? "Free" : `+ ₹${item.fee}`}
                                            </Text>
                                            <View
                                                style={[
                                                    styles.radioCircle,
                                                    selectedOption === item.id && styles.radioSelected,
                                                ]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />


                        </View>
                        {/* Quantity and Action Buttons */}
                        <View style={{
                            position: 'absolute',
                            bottom: 30,
                            width: '100%',
                            padding: "16"
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
                                        <Icon name='minus' size={24} />
                                    </Pressable>
                                    <Text variant="caption-md-prominent" style={{
                                        marginTop: 2
                                    }} >{quantity}</Text>
                                    <Pressable onPress={() => {
                                        setQuantity(quantity + 1)
                                    }}>
                                        <Icon name='plus' size={24} />
                                    </Pressable>

                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleAddToCart()
                                        setModalVisible(false)
                                    }}
                                    style={styles.addItemButton}>
                                    <Text variant="caption-md" style={styles.addItemText}>
                                        Add Item | ₹199
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        height: 501
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

export default DeliveryModal;
