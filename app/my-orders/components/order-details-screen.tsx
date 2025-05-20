import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { ArrowDownIcon, ArrowDownOnSquareIcon, } from 'react-native-heroicons/solid'
import { DocumentArrowDownIcon, ClipboardDocumentIcon } from 'react-native-heroicons/outline'
import { IOrder } from '@/shared/interfaces/order.interface'




export default function OrderDetails({ data }: { data: IOrder }) {

    // ========== hooks 
    const { themeColors } = useTheme()

    return (
        <View style={{
            borderRadius: 12,
            marginTop: 20,
            backgroundColor: themeColors.background,
        }}>
            <View style={{
                padding: 16
            }}>
                {/* Header Section */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 12
                }}>

                    <Image
                        source={require("../../../assets/icons/cart/bill.png")}

                        style={{
                            height: 20,
                            width: 20
                        }}
                    />
                    <Text variant="caption-lg-prominent" style={{
                        color: themeColors.neutral800
                    }}>Order Details</Text>


                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Order Id</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 6
                    }}>
                        <ClipboardDocumentIcon color={themeColors.neutral800} size={18} />
                        <Text variant="body-sm" style={{
                            textAlign: 'right'
                        }} >{data?.receipt?.split('-')[1]}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Ordered on</Text>
                    <Text variant="body-sm" style={{
                        textAlign: 'right'
                    }} >{new Date(data?.createdAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }).replace(",", " at")}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Paid on</Text>
                    <Text variant="body-sm" style={{
                        textAlign: 'right'
                    }} >{new Date(data?.updatedAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }).replace(",", " at")}</Text>
                </View>

                {/* {
                    ['Ordered on', 'Paid on', 'Delivered on']?.map(item =>
                        <View key={item} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: 12

                        }}>
                            <Text variant="body-sm" >{item}</Text>
                            <Text variant="body-sm" style={{
                                textAlign: 'right'
                            }} ></Text>
                        </View>)
                } */}



            </View>

        </View >
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