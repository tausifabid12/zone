import { Image, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import Navbar2 from '@/components/Navbar2'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { router } from 'expo-router'
import { useAuth } from '@/contexts/auth.context'
import { BellRing, Bookmark, Box, CircleUserRound, ExternalLink, Headphones, Heart, LogOut, MapPin, ShieldHalf } from 'lucide-react-native'

export default function settingsScreen() {



    // ========== hooks 
    const { themeColors } = useTheme()
    const { user } = useAuth()






    // ====================== render ==========================
    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.background}
                barStyle="dark-content"
            />

            <ScrollView style={{
                flex: 1,
                backgroundColor: themeColors.background
            }}>
                <Navbar2
                    title="Settings"

                />

                <View style={{
                    padding: 16
                }}>

                    <View style={{
                        paddingBottom: 16,
                        borderBottomWidth: 0.4,
                        borderColor: themeColors.neutral200
                    }}>
                        <Text variant='heading-sm' style={{
                            marginBottom: 4,
                            textTransform: 'capitalize'
                        }}>
                            {user?.fullName?.firstName || 'Guest User'}
                        </Text>
                        <Text variant='body-sm' style={{
                            color: themeColors.neutral600
                        }} >
                            {user?.phoneNumber?.number || ''}
                        </Text>
                    </View>
                    <View style={{
                        paddingBottom: 16,
                        paddingTop: 16,
                        borderBottomWidth: 0.4,
                        borderColor: themeColors.neutral200
                    }}>
                        <Text variant='body-xxs' style={{
                            color: themeColors.neutral400
                        }}>
                            ESSENTIALS
                        </Text>


                        <Pressable

                            onPress={() => router.push('/edit-profile-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingTop: 14,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <CircleUserRound size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Edit Profile
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/order-list-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <Box size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Your Orders
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/saved-products')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <Bookmark size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Saved Products
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/my-address-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <MapPin size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Saved Addresses
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/help-center-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <Headphones size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Help Center
                            </Text>
                        </Pressable>





                    </View>





                    {/* ================================== 2nd part =================== */}


                    <View style={{
                        paddingBottom: 16,
                        paddingTop: 16,
                        borderBottomWidth: 0.4,
                        borderColor: themeColors.neutral200
                    }}>
                        <Text variant='body-xxs' style={{
                            color: themeColors.neutral400
                        }}>
                            OTHER INFO
                        </Text>


                        <Pressable

                            onPress={() => router.push('/edit-profile-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingTop: 14,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <ExternalLink size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Share The App
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/product-search-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <Heart size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Drop a Review
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/product-search-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <Image
                                    source={require("../assets/icons/general/Bell.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
                            </View>

                            <Text variant='body-lg' >
                                Notification Settings
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/product-search-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <BellRing size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                About
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/product-search-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <ShieldHalf size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Privacy Settings
                            </Text>
                        </Pressable>
                        <Pressable

                            onPress={() => router.push('/product-search-screen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingBottom: 12
                            }}>

                            <View style={{
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: themeColors.neutral100,
                                borderRadius: 1000

                            }}>
                                <LogOut size={22} color={themeColors.neutral700} />
                            </View>

                            <Text variant='body-lg' >
                                Logout
                            </Text>
                        </Pressable>





                    </View>

                </View>



                <View style={{
                    backgroundColor: themeColors.background,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 47,
                    paddingTop: 14
                }}>
                    <Text variant='caption-xl-prominent' style={{
                        color: themeColors.neutral400,
                        alignItems: 'center'
                    }}>
                        Zone
                    </Text>
                    <Text variant='body-xxs' style={{
                        color: themeColors.neutral400,
                        alignItems: 'center'
                    }}>
                        V 1.1
                    </Text>

                </View>

            </ScrollView>



        </>
    )
}

const styles = StyleSheet.create({})