import { Image, Pressable, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar2 from '@/components/Navbar2'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { router } from 'expo-router'
import { useMutation } from '@/hooks/useMutation'
import { useQuery } from '@/hooks/useQuery'
import Loading from '@/components/shared/loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OtpModal from '@/components/OtpModal'
import { useAuth } from '@/contexts/auth.context'
// import { showMessage, hideMessage } from "react-native-flash-message";

export default function EditProfileScreen() {

    // ======================== state =========================
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('1318048544')




    const [isModalVisible, setModalVisible] = useState(false);

    // ========== hooks 
    const { themeColors } = useTheme()
    const { user, setUser } = useAuth()



    const { data: userData, loading: userLoading, refetch } = useQuery<any>('customers/profile');
    const { data: paymentData, error, loading, mutate } = useMutation<any>();

    // async function handleGetUser(params:type) {

    // }



    console.log(error, '||||||')




    const handlePostRequest = async () => {
        try {

            const data = {
                "fullName": {
                    "title": "",
                    "firstName": name,
                    "middleName": "",
                    "lastName": ""
                },
                // // "profileImage": null,
                // "dateOfBirth": "1998-01-01",
                "email": email || "",
                // "gender": "male",
                "phoneNumber": {
                    "isd": "+880",
                    "number": phone
                }
            }
            const response = await mutate('customers/profile', 'POST', data);

            AsyncStorage.setItem('userData', JSON.stringify(data))
            setUser(data)

            if (response) {
                refetch()
                // showMessage({
                //     message: "Profile Updated",
                //     type: "success",
                // })
            }

            // setResponseText(response.message);
        } catch (err) {
            console.error('Mutation error:', err);
        }
    }




    useEffect(() => {

        if (userData?.data?._id) {
            setName(userData?.data?.fullName?.firstName)
            setEmail(userData?.data?.email)
            setPhone(userData?.data?.phoneNumber?.number)
        }

    }, [userData])



    if (loading) {
        return <Loading />
    }


    // ====================== render ==========================
    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.background}
                barStyle="dark-content"
            />

            <View style={{
                flex: 1,
                backgroundColor: themeColors.background
            }}>
                <Navbar2
                    title="Edit Profile"

                />

                <View style={{
                    padding: 16
                }}>



                    <View style={{
                        marginBottom: 14
                    }}>
                        <Text variant="body-sm" style={{ marginBottom: 4 }}>
                            Full Name *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 12
                        }}>

                            <TextInput
                                placeholder='Search Location, Area, Pincode'
                                placeholderTextColor={themeColors.neutral300}
                                defaultValue={name}
                                onChangeText={(e) => setName(e)}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>

                    <View style={{
                        marginBottom: 14
                    }}>
                        <Text variant="body-sm" style={{ marginBottom: 4 }}>
                            Email *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 12
                        }}>

                            <TextInput
                                placeholder='Email'
                                placeholderTextColor={themeColors.neutral300}
                                defaultValue={email}
                                onChangeText={(e) => setEmail(e)}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />
                            {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text variant="caption-sm" style={{ marginBottom: 4, color: themeColors.primary600 }}>
                                    Verify
                                </Text>
                            </TouchableOpacity> */}

                        </View>
                    </View>


                    <View style={{
                        marginBottom: 14
                    }}>
                        <Text variant="body-sm" style={{ marginBottom: 4 }}>
                            Phone Number *
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16
                        }}>

                            <TextInput
                                placeholder='91***********'
                                defaultValue={phone}
                                onChangeText={(e) => setPhone(e)}
                                placeholderTextColor={themeColors.neutral300}
                                style={{
                                    height: 40,
                                    flex: 1
                                }} />

                        </View>
                    </View>
                </View>





            </View>

            <View style={{
                padding: 16,
                backgroundColor: themeColors.white
            }}>
                <Pressable
                    onPress={handlePostRequest}

                    style={{
                        width: '100%',
                        paddingVertical: 12,
                        backgroundColor: themeColors.primary600,
                        borderRadius: 16

                    }}>

                    <Text style={{
                        textAlign: 'center',
                        color: themeColors.white

                    }}>
                        Update
                    </Text>


                </Pressable>

            </View>
            <OtpModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    )
}

const styles = StyleSheet.create({})