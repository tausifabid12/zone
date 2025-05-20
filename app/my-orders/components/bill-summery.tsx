import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { ArrowDownIcon, ArrowDownOnSquareIcon } from 'react-native-heroicons/solid'
import { DocumentArrowDownIcon } from 'react-native-heroicons/outline'

export default function BillSummery() {

    // ========== hooks 
    const { themeColors } = useTheme()

    return (
        <View style={{
            borderRadius: 12,
            // marginTop: 28,
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
                    }}>Bill Summary</Text>


                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Item Total</Text>
                    <Text variant="caption-sm"
                        style={{
                            textAlign: 'right'
                        }} >
                        <Text variant="body-xxs" style={{
                            color: themeColors.neutral500,
                            textDecorationLine: "line-through",
                            textAlign: 'right'
                        }}>₹1,999</Text>
                        {" "} ₹1,499</Text>
                </View>

                {
                    ['Free Cash for you', 'Delivery Fee', 'Handling Fee']?.map(item =>
                        <View key={item} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: 12

                        }}>
                            <Text variant="body-sm" >{item}</Text>
                            <Text variant="caption-sm" style={{
                                textAlign: 'right'
                            }} >₹87</Text>
                        </View>)
                }

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12,
                    borderTopColor: themeColors.neutral100,
                    borderStyle: 'dashed',
                    paddingVertical: 16

                }}>
                    <View>
                        <Text variant="caption-sm-prominent" >Bill Summary</Text>
                        <Text variant="body-xxs" style={{
                            color: themeColors.neutral400
                        }} >Incl. of all taxes and charges</Text>
                    </View>
                    <View>
                        <Text variant="caption-sm-prominent" style={{
                            textAlign: 'right'
                        }}  >₹87</Text>
                        <Text variant="body-xxs" style={{
                            color: themeColors.neutral400,
                            textDecorationLine: 'line-through'
                        }} >₹8,234 </Text>
                    </View>




                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginTop: 18
                }}>
                    <Text variant="caption-xs" style={{
                        color: themeColors.primary600,

                    }}>Download Invoicy</Text>
                    <View>
                        <ArrowDownIcon color={themeColors.primary600} size={14} />
                    </View>

                </View>
            </View>
            <TouchableOpacity
                style={[styles.switchRow, {
                    backgroundColor: themeColors.success100
                }]}>
                <Text variant="caption-sm-prominent" style={{
                    color: themeColors.success700,
                    textAlign: 'center'
                }} >You Saved ₹614</Text>

            </TouchableOpacity>
        </View>
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