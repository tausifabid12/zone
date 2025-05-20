import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from '@/components/NavBar'
import { Bars3CenterLeftIcon, Bars3Icon, ChevronDoubleRightIcon, ChevronDownIcon, ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useTheme } from '@/contexts/theme.provider';
import Nav from './components/nav';
import QuickDelivery from './components/quick-delivery';
import SameDayDelivery from './components/same-day-delivery';
import AllIndiaDelivery from './components/all-india-delivery';

import Text from '@/components/ui/Text';
import SelectAddressModal from './components/select-address-modal';
import { ArrowDownIcon } from 'react-native-heroicons/solid';
import OrderDetails from './components/order-details-screen';
import { IOrder } from '@/shared/interfaces/order.interface';
import { useQuery } from '@/hooks/useQuery';
import { useLocalSearchParams } from 'expo-router';
import BillSummery from '../cart/components/bill-summery';

interface IOrderData {
    data: IOrder[]
}

export default function MyOrders() {

    // ================== states
    const [addressModalOpen, setAddressModalOpen] = useState(false)
    const { data } = useLocalSearchParams();
    const orderData: IOrder = JSON.parse(data as string)

    // ========== hooks 
    const { themeColors } = useTheme()





    // ============== render

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.background}
                barStyle="dark-content"
            />
            <ScrollView style={{
                flex: 1,

                backgroundColor: themeColors.neutral50,
                marginTop: 24
            }} >

                <Nav data={orderData} />

                <ScrollView style={styles.container}>
                    <QuickDelivery data={orderData} />
                    {/* <SameDayDelivery />
                    <AllIndiaDelivery /> */}



                    {/* =========== make payment ========== */}

                    <View style={{
                        backgroundColor: themeColors.background,
                        borderRadius: 12,
                        paddingHorizontal: 14,
                        paddingVertical: 16,
                        marginVertical: 20

                    }} >
                        <View style={{

                        }}>
                            {/* Header Section */}
                            <TouchableOpacity
                                // onPress={() => setAddressModalOpen(true)}

                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,

                                }}>

                                <Image
                                    source={require("../../assets/icons/cart/location.png")}

                                    style={{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 3
                                    }}>
                                        <Text variant="caption-sm" style={{
                                            color: themeColors.neutral800
                                        }}>Deliver to Home </Text>
                                        {/* <ChevronDownIcon color={themeColors.neutral800} size={18} /> */}
                                    </View>

                                    <Text variant="body-sm" style={{
                                        color: themeColors.neutral500
                                    }}>{orderData?.customer_details?.billing_address?.line1} </Text>
                                </View>

                                <View>

                                </View>




                            </TouchableOpacity>
                        </View>
                    </View>




                    {
                        orderData ? <BillSummery paymentData={orderData} /> : <></>
                    }
                    <OrderDetails data={orderData} />
                    <View style={{
                        paddingBottom: 38,
                        marginTop: 16
                    }}>
                        <Text variant="caption-md" style={{
                            textAlign: 'center',
                            color: themeColors.primary600
                        }}>
                            Still Need Help? <Text variant="caption-md-prominent" style={{
                                color: themeColors.primary600
                            }}>Chat with Us</Text>
                        </Text>
                    </View>
                    <View style={{
                        paddingTop: 100
                    }}>

                    </View>




                    <SelectAddressModal setModalVisible={setAddressModalOpen} isModalVisible={addressModalOpen} />
                </ScrollView>



            </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,

    }
})