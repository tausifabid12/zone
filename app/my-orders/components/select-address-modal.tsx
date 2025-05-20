import Text from "@/components/ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MinusIcon, PlusCircleIcon } from "react-native-heroicons/outline";
import { PlusIcon, XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import Modal from "react-native-modal";

interface BottomModalProps {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const SelectAddressModal: React.FC<BottomModalProps> = ({ isModalVisible, setModalVisible }) => {



    // ========== hooks 
    const { themeColors } = useTheme()



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >









                <View style={[styles.modalContent,
                {
                    backgroundColor: themeColors.neutral50,
                    padding: 16

                }

                ]}>


                    {/* =============== header ============= */}

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
                            <Text variant="caption-lg">Saved Addresses</Text>

                        </View>

                        <TouchableOpacity onPress={toggleModal}>

                            <XCircleIcon size={20} color={themeColors.neutral500} />
                        </TouchableOpacity>



                    </View>

                    <View style={{
                        padding: 16,
                        paddingBottom: 40
                    }}>

                        <TouchableOpacity
                            onPress={() => router.push('/my-address-screen')}
                            style={[styles.switchRow, {
                                backgroundColor: themeColors.background
                            }]}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8
                            }}>

                                <PlusCircleIcon size={20} color={themeColors.primary600} />
                                <Text variant="caption-md" style={{
                                    color: themeColors.primary600
                                }} >Add Address</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4
                            }}>
                                <Text variant="body-xl" style={{
                                    color: themeColors.primary600,
                                    marginTop: 3
                                }}>
                                    {">"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* ============ products */}

                        {
                            [...Array(3)]?.map(item =>
                                <View key={item} style={[styles.item, {
                                    backgroundColor: themeColors.background,
                                    padding: 16,
                                    borderRadius: 12
                                }]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 3,

                                    }}>
                                        <Image
                                            source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual image
                                            style={styles.itemImage}
                                        />
                                        <View style={[styles.itemDetails, {
                                            marginRight: 8
                                        }]}>
                                            <Text variant="caption-sm" >Home</Text>
                                            <Text variant="body-xs" style={{
                                                color: themeColors.neutral500
                                            }}>Flat No. 12, Ganga Apartments, 10 Bazullah  </Text>
                                            <Text variant="body-xs" style={{
                                                color: themeColors.neutral500
                                            }}>Road, T. Nagar, Chennai, Tamil Nadu, 600017</Text>
                                        </View>
                                    </View>

                                </View>)
                        }












                    </View>







                </View>
            </Modal >
        </View >
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
        width: 30,
        height: 30,
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
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 20
    },

});

export default SelectAddressModal;
