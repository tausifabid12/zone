import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { EllipsisHorizontalIcon, ShoppingCartIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { Bars3Icon, PlusCircleIcon } from 'react-native-heroicons/outline'
import Navbar from '@/components/NavBar'
import { router } from 'expo-router'
import Navbar2 from '@/components/Navbar2'
import { IUser } from '@/shared/interfaces/user.interface'
import { useCart } from '@/contexts/cart.context'
import { useQuery } from '@/hooks/useQuery'
import { useMutation } from '@/hooks/useMutation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropdownMenu from '@/components/DropdownMenu'
import { ChevronRight, CirclePlus, Home } from 'lucide-react-native'




interface IUserData {
    data: IUser
}



export default function myAddress() {

    const [isVisible, setIsVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('')

    // ========== hooks 
    const { themeColors } = useTheme()
    const { addAddress, address } = useCart();
    const { data: userData, loading: userLoading, refetch } = useQuery<IUserData>('customers/profile');
    const { data: paymentData, error, loading, mutate } = useMutation<any>();


    async function deleteAddress() {
        const data = {
            "address": userData?.data?.address?.filter(item => item?.line1 !== currentAddress)
        }
        const response = await mutate('customers/profile', 'POST', data);

        AsyncStorage.setItem('userData', JSON.stringify(data))

        if (response) {
            refetch()
            // showMessage({
            //     message: "Profile Updated",
            //     type: "success",
            // })
        }
    }



    return (


        <>

            <StatusBar
                translucent
                backgroundColor={themeColors.white}
                barStyle="dark-content"
            />


            <View style={{
                flex: 1
            }}>

                <Navbar2
                    title="Saved Addresses"

                />


                <ScrollView style={[
                    {
                        backgroundColor: themeColors.neutral50,
                        padding: 16,
                        flex: 1

                    }

                ]}>



                    <View style={{

                        paddingBottom: 40
                    }}>

                        <TouchableOpacity
                            onPress={() => router.push('/create-address-screen')}
                            style={[[styles.switchRow, {
                                shadowColor: themeColors.neutral200,
                            }], {
                                backgroundColor: themeColors.background
                            }]}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8
                            }}>

                                <CirclePlus size={20} color={themeColors.primary600} />
                                <Text variant="caption-md" style={{
                                    color: themeColors.primary600
                                }} >Add Address</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4
                            }}>
                                <ChevronRight size={20} color={themeColors.primary600} />
                            </View>
                        </TouchableOpacity>

                        {/* ============ products */}

                        {
                            userData?.data?.address?.map((item, i) =>
                                <View key={i} style={[styles.item, {
                                    backgroundColor: themeColors.background,
                                    paddingVertical: 16,
                                    paddingHorizontal: 14,
                                    borderRadius: 12,
                                    shadowColor: themeColors.neutral200,

                                    shadowOffset: { width: 0, height: 8 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                    // Elevation for Android
                                    elevation: 6,
                                    position: 'relative'
                                }]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 18,

                                    }}>
                                        <View style={{
                                            backgroundColor: themeColors.neutral100,
                                            padding: 6,
                                            borderRadius: 8,
                                            height: 30
                                        }}>
                                            <Home color={themeColors.neutral900} size={18} />
                                        </View>
                                        <View style={[styles.itemDetails, {
                                            marginRight: 8,
                                            width: "84%",
                                            // backgroundColor: 'red'
                                        }]}>
                                            <View style={{
                                                marginBottom: 6,
                                                flexDirection: 'row',
                                                alignItems: 'center',

                                            }}>
                                                <Text variant="caption-sm" >Home

                                                </Text>
                                            </View>
                                            <Text variant="body-xs" style={{
                                                color: themeColors.neutral500
                                            }}>{item?.line1} </Text>

                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrentAddress(item?.line1)
                                            setIsVisible(true)
                                        }}
                                        style={{
                                            position: 'absolute',
                                            right: 12,
                                            top: 4
                                        }}>
                                        <EllipsisHorizontalIcon color={themeColors.neutral800} size={24} />
                                    </TouchableOpacity>

                                </View>)
                        }












                    </View>







                </ScrollView>
                <DropdownMenu refetch={refetch} isVisible={isVisible} setIsVisible={setIsVisible} deleteAddress={deleteAddress} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 20,
        // Shadow for iOS
        shadowColor: '#E2E8F0',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // Elevation for Android
        elevation: 6,
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
})