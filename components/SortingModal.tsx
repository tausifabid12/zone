import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
} from "react-native";
import Text from "./ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { MinusIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useCart } from "@/contexts/cart.context";
import { IProduct } from "@/interfaces/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISettings } from "@/interfaces/settings.interface";
import Modal from "react-native-modal";










const SortingModal = ({ isModalVisible, setModalVisible, currentProduct, setSelectedOption, selectedOption }: {
    currentProduct: any,
    isModalVisible: any,
    setModalVisible: any,
    selectedOption: any,
    setSelectedOption: any

}) => {



    // ========== hooks 
    const { themeColors } = useTheme()
    const [selectedItem, setSelectItem] = useState<any>('')
















    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelection = (id: any) => {
        setSelectItem(id);
    };








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
                backdropTransitionOutTiming={500}
                animationOutTiming={400}
                animationInTiming={400}
                backdropTransitionInTiming={500}
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
                                <Text variant="caption-lg">Sort By</Text>
                                {/* <Text variant="body-sm" style={{
                                    color: themeColors.neutral500
                                }}>Choose Delivery Type for This Item</Text> */}

                            </View>

                            <TouchableOpacity onPress={toggleModal}>

                                <XCircleIcon size={24} color={themeColors.neutral500} />
                            </TouchableOpacity>



                        </View>

                        <View style={{

                            marginHorizontal: 16,
                            backgroundColor: themeColors.background,
                            padding: 16,
                            borderRadius: 12
                        }}>
                            {/* Delivery Options */}
                            <FlatList
                                data={[
                                    {
                                        label: 'Price (low to high)',
                                        value: 'minPrice'
                                    },
                                    {
                                        label: 'Price (high to low)',
                                        value: 'maxPrice'
                                    },
                                    {
                                        label: 'Rating',
                                        value: 'ratting'
                                    }
                                ]}
                                keyExtractor={(item) => item?.label}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.optionContainer,
                                            selectedItem === item && styles.optionSelected,
                                            {
                                                borderBottomColor: item?.value !== "ratting" ? themeColors.neutral100 : 'transparent',
                                                borderBottomWidth: 1
                                            }

                                        ]}
                                        onPress={() => handleSelection(item?.value)}
                                    >
                                        <Text style={{
                                            color: selectedItem === item?.value ? themeColors.neutral800 : themeColors.neutral500,
                                            textTransform: 'capitalize'
                                        }} variant="caption-md">{item?.label} </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 3
                                        }}>
                                            <Text
                                                variant="caption-sm-prominent"


                                            >

                                            </Text>



                                            <View
                                                style={[
                                                    styles.radioCircle,
                                                    selectedItem === item?.value && styles.radioSelected,
                                                ]}
                                            >
                                                <View style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: selectedItem === item?.value ? themeColors.primary600 : 'transparent',
                                                    borderRadius: 10000
                                                }}>

                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                )}
                            />


                        </View>
                        {/*==================== Quantity and Action Buttons =========================*/}
                        <View style={{
                            position: 'absolute',
                            bottom: 30,
                            width: '100%',
                            padding: 16
                        }}>
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    onPress={toggleModal}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingVertical: 12,
                                        gap: 8,
                                        marginRight: 16,
                                        width: 117,
                                        justifyContent: 'center',
                                        paddingHorizontal: 6
                                    }}>
                                    <Text
                                        variant="caption-lg"
                                        style={{
                                            color: themeColors.primary600,
                                        }}>
                                        Clear
                                    </Text>


                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedOption(selectedItem)
                                        setModalVisible(false)
                                    }}
                                    style={styles.addItemButton}>
                                    <Text variant="caption-md" style={styles.addItemText}>
                                        Apply
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

export default SortingModal;
