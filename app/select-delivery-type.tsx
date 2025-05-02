// import { Image, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
// import React, { useCallback, useEffect, useState } from 'react'
// import Navbar from '@/components/NavBar'
// import { Bars3CenterLeftIcon, Bars3Icon, ShoppingCartIcon } from 'react-native-heroicons/outline'
// import { useTheme } from '@/contexts/theme.provider';
// import { router, useFocusEffect } from 'expo-router';
// import Text from '@/components/ui/Text';
// import { UserCircleIcon, UserIcon } from 'react-native-heroicons/solid';
// import SelectAddressModal from '../my-orders/components/select-address-modal';
// import { useAuth } from '@/contexts/auth.context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useCart } from '@/contexts/cart.context';



// export default function DeliveryType() {

//     const [location, setLocation] = useState('')
//     // ========== hooks
//     const { themeColors } = useTheme()
//     const { address } = useCart();
//     const [addressModalOpen, setAddressModalOpen] = useState(false)
//     const { user } = useAuth()

//     useFocusEffect(
//         useCallback(() => {
//             StatusBar.setBackgroundColor(themeColors.white);
//             StatusBar.setBarStyle('dark-content');
//         }, [])
//     );




//     async function fetchNearbyLocation(lat: string, lon: string) {
//         const url =
//             `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lon}&api_key=${process.env.EXPO_PUBLIC_OLA_MAP_API_KEY}`;

//         try {
//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "X-Request-Id": "XXX",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();




//             return data; // Return restaurant data
//         } catch (error) {
//             console.error("Error fetching nearby restaurants:", error);
//             return null;
//         }
//     }
//     async function getLocationAndSearch() {
//         const strLocation = await AsyncStorage.getItem('userLocation');
//         const location = JSON.parse(strLocation as string);
//         if (location) {
//             const result = await fetchNearbyLocation(location?.lat, location?.lon)
//             console.log(result?.results[0]?.formatted_address, '|||||||||||||||||||| locationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocation')

//             if (result) {
//                 setLocation(result?.results[0]?.formatted_address)
//             }
//         }

//     }




//     // ============== render

//     return (
//         <>
//             <StatusBar
//                 translucent
//                 backgroundColor={themeColors.white}
//                 barStyle="dark-content"
//             />
//             <ScrollView style={{
//                 flex: 1,
//                 padding: 16,
//                 height: '100%',
//                 marginTop: 44,
//                 backgroundColor: themeColors.background
//             }} >

//                 <Pressable
//                     // onPress={() => setAddressModalOpen(true)}
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 10
//                     }}>

//                     <View style={{
//                         height: 48,
//                         width: 48,
//                         borderRadius: 1000,
//                         backgroundColor: themeColors?.neutral800,
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}>
//                         <UserIcon size={35} color={'white'} />

//                     </View>
//                     <View>
//                         <Text variant='caption-xl-prominent' style={{
//                             color: themeColors.neutral900,
//                             textAlign: 'left'
//                         }} >Hello {user?.fullName?.firstName}</Text>
//                         <View style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             gap: 1
//                         }}>

//                             <Text variant='caption-sm' style={{
//                                 color: themeColors.neutral500,
//                                 textAlign: 'left'
//                             }} >   {address?.line1?.slice(0, 30) || location || "Loading..."}  </Text>
//                         </View>
//                     </View>
//                 </Pressable>

//                 {/* body */}
//                 <Pressable
//                     onPress={() => router.push('/(customTab)')}
//                     style={{
//                         marginTop: 44
//                     }}>
//                     <Text variant='caption-xl-prominent' style={{
//                         color: themeColors.neutral900,
//                         textAlign: 'center'
//                     }} >Select the store</Text>
//                 </Pressable>

//                 <Pressable
//                     onPress={() => router?.push('/(customTab)')}
//                     style={{
//                         width: '100%',
//                         marginTop: 36

//                     }}>
//                     <Image source={require('../../assets/images/quickDel.png')} style={{
//                         height: 170,
//                         width: '100%',
//                         objectFit: 'contain'
//                     }} />

//                 </Pressable>
//                 <Pressable>
//                     <Image source={require('../../assets/images/allInidaDel.png')} style={{
//                         height: 170,
//                         width: '100%',
//                         objectFit: 'contain',
//                         marginTop: 4
//                     }} />


//                 </Pressable>


//             </ScrollView>

//             {/* <SelectAddressModal setModalVisible={setAddressModalOpen} isModalVisible={addressModalOpen} /> */}

//         </>
//     )
// }

// const styles = StyleSheet.create({})


// // import React from 'react';
// // import MapView from 'react-native-maps';
// // import { StyleSheet, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <MapView style={styles.map} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   map: {
// //     width: '100%',
// //     height: '100%',
// //   },
// // });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function selectdeliverytype() {
    return (
        <View>
            <Text>select-delivery-type</Text>
        </View>
    )
}

const styles = StyleSheet.create({})