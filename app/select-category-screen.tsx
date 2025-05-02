import { Image, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '@/components/NavBar'
import { Bars3CenterLeftIcon, Bars3Icon, ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useTheme } from '@/contexts/theme.provider';
import { router } from 'expo-router';
import Text from '@/components/ui/Text';
import { UserCircleIcon, UserIcon } from 'react-native-heroicons/solid';



export default function SelectCategory() {


    // ========== hooks 
    const { themeColors } = useTheme()


    // ============== render

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.white}
                barStyle="dark-content"
            />
            <ScrollView style={{
                flex: 1,
                backgroundColor: themeColors.background,
                padding: 16,
                marginTop: 35
            }} >
                {/* 
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                }}>

                    <View style={{
                        height: 48,
                        width: 48,
                        borderRadius: 1000,
                        backgroundColor: themeColors?.neutral800,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <UserIcon size={35} color={'white'} />

                    </View>
                    <View>
                        <Text variant='caption-xl-prominent' style={{
                            color: themeColors.neutral900,
                            textAlign: 'left'
                        }} >Hello Salman</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Text variant='caption-sm' style={{
                                color: themeColors.neutral900,
                                textAlign: 'left'
                            }} >Home - </Text>
                            <Text variant='caption-sm' style={{
                                color: themeColors.neutral500,
                                textAlign: 'left'
                            }} >No. 23, ABC Street, XYZ ....  {">"} </Text>
                        </View>
                    </View>
                </View> */}

                {/* body */}
                <View style={{
                    // marginTop: 44
                }}>
                    <Text variant='caption-lg' style={{
                        color: themeColors.neutral900,
                        textAlign: 'center'
                    }} >All Categories</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    marginTop: 24,
                    // paddingHorizontal: 16
                }}>
                    {
                        [...Array(4)]?.map(item => <View>
                            <Pressable
                                onPress={() => router?.push('/product-search-screen')}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 16,
                                    backgroundColor: '#F9FAFB'


                                }}>
                                {/* <Image source={require('../assets/images/quickDel.png')} style={{
                            height: 170,
                            width: '100%',
                            objectFit: 'contain'
                        }} /> */}

                            </Pressable>
                            <Text variant='caption-xs' style={{
                                color: themeColors.neutral600,
                                textAlign: 'center',
                                maxWidth: 80,
                                marginTop: 8
                            }} >Category Name</Text>
                        </View>)
                    }

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    marginTop: 32,
                    // paddingHorizontal: 16
                }}>
                    {
                        [...Array(4)]?.map(item => <View>
                            <Pressable
                                onPress={() => router?.push('/product-search-screen')}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 16,
                                    backgroundColor: '#F9FAFB'


                                }}>
                                {/* <Image source={require('../assets/images/quickDel.png')} style={{
                            height: 170,
                            width: '100%',
                            objectFit: 'contain'
                        }} /> */}

                            </Pressable>
                            <Text variant='caption-xs' style={{
                                color: themeColors.neutral600,
                                textAlign: 'center',
                                maxWidth: 80,
                                marginTop: 8
                            }} >Category Name</Text>
                        </View>)
                    }

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    marginTop: 32,
                    // paddingHorizontal: 16
                }}>
                    {
                        [...Array(4)]?.map(item => <View>
                            <Pressable
                                onPress={() => router?.push('/product-search-screen')}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 16,
                                    backgroundColor: '#F9FAFB'


                                }}>
                                {/* <Image source={require('../assets/images/quickDel.png')} style={{
                            height: 170,
                            width: '100%',
                            objectFit: 'contain'
                        }} /> */}

                            </Pressable>
                            <Text variant='caption-xs' style={{
                                color: themeColors.neutral600,
                                textAlign: 'center',
                                maxWidth: 80,
                                marginTop: 8
                            }} >Category Name</Text>
                        </View>)
                    }

                </View>



                <View>

                </View>

            </ScrollView>



        </>
    )
}

const styles = StyleSheet.create({})


