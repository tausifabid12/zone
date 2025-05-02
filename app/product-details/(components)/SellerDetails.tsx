import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { StarIcon } from 'react-native-heroicons/solid'
import { IProduct } from '@/interfaces/product.interface'

export default function ({ data }: { data: IProduct }) {

    // ========== hooks 
    const { themeColors } = useTheme()








    return (
        <View style={{
            marginBottom: 16, marginTop: 12,
            width: '100%',
            overflow: 'hidden'
        }}>
            <View style={{ borderWidth: 1, borderColor: themeColors?.neutral100, borderTopRightRadius: 8, borderTopLeftRadius: 8, paddingHorizontal: 16, paddingVertical: 12 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 }}>
                    <View style={{
                        flexDirection: 'row',
                        width: '80%'
                    }}>
                        <Image source={{ uri: data?.store?.logo || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' }} style={{
                            width: 40,
                            height: '100%',
                            marginRight: 4,
                            // marginTop: -4
                        }} />
                        <View>
                            <Text variant="caption-md">{data?.store?.name}
                            </Text>
                            {
                                data?.store?.distance ? <>
                                    <Text variant='body-xxs' style={{
                                        color: themeColors.primary600
                                    }}>{data?.store?.distance / 1000} km away</Text>
                                </> : <></>

                            }
                            {/* <Text variant="body-xs" style={{
                                color: themeColors.neutral500
                            }}>₹200 </Text> */}
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12
                    }}>
                        {/* <View style={{
                            flexDirection: 'row',
                            gap: 3
                        }}>
                            <StarIcon size={16} color={themeColors.success800} />
                            <Text variant="caption-sm-prominent" style={{
                                color: themeColors.success800
                            }} >4.1</Text>
                        </View> */}


                        <View style={{
                            borderWidth: 2,
                            borderColor: themeColors.primary600,
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            padding: 3
                        }}>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: themeColors.primary600,
                                borderRadius: '50%'
                            }}>

                            </View>

                        </View>
                    </View>
                </View>
            </View>
            {/* <View style={{ borderWidth: 1, borderTopWidth: 0, borderColor: themeColors?.neutral100, paddingHorizontal: 16, paddingVertical: 12, }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Image source={require('../../../assets/icons/cart/quick.png')} style={{
                            width: 16,
                            height: 16,
                            marginRight: 4,
                            // marginTop: -4
                        }} />
                        <View>
                            <Text variant="caption-md">Meenakshi Electronics <Text variant='body-xxs' style={{
                                color: themeColors.primary600
                            }}>1.2 km away</Text></Text>
                            <Text variant="body-xs" style={{
                                color: themeColors.neutral500
                            }}>₹200 </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 3
                        }}>
                            <StarIcon size={16} color={themeColors.success800} />
                            <Text variant="caption-sm-prominent" style={{
                                color: themeColors.success800
                            }} >4.1</Text>
                        </View>

                        <View style={{
                            borderWidth: 2,
                            borderColor: themeColors.neutral300,
                            width: 24,
                            height: 24,
                            borderRadius: 12
                        }}>

                        </View>

                    </View>
                </View>
            </View>
            <View style={{ borderWidth: 1, borderColor: themeColors?.neutral100, borderBottomRightRadius: 8, borderBottomLeftRadius: 8, paddingHorizontal: 16, paddingVertical: 12 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Image source={require('../../../assets/icons/cart/quick.png')} style={{
                            width: 16,
                            height: 16,
                            marginRight: 4,
                            // marginTop: -4
                        }} />
                        <View>
                            <Text variant="caption-md">Meenakshi Electronics <Text variant='body-xxs' style={{
                                color: themeColors.primary600
                            }}>1.2 km away</Text></Text>
                            <Text variant="body-xs" style={{
                                color: themeColors.neutral500
                            }}>₹200 </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 3
                        }}>
                            <StarIcon size={16} color={themeColors.success800} />
                            <Text variant="caption-sm-prominent" style={{
                                color: themeColors.success800
                            }} >4.1</Text>
                        </View>

                        <View style={{
                            borderWidth: 2,
                            borderColor: themeColors.neutral300,
                            width: 24,
                            height: 24,
                            borderRadius: 12
                        }}>

                        </View>

                    </View>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({})