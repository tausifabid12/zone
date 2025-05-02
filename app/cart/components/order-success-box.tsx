import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { useCart } from '@/contexts/cart.context'
import { CheckIcon } from 'react-native-heroicons/outline'

export default function OrderSuccess() {

    // ========== hooks 
    const { themeColors } = useTheme()
    const { addToCart, cart, updateQuantity, totalPrice } = useCart();

    return (
        <View style={{
            borderRadius: 12,
            marginTop: 28,
            backgroundColor: themeColors.background,
            borderWidth: 1,
            borderColor: themeColors.neutral200
        }}>
            <View style={{
                padding: 16,
                // flex: 1
            }}>


                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: themeColors.success500,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <CheckIcon color={themeColors.white} size={30} />

                    </View>
                    <Text variant="caption-xl" style={{
                        textAlign: 'center',
                        color: themeColors.neutral800,
                        paddingVertical: 10
                    }} >Order placed successfully</Text>

                </View>






                {/* =============================================== */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12,
                    marginTop: 16

                }}>
                    <Text variant="body-sm" >Item Total</Text>
                    <Text variant="caption-sm" style={{
                        textAlign: 'right'
                    }} >{cart?.length}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Free Cash for you</Text>
                    <Text variant="caption-sm" style={{
                        textAlign: 'right'
                    }} >₹87</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Delivery Fee</Text>
                    <Text variant="caption-sm" style={{
                        textAlign: 'right'
                    }} >₹87</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12

                }}>
                    <Text variant="body-sm" >Handling Fee</Text>
                    <Text variant="caption-sm" style={{
                        textAlign: 'right'
                    }} >₹87</Text>
                </View>



            </View>

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