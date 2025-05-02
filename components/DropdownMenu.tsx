import { useTheme } from '@/contexts/theme.provider';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import Modal from "react-native-modal";
import { ShareIcon, PencilIcon, TrashIcon } from 'react-native-heroicons/outline'; // Import Heroicons

const DropdownMenu = ({ isVisible, setIsVisible, deleteAddress, refetch }: any) => {
    // ========== hooks 
    const { themeColors } = useTheme();

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View>
            {/* Dropdown Modal */}
            <Modal

                isVisible={isVisible}
                onBackdropPress={toggleDropdown}
                style={styles.modal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropTransitionOutTiming={500}
                animationOutTiming={400}
                animationInTiming={400}
                backdropTransitionInTiming={500}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={{
                            backgroundColor: themeColors.background,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingVertical: 12,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 6,
                            height: 240,
                            width: '100%'
                        }}>
                            {/* Menu Items */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 10 }}>
                                <ShareIcon color="#000" size={20} />
                                <Text style={{ marginLeft: 10, fontSize: 16, color: '#000' }}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 10 }}>
                                <PencilIcon color="#000" size={20} />
                                <Text style={{ marginLeft: 10, fontSize: 16, color: '#000' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteAddress()
                                    toggleDropdown()
                                    refetch()
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 10 }}>
                                <TrashIcon color="red" size={20} />
                                <Text style={{ marginLeft: 10, fontSize: 16, color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
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
        // backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,

    },
    modalContainer: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: 201,
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

export default DropdownMenu;