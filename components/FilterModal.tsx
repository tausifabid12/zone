import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
    ScrollView,
} from "react-native";
import Text from "./ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { MinusIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useCart } from "@/contexts/cart.context";
import { IProduct } from "@/interfaces/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISettings } from "@/interfaces/settings.interface";
import Modal from "react-native-modal";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon as CheckSolid } from "react-native-heroicons/solid";










const FilterModal = ({ isModalVisible, setModalVisible, setMinRating }: any) => {


    const { themeColors } = useTheme();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const ratings = [5, 4, 3, 2, 1];



    const [selectedRating, setSelectedRating] = useState(3);


    function handleApply() {
        setMinRating(selectedRating)
    }




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

                        {/* Header */}

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
                                <Text variant="caption-lg">Filter</Text>
                                <Text variant="body-sm" style={{
                                    color: themeColors.neutral500
                                }}>Choose Delivery Type for This Item</Text>

                            </View>

                            <TouchableOpacity onPress={toggleModal}>

                                <XCircleIcon size={24} color={themeColors.neutral500} />
                            </TouchableOpacity>



                        </View>

                        {/* Filter Options */}
                        <ScrollView contentContainerStyle={styles.filterOptionsContainer} style={{
                            maxHeight: 400
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                // alignItems: 'center',

                            }}>

                                <View style={{
                                    padding: 16,
                                    borderRightColor: themeColors.neutral100,
                                    borderRightWidth: 1,
                                    flex: 1
                                }}>
                                    <Text variant="body-sm" style={{
                                        color: themeColors.neutral500,
                                        marginBottom: 14

                                    }}>
                                        Ratings
                                    </Text>
                                    {/* <Text variant="body-sm" style={{
                                        color: themeColors.neutral500,
                                        marginBottom: 14

                                    }}>
                                        Category
                                    </Text> */}
                                </View>

                                <View style={{
                                    padding: 16,
                                    borderRightColor: themeColors.neutral100,
                                    borderRightWidth: 1,
                                    flex: 1
                                }}>
                                    {ratings.map((rating, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => setSelectedRating(rating)}
                                            style={styles.radioContainer}
                                        >
                                            {
                                                selectedRating === rating ? <CheckSolid color={themeColors.primary600} size={24} /> : <CheckCircleIcon color={themeColors.neutral500} size={24} />

                                            }
                                            {/* <View
                                                style={[
                                                    styles.radioCircle,
                                                    // {
                                                    //     backgroundColor: themeColors.neutral700
                                                    // },
                                                    selectedRating === rating &&
                                                    styles.radioSelected,

                                                ]}
                                            >
                                             
                                            </View> */}
                                            <Text variant="body-sm" style={{
                                                color: themeColors.neutral600,
                                                marginLeft: 4
                                            }}>{rating} Stars & Up</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                            </View>

                        </ScrollView>

                        {/* Footer Buttons */}
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
                                    paddingVertical: 12,
                                    gap: 8,
                                    marginRight: 16,
                                    width: 117,
                                    justifyContent: 'center',
                                    paddingHorizontal: 6,

                                }}>
                                    <Text
                                        variant="caption-lg"

                                        style={{
                                            color: themeColors.primary600,
                                            textAlign: 'center'
                                        }}
                                    >
                                        Clear
                                    </Text>

                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleApply()
                                        setModalVisible(false)
                                    }}
                                    style={styles.addItemButton}>
                                    <Text variant="caption-md" style={styles.addItemText}>
                                        Apply
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
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    filterOptionsContainer: {
        paddingBottom: 80,
    },
});

export default FilterModal;
