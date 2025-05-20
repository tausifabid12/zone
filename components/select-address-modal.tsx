import Text from "@/components/ui/Text";
import { useCart } from "@/contexts/cart.context";
import { useTheme } from "@/contexts/theme.provider";
import { useQuery } from "@/hooks/useQuery";
import { IUser } from "@/shared/interfaces/user.interface";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView } from "react-native";
import { MinusIcon, PlusCircleIcon } from "react-native-heroicons/outline";
import { PlusIcon, XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import Modal from "react-native-modal";

interface BottomModalProps {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}


interface IUserData {
    data: IUser
}

const SelectAddressModal: React.FC<BottomModalProps> = ({ isModalVisible, setModalVisible }) => {



    // ========== hooks 
    const { themeColors } = useTheme()
    const { addAddress, address } = useCart();
    const { data: userData, loading: userLoading, refetch } = useQuery<IUserData>('customers/profile');


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View>


            {/* Modal */}
            < Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                // hasBackdrop={false}
                style={{
                    margin: 0
                }
                }
                animationIn="slideInUp"
                animationOut="slideInDown"
                backdropTransitionOutTiming={200}
                animationOutTiming={150}
                animationInTiming={150}
                backdropTransitionInTiming={200}
            >
                <View style={
                    [styles.modalOverlay, {
                        backgroundColor: 'transparent'
                    }]
                }>
                    <View style={
                        [styles.modalContainer, {
                            backgroundColor: themeColors.neutral50
                        }]
                    }>
                        {/*========================= Header ========================================*/}

                        < View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: themeColors.neutral50,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            padding: 18
                        }}>
                            <View style={
                                {
                                    flex: 1
                                }
                            }>
                                <Text variant="caption-lg" > Saved Addresses </Text>

                            </View>

                            < TouchableOpacity onPress={toggleModal} >

                                <XCircleIcon size={20} color={themeColors.neutral500} />
                            </TouchableOpacity>



                        </View>

                        < ScrollView style={{
                            padding: 16,
                            paddingBottom: 40,
                            width: '100%',
                            flex: 1
                        }}>

                            <TouchableOpacity
                                onPress={() => router.push('/my-address-screen')}
                                style={
                                    [styles.switchRow, {
                                        backgroundColor: themeColors.background,
                                        width: '100%',
                                        // justifyContent: 'center',
                                        gap: 10,
                                        // alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: themeColors.neutral100
                                    }]} >
                                <View style={
                                    {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 8,

                                    }
                                }>

                                    <PlusCircleIcon size={20} color={themeColors.primary600} />
                                    <Text variant="caption-md" style={{
                                        color: themeColors.primary600
                                    }} > Add Address </Text>

                                </View>

                                < View style={{
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
                                userData?.data?.address?.map((item, i) =>
                                    <Pressable
                                        onPress={() => {
                                            addAddress(item)
                                            setModalVisible(false)
                                        }}

                                        key={i} style={
                                            [styles.item, {
                                                minWidth: '100%',
                                                backgroundColor: themeColors.background,
                                                padding: 16,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: item?.line1 == address?.line1 ? themeColors.primary600 : themeColors.white
                                            }]} >
                                        <View style={
                                            {
                                                flexDirection: 'row',
                                                gap: 3,

                                            }
                                        }>
                                            <Image
                                                source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual image
                                                style={styles.itemImage}
                                            />
                                            <View style={
                                                [styles.itemDetails, {
                                                    marginRight: 8,
                                                    flex: 1
                                                }]
                                            }>
                                                <Text variant="caption-sm" > {i == 0 ? 'Home' : ""}</Text>
                                                < Text variant="body-xs" style={{
                                                    color: themeColors.neutral500
                                                }}> {item?.city}, {item?.state} {item?.country} </Text>
                                                < Text variant="body-xs" style={{
                                                    color: themeColors.neutral500
                                                }}> {item?.line1} </Text>
                                            </View>
                                        </View>

                                    </Pressable>

                                )
                            }












                        </ScrollView>


                    </View>







                </View>
            </Modal >
        </View >
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
