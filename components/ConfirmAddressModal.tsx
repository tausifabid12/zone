import Text from "@/components/ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { useMutation } from "@/hooks/useMutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import { showMessage } from "react-native-flash-message";
// import { showMessage } from "react-native-flash-message";
import { MinusIcon, PlusCircleIcon, ShoppingBagIcon } from "react-native-heroicons/outline";
import { HomeIcon, MapPinIcon, PlusIcon, XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import Modal from "react-native-modal";

interface BottomModalProps {
    isModalVisible: boolean;
    setLoading: any;
    setModalVisible: (visible: boolean) => void;
    markerCoordinates: {
        city: string,
        state: string,
        longitude: string,
        latitude: string,
    }
    selectedLatAndLon: {
        longitude: string,
        latitude: string,
    }
    selectedLocation: any
}

const ConfirmAddressModal: React.FC<BottomModalProps> = ({ isModalVisible, setModalVisible, markerCoordinates, selectedLatAndLon, selectedLocation, setLoading }) => {
    const [address, setAddress] = useState({
        line1: "",
        line2: " ",
        city: "",
        state: "",
        country: "India",
        pinCode: "",
    });
    const { themeColors } = useTheme(); // Theme hook for colors
    const { data: paymentData, error, loading, mutate } = useMutation<any>();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };





    // console.log(address, '||||||||||||||||||||||||||||||||||||||||||||||')


    const handleAddAddress = async () => {
        try {

            setLoading(true)

            const userDataStr = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(userDataStr as string)

            const data = {
                "address":
                    [...userData?.address,
                    {
                        "line1": address?.line1,
                        "line2": address?.line2,
                        "city": address?.city,
                        "state": address?.state,
                        "country": "India",
                        "pinCode": address?.pinCode,
                        "geo": {
                            "type": "Point",
                            "coordinates": [
                                selectedLatAndLon?.latitude,
                                selectedLatAndLon?.longitude,
                            ]
                        }
                    }

                    ]
            }

            const response = await mutate('customers/profile', 'POST', data);

            if (response) {
                showMessage({
                    message: "Address Added Updated",
                    type: "success",
                })
                setModalVisible(false)
                router.push('/my-address-screen')
            }
            console.log(response, '{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{ ')

            AsyncStorage.setItem('userData', JSON.stringify(data))
            setLoading(false)


            // setResponseText(response.message);
        } catch (err) {
            console.error('Mutation error:', err);
        }
    }



    useEffect(() => {
        const updated = { ...address };

        if (selectedLocation?.description) {
            updated.line1 = selectedLocation?.description;
        }
        if (markerCoordinates?.city) {
            updated.city = markerCoordinates.city;
        }
        if (markerCoordinates?.state) {
            updated.state = markerCoordinates.state;
        }

        setAddress(updated);
    }, [selectedLocation?.description, markerCoordinates?.city, markerCoordinates?.state, selectedLatAndLon?.latitude, selectedLatAndLon?.longitude]);



    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
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
                        <Text variant="caption-lg">Confirm Details</Text>

                    </View>

                    <TouchableOpacity onPress={toggleModal}>

                        <XCircleIcon size={20} color={themeColors.neutral500} />
                    </TouchableOpacity>



                </View>
                <ScrollView contentContainerStyle={{ padding: 16 }} style={{
                    // flex: 1
                }}>

                    <Text variant="body-xxs" style={[styles.sectionTitle, { color: themeColors.neutral400, marginBottom: 12 }]}>
                        RECEIVER'S DETAILS
                    </Text>
                    {/* 
                    <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            Full Name *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='Full Name'
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>

                    <View style={{
                        paddingBottom: 12,
                        marginBottom: 28
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            Phone Number *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16,

                        }}>

                            <TextInput
                                placeholder='Full Name'
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View> */}

                    {/* <Text variant="body-xxs" style={[{ color: themeColors.neutral400, marginBottom: 12 }]}>
                        ADDRESS DETAILS
                    </Text>

                    <View style={styles.addressTypeContainer}>
                        <TouchableOpacity
                            style={[styles.addressTypeButton, { backgroundColor: themeColors.background, borderColor: themeColors.neutral200 }]}
                        >
                            <HomeIcon color={themeColors.neutral200} size={16} />
                            <Text variant="caption-xs" style={{ color: themeColors.neutral600 }}>
                                Home
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.addressTypeButton, { backgroundColor: themeColors.background, borderColor: themeColors.primary600 }]}
                        >
                            <ShoppingBagIcon color={themeColors.primary600} size={16} />
                            <Text variant="caption-xs" style={{ color: themeColors.primary600 }}>
                                Work
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.addressTypeButton, { backgroundColor: themeColors.background, borderColor: themeColors.neutral200 }]}
                        >
                            <MapPinIcon color={themeColors.neutral200} size={16} />
                            <Text variant="caption-xs" style={{ color: themeColors.neutral600 }}>
                                Other
                            </Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            Address Line 1*
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='Address Line *'
                                placeholderTextColor={themeColors.neutral300}
                                defaultValue={address.line1}
                                onChangeText={(e) => setAddress({ ...address, line1: e })}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>
                    <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            Address Line 2
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='Address Line *'
                                placeholderTextColor={themeColors.neutral300}
                                defaultValue={address.line2}
                                onChangeText={(e) => setAddress({ ...address, line2: e })}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>
                    {/* <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            Building/Flat Number *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='Address Line *'
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View> */}
                    <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            State *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='State *'
                                defaultValue={address.state}
                                onChangeText={(e) => setAddress({ ...address, state: e })}
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>
                    <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            City *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='City*'
                                defaultValue={address.city}
                                onChangeText={(e) => setAddress({ ...address, city: e })}
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>
                    <View style={{
                        paddingBottom: 12
                    }}>
                        <Text variant="body-sm" style={{ color: themeColors.neutral700, marginBottom: 4 }}>
                            Pin Code *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='pin code *'
                                defaultValue={address.pinCode}
                                onChangeText={(e) => setAddress({ ...address, pinCode: e })}
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>









                </ScrollView>
                <View style={{
                    paddingHorizontal: 16,
                    paddingBottom: 12
                }}>
                    <TouchableOpacity
                        onPress={handleAddAddress}
                        style={[styles.saveButton, {
                            backgroundColor: themeColors.primary600
                        }]}>
                        <Text variant="caption-md" style={{ color: '#FFFFFF' }}>
                            Save Address Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        maxHeight: '80%', // Restricts modal height to 70% of the screen
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
    },
    sectionTitle: {
        // marginVertical: 12,
    },
    input: {
        height: 44,
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginBottom: 10,
        color: '#1E293B',
    },
    addressTypeContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 16,
        gap: 6
    },
    addressTypeButton: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 800,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        maxWidth: 90,
        flexDirection: 'row',
        gap: 6
    },
    saveButton: {
        marginTop: 24,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
});

export default ConfirmAddressModal;
