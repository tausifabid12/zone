import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import Navbar2 from '@/components/Navbar2'
import { useTheme } from '@/contexts/theme.provider'
import Text from '@/components/ui/Text'
import { router } from 'expo-router'
import { useAuth } from '@/contexts/auth.context'

export default function settingsScreen() {



    // ========== hooks 
    const { themeColors } = useTheme()
    const { user } = useAuth()



    console.log(user?.fullName?.firstName, '{{{{{{{ user user user user useruser user user')


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
                                <Image
                                    source={require("../assets/icons/profile/user.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Box Minimalistic.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Bookmark.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Map Point Favourite.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Headphones Round.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Square Share Line.jpg")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Heart.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Info Circle.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Shield.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
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
                                <Image
                                    source={require("../assets/icons/general/Arrows ALogout 2.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
                            </View>

                            <Text variant='body-lg' >
                                Logout
                            </Text>
                        </Pressable>





                    </View>

                </View>





            </View>


            <View style={{
                backgroundColor: themeColors.background,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 47
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
        </>
    )
}

const styles = StyleSheet.create({})