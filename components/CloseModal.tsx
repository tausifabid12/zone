import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
    BackHandler,
} from "react-native";
import Text from "./ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { MinusIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useCart } from "@/contexts/cart.context";
import { IProduct } from "@/interfaces/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISettings } from "@/interfaces/settings.interface";
import Modal from "react-native-modal";










const CloseModal = ({ isModalVisible, setModalVisible }: {
    isModalVisible: any,
    setModalVisible: any,
}) => {


    // useEffect(() => {
    //     const onBackPress = () => {
    //         setModalVisible(true); // open the modal on back press
    //         return true; // prevent exiting app
    //     };

    //     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    //     return () => subscription.remove();
    // }, []);
    const { themeColors } = useTheme()
    const handleYes = () => {
        BackHandler.exitApp(); // Android only
    };

    const handleNo = () => {
        setModalVisible(false);
    };





    return (
        <View >


            {/* Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={handleNo}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.message}>Do you want to close the app?</Text>

                    <TouchableOpacity
                        onPress={handleYes}
                        style={[{
                            // flex: 1,
                            backgroundColor: "#6200ea",
                            paddingVertical: 14,
                            borderRadius: 12,
                            alignItems: "center",
                        }]}>
                        <Text variant="caption-md-prominent" style={{
                            color: themeColors.white
                        }}>
                            Yes
                        </Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNo}
                        style={[{
                            borderColor: themeColors.primary600,
                            backgroundColor: "transparent",
                            paddingVertical: 14,
                            borderRadius: 12,
                            alignItems: "center",
                            marginTop: 12,
                            borderWidth: 2
                        }]}>
                        <Text variant="caption-md-prominent" style={{
                            color: themeColors.primary600
                        }}>
                            No
                        </Text>


                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 10,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        paddingVertical: 40,
        height: 230
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonRow: {
        // flex: 1
        flexDirection: 'column',
        // justifyContent: 'space-around',
    },
    buttonYes: {
        backgroundColor: '#d9534f',
        padding: 12,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    buttonNo: {
        backgroundColor: '#5bc0de',
        padding: 12,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
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

export default CloseModal;
