import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { useCart } from '@/contexts/cart.context'
import { IOrder } from '@/shared/interfaces/order.interface'
import BillingDetails from './BillingDetails'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { ChevronRightIcon } from 'react-native-heroicons/solid'

export default function BillSummery({ paymentData }: { paymentData: IOrder }) {

    // ================== states ===================
    const [isModalVisible, setModalVisible] = useState(false)


    // ========== hooks 
    const { themeColors } = useTheme()
    const { addToCart, cart, updateQuantity, totalPrice } = useCart();

    return (
        <>
            <View style={{
                borderRadius: 12,
                marginTop: 28,
                backgroundColor: themeColors.background,
            }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 12,
                        borderTopColor: themeColors.neutral100,
                        borderStyle: 'dashed',
                        paddingVertical: 16,
                        paddingHorizontal: 16

                    }}>
                    <View>
                        <Text variant="caption-sm-prominent" >To Pay </Text>
                        <Text variant="body-xxs" style={{
                            color: themeColors.neutral400
                        }} >Incl. of all taxes and charges</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text variant="caption-sm-prominent" style={{
                                textAlign: 'right'
                            }}  >₹{paymentData?.paymentInfo?.revisedCost?.finalAmount / 100}</Text>
                            <Text variant="body-xxs" style={{
                                color: themeColors.neutral400,
                                textDecorationLine: 'line-through'
                            }} >₹{(paymentData?.paymentInfo?.revisedCost?.totalProductCost +
                                paymentData?.paymentInfo?.revisedCost?.operationalExpenses +
                                paymentData?.paymentInfo?.revisedCost?.handlingFee +
                                paymentData?.paymentInfo?.revisedCost?.totalDeliveryFee +
                                paymentData?.paymentInfo?.revisedCost?.operationalExpenses) / 100}
                            </Text>
                        </View>
                        <ChevronRightIcon size={20} />
                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={[styles.switchRow, {
                        backgroundColor: themeColors.success100
                    }]}>
                    <Text variant="caption-sm-prominent" style={{
                        color: themeColors.success700,
                        textAlign: 'center'
                    }} >You Save ₹{((paymentData?.paymentInfo?.revisedCost?.totalProductCost +
                        paymentData?.paymentInfo?.revisedCost?.operationalExpenses +
                        paymentData?.paymentInfo?.revisedCost?.handlingFee +
                        paymentData?.paymentInfo?.revisedCost?.totalDeliveryFee +
                        paymentData?.paymentInfo?.revisedCost?.operationalExpenses) - paymentData?.paymentInfo?.revisedCost?.finalAmount) / 100}</Text>

                </TouchableOpacity>
            </View>


            {
                isModalVisible ? <>
                    <BillingDetails isModalVisible={isModalVisible} setModalVisible={setModalVisible} paymentData={paymentData} /></> : <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    switchRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        padding: 10,


    },
})